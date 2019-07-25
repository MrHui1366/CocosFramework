const { ccclass } = cc._decorator;
const renderEngine = cc.renderer.renderEngine;
const Material = renderEngine.Material;

/*** 颜色定义 ***/
type V4c = { r: number, g: number, b: number, a: number };
/*** 4维向量定义 ***/
type V4 = { x: number, y: number, z: number, w: number };
/*** 3维向量定义 ***/
type V3 = { x: number, y: number, z: number };
/*** 2维向量定义 ***/
type V2 = { x: number, y: number };


/**
 * 自定义 Material
 * 继承自 cc.renderer.renderEngine.Material
 *
 * @export
 * @class CMaterial
 */
@ccclass
export default class CMaterial extends Material {

    constructor () {
        super()
    }

    /***
    * Shader宏 预定义
    * 子类重写来提供Shader 宏定义
    * 例如：
    * protected _defines =  [
    *     { name: 'HAS_HEART', value: false },
    *     { name: 'USE_POST_PROCESSING', value: true }
    * ]
    * @example
    * #ifdef USE_POST_PROCESSING
    *     t = (T+3.)*.5;
    *     float colFade = sin(t*.2)*.5+.5+story;
    *     col *= mix(vec3(1.), vec3(.8, .9, 1.3), colFade);	// subtle color shift
    *     float fade = S(0., 10., T);							// fade in at the start
    *     float lightning = sin(t*sin(t*10.));				    // lighting flicker
    *     lightning *= pow(max(0., sin(t+sin(t))), 10.);		// lightning flash
    *     col *= 1.+lightning*fade*mix(1., .1, story*story);	// composite lightning
    *     col *= 1.-dot(UV-=.5, UV);							// vignette
    *
    *     #ifdef HAS_HEART
    *         col = mix(pow(col, vec3(1.2)), col, heart);
    *         fade *= S(102., 97., T);
    *     #endif
    *
    *     col *= fade;										    // composite start and end fade
    * #endif
    ***/
    private defines = [];

    /**
     * 纹理引用
     * 来自node上的 cc.Sprite.spriteFrame.getTexture()
     *
     * @private
     * @memberof CMaterial
     */
    private _texture = null;
    /**
     * 主纹理颜色
     *
     * @private
     * @memberof CMaterial
     */
    private _color: V4c = null
    /**
     * 常用参数
     * 位置坐标
     * 用于记录位置 x,y,z
     * 需要在 CShaderBase 子类中手动调用
     *
     * @memberof CMaterial
     */
    private _pos: V3 = null
    /**
    * 常用参数
    * 尺寸
    * 用于记录位置 x,y,z
    * 需要在 CShaderBase 子类中手动调用
    *
    * @memberof CMaterial
    */
    private _size: V2 = null;
    /**
    * 常用参数
    * 时间
    * 用于记录累计播放时长
    * 需要在 CShaderBase 子类中 设置 _needUpdate = true 才会生效
    *
    * @memberof CMaterial
    */
    private _time: number = 0.0;
    /**
    * 常用参数
    * 计数
    * 用于计数使用
    * 需要在 CShaderBase 子类中手动调用
    *
    * @memberof CMaterial
    */
    private _num: number = 0;

    /*** 
     * 渲染效果对象
     * 详见引擎底层 
     ***/
    private _effect = null

    /***
     * 渲染效果对象
     * 详见引擎底层
     ***/
    public get effect () {
        return this._effect;
    };

    /*** 
     *【字面意义】
     * 主要渲染技巧
     * 具体表现为，渲染模式，叠加模式，剔除模式，深度检查，多PASS等
     * ***/
    _mainTech = null

    /**
     * 创建材质
     * 
     * @param name 材质名
     * @param vert 顶点着色器
     * @param frag 片元着色器
     * @param defines 宏预定义
     * @param params 额外参数定义
     * @returns 创建好并付好值的Shader
     * @memberof CMaterial
     */
    public create ( name: string, vert: string, frag: string, defines: any[], params: any[] ): CMaterial {
        this.defines = defines
        let renderer = cc.renderer;
        let lib = renderer[ "_forward" ]._programLib;

        // !!这里定义了 Shader给引擎顶层
        !lib._templates[ name ] && lib.define( name, vert, frag, defines );
        this.init( name, params );
        return this;
    }

    /**
     * 初始化
     *
     * @param name 材质名
     * @param params 额外参数定义
     * @memberof CMaterial
     */
    private init ( name: string, params: any[] ): void {
        // 渲染器
        let renderer = renderEngine.renderer;

        // GFX引擎
        let gfx = renderEngine.gfx;

        // 创建PASS
        let pass = new renderer.Pass( name );

        /*
            设置深度参数
            函数原型
            Pass.prototype.setDepth = function setDepth ( depthTest, depthWrite, depthFunc );
            参数1 是否开启深度测试
            参数2 是否开启深度写入
            参数3 深度测试算法：默认为大于等于
        */
        pass.setDepth( false, false );

        /* 
            设置剪裁模式
            CULL_NONE: 0,
            CULL_FRONT: 1028,
            CULL_BACK: 1029,
            CULL_FRONT_AND_BACK: 1032,
        */
        pass.setCullMode( gfx.CULL_NONE );

        /*
            设置混合模式
            函数原型
            Pass.prototype.setBlend = function setBlend ( blendEq, blendSrc, blendDst, blendAlphaEq, blendSrcAlpha, blendDstAlpha, blendColor)

            参数1：混合颜色计算函数        
            参数2：混合颜色源
            参数3：混合颜色目标
            参数4：混合透明度计算函数
            参数5：混合透明度源
            参数6：混合透明度目标
            参数7：混合颜色倍乘

            混合模式参数
                BLEND_ZERO: 0,                          // gl.ZERO
                BLEND_ONE: 1,                           // gl.ONE
                BLEND_SRC_COLOR: 768,                   // gl.SRC_COLOR
                BLEND_ONE_MINUS_SRC_COLOR: 769,         // gl.ONE_MINUS_SRC_COLOR
                BLEND_DST_COLOR: 774,                   // gl.DST_COLOR
                BLEND_ONE_MINUS_DST_COLOR: 775,         // gl.ONE_MINUS_DST_COLOR
                BLEND_SRC_ALPHA: 770,                   // gl.SRC_ALPHA
                BLEND_ONE_MINUS_SRC_ALPHA: 771,         // gl.ONE_MINUS_SRC_ALPHA
                BLEND_DST_ALPHA: 772,                   // gl.DST_ALPHA
                BLEND_ONE_MINUS_DST_ALPHA: 773,         // gl.ONE_MINUS_DST_ALPHA
                BLEND_CONSTANT_COLOR: 32769,            // gl.CONSTANT_COLOR
                BLEND_ONE_MINUS_CONSTANT_COLOR: 32770,  // gl.ONE_MINUS_CONSTANT_COLOR
                BLEND_CONSTANT_ALPHA: 32771,            // gl.CONSTANT_ALPHA
                BLEND_ONE_MINUS_CONSTANT_ALPHA: 32772,  // gl.ONE_MINUS_CONSTANT_ALPHA
                BLEND_SRC_ALPHA_SATURATE: 776,          // gl.SRC_ALPHA_SATURATE

            混合计算函数
                BLEND_FUNC_ADD: 32774,              // gl.FUNC_ADD
                BLEND_FUNC_SUBTRACT: 32778,         // gl.FUNC_SUBTRACT
                BLEND_FUNC_REVERSE_SUBTRACT: 32779, // gl.FUNC_REVERSE_SUBTRACT
        */
        pass.setBlend(
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA,
            gfx.BLEND_FUNC_ADD,
            gfx.BLEND_SRC_ALPHA, gfx.BLEND_ONE_MINUS_SRC_ALPHA
        );

        /** 
         * 定义相关参数
         */
        let techParams = [
            { name: 'texture', type: renderer.PARAM_TEXTURE_2D },
            { name: 'color', type: renderer.PARAM_COLOR4 },
            { name: 'pos', type: renderer.PARAM_FLOAT3 },
            { name: 'size', type: renderer.PARAM_FLOAT2 },
            { name: 'time', type: renderer.PARAM_FLOAT },
            { name: 'num', type: renderer.PARAM_FLOAT }
        ];

        // 连接自定义参数
        if ( params ) {
            techParams = techParams.concat( params );
        }

        /* 
            创建渲染技巧
            函数原型
            var Technique = function Technique(stages, parameters, passes, layer) {}
            参数1：场景
            参数2：参数
            参数3：passes数组，支持多pass
            参数4：layer层
        */
        let mainTech = new renderer.Technique(
            [ 'transparent' ],
            techParams,
            [ pass ]
        );

        // 设置相关参数初始值
        this._texture = null;
        this._color = { r: 1.0, g: 1.0, b: 1.0, a: 1.0 };
        this._pos = { x: 0.0, y: 0.0, z: 0.0 };
        this._size = { x: 0.0, y: 0.0 };
        this._time = 0.0;
        this._num = 0.0;

        /*
            效果封装
            var Effect = function Effect(techniques, properties, defines) 
            参数1：渲染技巧
            参数2：额外属性绑定
            参数3：宏预定义
        */
        this._effect = new renderer.Effect( [ mainTech ], {
            'color': this._color,
            'pos': this._pos,
            'size': this._size,
            'time': this._time,
            'num': this._num
        }, this.defines );

        // 记录渲染技巧
        this._mainTech = mainTech;
    }

    /**
     * 设置贴图
     * 由 ShaderBase 自动设置
     *
     * @param texture 贴图
     * @memberof CMaterial
     */
    public setTexture ( texture ): void {
        this._texture = texture;
        this._texture.update( { flipY: false, mipmap: false } );
        this._effect.setProperty( 'texture', texture.getImpl() );
        this._texIds[ 'texture' ] = texture.getId();
    }

    /**
     * 设置颜色
     * 由 ShaderBase 自动设置
     *
     * @param r 红
     * @param g 绿
     * @param b 蓝
     * @param a 透明度
     * @memberof CMaterial
     */
    public setColor ( r: number, g: number, b: number, a: number ): void {
        this._color.r = r;
        this._color.g = g;
        this._color.b = b;
        this._color.a = a;
        this._effect.setProperty( 'color', this._color );
    }

    /**
     * 设置位置
     * 需要手动设置
     * 
     * @param x x坐标
     * @param y y坐标
     * @param z z坐标
     * @memberof CMaterial
     */
    public setPos ( x: number, y: number, z: number ): void {
        this._pos.x = x;
        this._pos.y = y;
        this._pos.z = z;
        this._effect.setProperty( 'pos', this._pos );
    }

    /**
     * 设置尺寸
     * 需要手动设置
     *
     * @param x 宽
     * @param y 高
     * @memberof CMaterial
     */
    public setSize ( x: number, y: number ): void {
        this._size.x = x;
        this._size.y = y;
        this._effect.setProperty( 'size', this._size );
    }

    /**
     * 设置运行时长
     * 由 ShaderBase 自动设置（前提是开启 _neetUpdate = true )
     *
     * @param time
     * @memberof CMaterial
     */
    public setTime ( time: number ): void {
        this._time = time;
        this._effect.setProperty( 'time', this._time );
    }

    /**
     * 设置计数
     * 需要手动调用
     * 
     * @param num 计数值
     * @memberof CMaterial
     */
    public setNum ( num: number ): void {
        this._num = num;
        this._effect.setProperty( 'num', this._num );
    }

    /**
     * 设置参数
     * 允许自定义设置的参数
     * 
     * @param name 参数名字
     * @param value 参数值
     * @memberof CMaterial
     */
    public setParamValue ( name: string, value: any ): void {
        this._effect.setProperty( name, value );
    }

    /**
     * 设置宏预定义
     *
     * @param name 宏名
     * @param value 值 true | false
     * @memberof CMaterial
     */
    public setDefine ( name: string, value: any ): void {
        this._effect.define( name, value );
    }

}
