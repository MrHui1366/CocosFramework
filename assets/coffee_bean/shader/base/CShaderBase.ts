import CMaterial from "./CMaterial";
const { ccclass, property, executeInEditMode, requireComponent, disallowMultiple } = cc._decorator;

/**
 * Shader 基类
 * 继承本类以实现自定义 Shader效果
 *
 * @export
 * @class CShaderBase
 */
@ccclass
@requireComponent( cc.Sprite )
@executeInEditMode
export default class CShaderBase extends cc.Component {
    /*** 材质 ***/
    protected _material: CMaterial = null;
    /*** 
     * 常用参数：【主纹理颜色】
     * 继承类视情况决定是否重写【主纹理颜色】
     * 若继承类需要重写【主纹理颜色】
     * 则应设置这个颜色并公开外界方便设置
     ***/
    protected _color = cc.color( 255, 255, 255, 255 );
    /*** 计时器：播放时长 ***/
    protected _start = 0;
    /*** 
     * shader名
     * 继承类需重写此名字进行shader定义 
     ***/
    protected _shaderName = "";

    /*** 状态值 ***/
    protected _state = 100

    /*** 
     * 通用顶点着色器
     * 防止不提供顶点着色器时使用 
     ***/
    protected _vert = `
    uniform mat4 viewProj;
    attribute vec3 a_position;
    attribute vec2 a_uv0;
    varying vec2 uv0;
    void main () {
        vec4 pos = viewProj * vec4(a_position, 1);
        gl_Position = pos;
        uv0 = a_uv0;
    }`;

    /***
    * 通用片元着色器
    * 防止不提供片元着色器时使用
    ***/
    protected _frag = `
    uniform sampler2D texture;
    uniform vec4 color;
    varying vec2 uv0;
    void main () {
        vec4 clrx = color * texture2D(texture, uv0);
        gl_FragColor =clrx;
    }
    `

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
    protected _defines = [];

    /*** 
     * 自定义数据
     * 用于自定义需要传入Shader的参数 
     * 子类重写来定义 Shader 额外参数     
     * @example
     * 例如：
     * protected _params = [
     *     { name: 'offset', type: renderer.PARAM_FLOAT },
     *     { name: 'strength', type: renderer.PARAM_FLOAT }
     * ]
     * 
     * 定义了额外参数后
     * 需要通过重写 setParamValue 来传入外界的值到 Shader
     * 例如
     * 
     * protected setParamValue(material: ShaderMaterial) {
     *     material.setParamValue("offset", this.angle)
     *     material.setParamValue("strength", this.strength)
     * }
     * 这里把子类的 this.angle 作为 offset  this.strength 作为 strength
     * 
     * 最后
     * 在Shader内定义额外参数来使用
     * 进行Shader 编写
     * 例如
     *     uniform float offset;   //偏移值         (调整该值改变流光的倾斜程度)
     *     uniform float strength; //强度           (调整该值改变流光强弱程度)
     *
     * 
     ***/
    protected _params = []

    /*** 
     * 定义是否需要每帧更新 time 参数
     * 默认不更新 time
     * 若子类重写设定为 true
     * 则可以在Shader中使用参数 time
     * @example
     * uniform float time;
     * void main()
     * {
     *     vec4 src_color = color * texture2D(texture, uv0).rgba;
     *     // time 参数的使用
     *     float start = tan(time/1.414);  //流光的起始x坐标
     *     if(uv0.x < (start - offset * uv0.y))
     *     {
     *         vec3 improve = strength * vec3(255, 255, 255);
     *         vec3 result = improve * vec3( src_color.r, src_color.g, src_color.b);
     *         gl_FragColor = vec4(result, src_color.a);
     *     }else{
     *         gl_FragColor = src_color;
     *     }
     * }
     ***/
    protected _needUpdate = false

    // /*** 开始时 ***/
    // protected start (): void {
    //     this.init()
    // }

    /*** 激活时 ***/
    protected onEnable (): void {
        this.init()
    }

    /*** 每帧更新 ***/
    protected update ( dt: number ): void {
        if ( !this._material ) return;
        this._setShaderColor();
        this._setShaderTime( dt );
    }

    /*** 初始化Shader ***/
    protected init (): void {
        this.node.getComponent( cc.Sprite ).setState( 0 );
        this._applyShader();
    }


    /*** 应用Shader ***/
    protected _applyShader () {
        let material = this.useShader();
        this._material = material;
        this._start = 0;
        let clr = this._color;
        clr.setR( 255 ), clr.setG( 255 ), clr.setB( 255 ), clr.setA( 255 );
        this._setShaderColor();
    }


    /*** 应用Shader ***/
    protected useShader () {
        if ( cc.game.renderType === cc.game.RENDER_TYPE_CANVAS ) {
            console.warn( 'Shader not surpport for canvas' );
            return;
        }
        let sprite = this.node.getComponent( cc.Sprite );
        if ( !sprite || !sprite.spriteFrame || sprite.getState() === cc.Sprite.State.GRAY ) {
            return;
        }


        let material = new CMaterial().create( this._shaderName, this._vert, this._frag, this._defines, this._params );
        let texture = sprite.spriteFrame.getTexture();
        material.setTexture( texture );
        this.setParamValue( material );

        material.updateHash();
        let sp = sprite;
        sp[ "_material" ] = material;
        sp[ "_renderData" ]._material = material;
        sp[ "_state" ] = this._state;
        return material;
    }

    /*** 设置Shader参数 ***/
    protected setParamValue ( material: CMaterial ) {

    }

    /*** 设置Shader 颜色， 每帧更新 ***/
    protected _setShaderColor () {
        let node = this.node;
        let c0 = node.color;
        let c1 = this._color;
        let r = c0.getR(), g = c0.getG(), b = c0.getB(), a = node.opacity;
        let f = false;
        if ( c1.getR() !== r ) { c1.setR( r ); f = true; }
        if ( c1.getG() !== g ) { c1.setG( g ); f = true; }
        if ( c1.getB() !== b ) { c1.setB( b ); f = true; }
        if ( c1.getA() !== a ) { c1.setA( a ); f = true; }
        f && this._material.setColor( r / 255, g / 255, b / 255, a / 255 );
    }

    /*** 设置 time ***/
    protected _setShaderTime ( dt ) {
        if ( this._needUpdate ) {
            let start = this._start;
            if ( start > 65535 ) start = 0;
            start += dt;
            this._material.setTime( start );
            this._start = start;
        }
    }
}
