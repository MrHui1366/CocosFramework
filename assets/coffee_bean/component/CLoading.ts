import { ETheme } from '../common/CEnum';
import { CBASE64 } from '../data/CBase64';
import { CUI } from '../utils/CUI';
import { angle_2_radius as angle_2_radian } from '../utils/CMath';
import { FONT_NORMAL } from '../common/CGlobal';

const { ccclass } = cc._decorator;

/** 球的尺寸 ***/
const BALL_SIZE: number = 12;

/*** 球的数量 ***/
const BALL_COUNT: number = 12;

/** 小球初始偏移 ***/
const DISTANCE: number = 32;

/** 移动用时 ***/
const MOVE_TIME: number = 1.0;

/**
 * 全屏Loading遮罩
 * 使用方法
 *      CLoading.show("haha",ETheme.DARK);
 *      CLoading.show();
 *      CLoading.hide();
 */
@ccclass
export class CLoading {

    /*** 界面 节点 ***/
    private static _uinst: cc.Node = null;

    /*** 小球容器 ***/
    private static _ballContainer: cc.Node = null;

    /*** 小球们 ***/
    private static _balls: cc.Node[];

    /*** 是否已经初始化 ***/
    private static _hasInit: boolean = false;

    /*** 文字标签 ***/
    private static _label: cc.Node = null;

    /**
     * 隐藏Loading遮罩
     */
    public static hide (): void {
        if ( this._uinst == null ) {
            return;
        }

        // 激活显示
        this._uinst.active = false;
    }

    /**
     * 显示Loading 遮罩
     * @param content 文字内容
     * @param theme 
     */
    public static show ( content: string = null, theme: ETheme = ETheme.DARK ): void {
        if ( this._uinst == null ) {
            this.create( content, theme );
            return;
        }

        // 激活显示
        this._uinst.active = true;
        this._uinst.set_2_Top();
        this.updateTheme( content, theme );
    }

    /*** 更新主题 ***/
    private static updateTheme ( content: string = null, theme: ETheme = ETheme.DARK ): void {
        this._uinst.color = theme == ETheme.DARK ? cc.Color.BLACK : cc.Color.WHITE;
        for ( let i = 0; i < this._balls.length; i++ ) {
            const element = this._balls[ i ];
            element.color = theme == ETheme.DARK ? cc.Color.WHITE : cc.Color.BLACK;
        }

        if ( this._label == null ) {
            this.createText( content, theme );
        } else {
            this._label.color = theme == ETheme.DARK ? cc.Color.WHITE : cc.Color.BLACK;
            this._label.getComponent( cc.Label ).string = content;
        }
    }

    /**
     * 创建遮罩
     * @param theme 主题
     */
    private static create ( content: string = null, theme: ETheme = ETheme.DARK ): void {
        // 准备资源
        let sp = CBASE64.createSpriteFrameFromBase64Img( CBASE64.RECT_SP );

        // 创建背景
        let [ ui, spback ] = CUI.createSpriteNode( "UI_Loading" );
        this._uinst = ui;
        this._uinst.setAnchorPoint( 0.5, 0.5 );
        this._uinst.setContentSize( cc.winSize );
        this._uinst.color = theme == ETheme.DARK ? cc.Color.BLACK : cc.Color.WHITE;
        this._uinst.opacity = 153;

        // 设置背景遮罩
        spback.spriteFrame = sp;
        spback.sizeMode = cc.Sprite.SizeMode.CUSTOM;

        // 设置阻止层
        this._uinst.addComponent( cc.BlockInputEvents );

        // 创建文本
        ( content != null ) && this.createText( content, theme );

        // 创建球
        this.createBall( theme );

        // 添加到摄像机上
        cc.Camera.main.node.addChild( this._uinst );
    }


    /**
     * 创建文本
     */
    private static createText ( content: string, theme: ETheme ): void {
        let [ node, label ] = CUI.createLabelNode( "hint" );
        label.string = content;
        label.fontSize = FONT_NORMAL;
        node.color = ( theme == ETheme.DARK ? cc.Color.WHITE : cc.Color.BLACK ).setA( 0.5 );
        node.y = 0 - DISTANCE * 2;
        this._label = node;
        this._uinst.addChild( node );
    }

    /**
     * 创建小球
     * 并设置运动
     */
    private static createBall ( theme: ETheme ): void {
        this._ballContainer = new cc.Node( "ballContainer" );
        this._uinst.addChild( this._ballContainer );
        this._ballContainer.y = DISTANCE;

        // 小球容器不断循环旋转
        let rotation = cc.rotateBy( MOVE_TIME * 1.6, 360 ).repeatForever();
        this._ballContainer.runAction( rotation );

        // 小球数组
        this._balls = new Array<cc.Node>( BALL_COUNT );


        // 创建小球
        for ( let i = 0; i < BALL_COUNT; i++ ) {
            let radian = 360 / BALL_COUNT * i * angle_2_radian;
            let radius = DISTANCE;
            let pos = new cc.Vec2( Math.cos( radian ) * radius, Math.sin( radian ) * radius );

            let [ node, sp ] = CUI.createSpriteNode( "Ball" + ( i + 1 ) );
            sp.spriteFrame = CBASE64.createSpriteFrameFromBase64Img( CBASE64.BALL_SP );
            sp.sizeMode = cc.Sprite.SizeMode.CUSTOM;
            node.setContentSize( BALL_SIZE, BALL_SIZE );
            node.setPosition( pos );
            node.opacity = 153;
            this._ballContainer.addChild( node );

            // 设置运动
            let moveBack = cc.moveTo( MOVE_TIME, pos ).easing( cc.easeBackOut() );
            let moveCenter = cc.moveTo( MOVE_TIME * 2, 0, 0 ).easing( cc.easeCubicActionIn() );
            let delay = cc.delayTime( MOVE_TIME );
            let seq = cc.sequence( moveCenter, moveBack, delay ).repeatForever();
            // 运行运动
            node.runAction( seq );

            this._balls[ i ] = node;
        }
    }
}