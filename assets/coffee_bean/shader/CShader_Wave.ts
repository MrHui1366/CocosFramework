import CShaderBase from "./base/CShaderBase";
import CMaterial from "./base/CMaterial";
const { ccclass, menu, property } = cc._decorator;
const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;



@ccclass
@menu( '自定义材质/Shader/Wave[波浪]' )
export default class CShader_Blur extends CShaderBase {

    protected _shaderName = "Blur"

    @property( { tooltip: "频率" } )
    public frequency: number = 1;

    @property( { tooltip: "振幅" } )
    public amplitude: number = 1;

    @property( { tooltip: "波浪高度" } )
    public height: number = 0.8;

    @property( { tooltip: "边线高度" } )
    public line_height: number = 0.05;

    @property( { tooltip: "衰减透明度" } )
    public reduce: number = 0;

    @property( { range: [ -10, 10, 0.001 ], slide: true, tooltip: "流动速度" } )
    public speed: number = 1;

    @property( { tooltip: "波浪颜色" } )
    public wave_color: cc.Color = cc.Color.WHITE;

    @property( { tooltip: "波浪边颜色" } )
    public wave_line_color: cc.Color = cc.Color.BLUE;

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

    protected _frag = `
    uniform sampler2D texture;
    // 频率
    uniform float frequency; 
    // 振幅
    uniform float amplitude;
    // 流动速度
    uniform float speed;
    // 时间
    uniform float time;
    // 衰减透明度
    uniform float reduce;
    // 波浪高度
    uniform float height;
    // 波浪颜色
    uniform vec4 wave_color;
    // 波浪边缘颜色
    uniform vec4 wave_line_color;
    // 波浪边线高
    uniform float line_height;

    varying vec2 uv0;

    vec4 lerp(vec4 x, vec4 y, float t){
        return x + t*(y - x); 
    }

    void main () {
        vec2 uv = uv0;
        //波浪UV
        uv.y += (amplitude * sin( frequency * uv.x + speed * time));
        uv.y = clamp(uv.y,0.0,1.0);
        float half_line = line_height / 2.0;
        float half_height = height *reduce;

        if(uv.y < 1.0 - height - half_line)
        {
            discard;
        }else if(uv.y < 1.0 - height)
        {
            float offsety = half_line - 1.0 + height + uv.y;
            offsety /= half_line;        
            offsety = 1.0-offsety;
            vec4 targetColor = wave_line_color;
            targetColor.a = 0.0;
            gl_FragColor = lerp( wave_line_color , targetColor , offsety );
        }
        else if(uv.y < 1.0 - height + half_line )
        {
            float offsety = 1.0 - height + half_line - uv.y ;
            offsety /= half_line;
            gl_FragColor = lerp( wave_color , wave_line_color , offsety );
        }
        else
        {
            float offsety = 1.0 - half_height - uv.y;
            offsety /= half_height;
            offsety = 1.0 - offsety;
            offsety = clamp(offsety,0.0,1.0);
            vec4 targetcolor = wave_color;
            targetcolor.a = 0.0;

            gl_FragColor = lerp( wave_color , targetcolor , offsety );
        }

    }
    `

    protected _params = [
        { name: 'frequency', type: renderer.PARAM_FLOAT },
        { name: 'amplitude', type: renderer.PARAM_FLOAT },
        { name: 'speed', type: renderer.PARAM_FLOAT },
        { name: 'height', type: renderer.PARAM_FLOAT },
        { name: 'line_height', type: renderer.PARAM_FLOAT },
        { name: 'wave_color', type: renderer.PARAM_COLOR4 },
        { name: 'wave_line_color', type: renderer.PARAM_COLOR4 },
        { name: 'reduce', type: renderer.PARAM_FLOAT },

    ]

    /**
     * 设置参数
     * @param material 材质
     */
    protected setParamValue ( material: CMaterial ): void {
        material.setParamValue( "frequency", this.frequency );
        material.setParamValue( "amplitude", this.amplitude );
        material.setParamValue( "speed", this.speed );
        material.setParamValue( "height", this.height );
        material.setParamValue( "line_height", this.line_height );
        material.setParamValue( "reduce", this.reduce );
        material.setParamValue( "wave_color", { r: this.wave_color.getR() / 255, g: this.wave_color.getG() / 255, b: this.wave_color.getB() / 255, a: this.wave_color.getA() / 255 } );
        material.setParamValue( "wave_line_color", { r: this.wave_line_color.getR() / 255, g: this.wave_line_color.getG() / 255, b: this.wave_line_color.getB() / 255, a: this.wave_line_color.getA() / 255 } );

        console.log( this.frequency );

    }

    // 需要更新时间
    protected _needUpdate: boolean = true;
}
