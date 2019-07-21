/**
 * CoffeeBean
 * 声音封装
 * 包含声音的播放控制
 * 
 * By Leo
 */

import CRes from "./CRes";
import CLOG from "../utils/CLOG";
import CLocalStore from "../data/CLocalStore";

export default class CSound {
    /**
     * 背景音乐播放器
     */
    private static musicPlayer: cc.AudioSource = null;

    /*** 是否允许音乐 ***/
    private static enable_music: boolean = true;

    /**
     * 得到背景音乐播放组件
     * 唯一的
     * 不会随着游戏而销毁的
     */
    private static getMusicPlayer (): cc.AudioSource {
        if ( this.musicPlayer == null ) {
            let musicNode = new cc.Node( "music_node" );
            this.musicPlayer = musicNode.addComponent( cc.AudioSource );
            cc.director.getScene().addChild( musicNode );
            cc.game.addPersistRootNode( musicNode );
        }
        return this.musicPlayer;
    }

    /**
     * 得到音效播放组件
     */
    private static getEffectPlayer (): cc.AudioSource {
        let effectNode = new cc.Node( "effect_node" );
        let as = effectNode.addComponent( cc.AudioSource );
        cc.director.getScene().addChild( effectNode );
        return as;
    }

    /**
     * 播放音效
     * @param url 要播放的音效URL
     */
    public static playEffect ( url: string ): void {
        if ( !this.enable_music ) {
            return;
        }

        let ac = CRes.getSound( url );
        if ( ac == null ) {
            CLOG.E( "the audio " + url + " was not cached! please cache it first" );
        }
        let as = this.getEffectPlayer();
        as.clip = ac;
        as.loop = false;
        as.play();
        let lastime = Math.floor( as.getDuration() * 1000 );
        as.scheduleOnce( () => {
            as.node.destroy();
        }, lastime );
    }

    /**
     * 播放背景音乐
     * @param url 播放得音乐URL
     */
    public static playBGMusic ( url: string ): void {
        if ( !this.enable_music ) {
            return;
        }

        let ac = CRes.getRes( url, cc.AudioClip );
        if ( ac == null ) {
            CLOG.E( "the audio " + url + " was not cached! please cache it first" );
        }
        let as = this.getMusicPlayer();
        if ( as.clip == ac ) {
            // 重复播放无意义
            return;
        }
        as.clip = ac;
        as.loop = true;
        as.play();
    }

    /*** 禁止声音 ***/
    public static disable_music (): void {
        CLocalStore.save_boolean( "enable_music", false );
        this.enable_music = false;
        this.getMusicPlayer().stop();
    }

    /*** 允许声音 ***/
    public static able_music (): void {
        CLocalStore.save_boolean( "enable_music", true );
        this.enable_music = true;

        // 重新播放背景音乐
        let music_player = this.getMusicPlayer();

        if ( music_player.clip != null ) {
            music_player.play();
        }
    }

    /*** 是否允许声音 ***/
    public static is_music_enable (): boolean {
        let ret = CLocalStore.load_boolean( "enable_music" );
        return ret != null ? ret : true;
    }

}