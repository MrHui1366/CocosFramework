import CShaderBase from "./base/CShaderBase";
import CMaterial from "./base/CMaterial";
const { ccclass, menu, property } = cc._decorator;
const renderEngine = cc.renderer.renderEngine;
const renderer = renderEngine.renderer;



@ccclass
@menu( '自定义材质/Shader/GaussBlur[高斯模糊]' )
export default class CShader_Blur extends CShaderBase {

    protected _shaderName = "Blur"

    @property( { type: cc.Integer, visible: true, range: [ 1, 15, 1 ], slide: true, displayName: "模糊半径" } )
    protected _radius: number = 1;

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
    uniform vec4 color;
    uniform vec2 size;
    uniform float radius;
    varying vec2 uv0;

    // 得到高斯核权值
    // G(x,y) = 1/(2*PI*sigma^2) * e^(-(x^2+y^2)/()2*sigma^2))
    float GetGaussWeight(float x, float y, float sigma)
    {
        float sigma2 = pow(sigma, 2.0);
        float left = 1.0 / (2.0 * sigma2 * 3.1415926);
        float right = exp( -(x*x+y*y)/(2.0*sigma2));
        return left * right;
    }

    void main () {
		float sigma = radius / 3.0;
        vec4 col = vec4(0.0, 0.0, 0.0, 0.0);
        #define R 15.0
		for (float x = -R; x <= R; x++)
		{
			for (float y = -R; y <=R; y++)
			{
                if(x < -radius || x> radius || y < -radius || y > radius )
                {
                    continue;
                }

                //获取周围像素的颜色
				//因为uv是0-1的一个值，而像素坐标是整形，我们要取材质对应位置上的颜色，需要将整形的像素坐标
				//转为uv上的坐标值
				vec4 color = texture2D(texture, uv0 + vec2( x / size.x, y / size.y));
				//获取此像素的权重
                float weight = GetGaussWeight(x, y, sigma);

                col += color*weight;
			}
        }
        
        gl_FragColor = col;
    }
    `

    protected _params = [
        { name: 'radius', type: renderer.PARAM_FLOAT }
    ]

    /**
     * 设置参数
     * @param material 材质
     */
    protected setParamValue ( material: CMaterial ): void {
        let size = this.node.getContentSize();
        material.setParamValue( "radius", this._radius );
        material.setSize( size.width, size.height );
    }
}
