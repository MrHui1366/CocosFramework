"use strict";
cc._RF.push(module, '426bbruaplLxo7JmKTmFQNF', 'CSound');
// coffee_bean/core/CSound.ts

"use strict";
/**
 * CoffeeBean
 * 声音封装
 * 包含声音的播放控制
 *
 * By Leo
 */
Object.defineProperty(exports, "__esModule", { value: true });
var CRes_1 = require("./CRes");
var CLOG_1 = require("../utils/CLOG");
var CLocalStore_1 = require("../data/CLocalStore");
var CSound = /** @class */ (function () {
    function CSound() {
    }
    /**
     * 得到背景音乐播放组件
     * 唯一的
     * 不会随着游戏而销毁的
     */
    CSound.getMusicPlayer = function () {
        if (this.musicPlayer == null) {
            var musicNode = new cc.Node("music_node");
            this.musicPlayer = musicNode.addComponent(cc.AudioSource);
            cc.director.getScene().addChild(musicNode);
            cc.game.addPersistRootNode(musicNode);
        }
        return this.musicPlayer;
    };
    /**
     * 得到音效播放组件
     */
    CSound.getEffectPlayer = function () {
        var effectNode = new cc.Node("effect_node");
        var as = effectNode.addComponent(cc.AudioSource);
        cc.director.getScene().addChild(effectNode);
        return as;
    };
    /**
     * 播放音效
     * @param url 要播放的音效URL
     */
    CSound.playEffect = function (url) {
        if (!this.enable_music) {
            return;
        }
        var ac = CRes_1.default.getSound(url);
        if (ac == null) {
            CLOG_1.default.E("the audio " + url + " was not cached! please cache it first");
        }
        var as = this.getEffectPlayer();
        as.clip = ac;
        as.loop = false;
        as.play();
        var lastime = Math.floor(as.getDuration() * 1000);
        as.scheduleOnce(function () {
            as.node.destroy();
        }, lastime);
    };
    /**
     * 播放背景音乐
     * @param url 播放得音乐URL
     */
    CSound.playBGMusic = function (url) {
        if (!this.enable_music) {
            return;
        }
        var ac = CRes_1.default.getRes(url, cc.AudioClip);
        if (ac == null) {
            CLOG_1.default.E("the audio " + url + " was not cached! please cache it first");
        }
        var as = this.getMusicPlayer();
        if (as.clip == ac) {
            // 重复播放无意义
            return;
        }
        as.clip = ac;
        as.loop = true;
        as.play();
    };
    /*** 禁止声音 ***/
    CSound.disable_music = function () {
        CLocalStore_1.default.save_boolean("enable_music", false);
        this.enable_music = false;
        this.getMusicPlayer().stop();
    };
    /*** 允许声音 ***/
    CSound.able_music = function () {
        CLocalStore_1.default.save_boolean("enable_music", true);
        this.enable_music = true;
        // 重新播放背景音乐
        var music_player = this.getMusicPlayer();
        if (music_player.clip != null) {
            music_player.play();
        }
    };
    /*** 是否允许声音 ***/
    CSound.is_music_enable = function () {
        var ret = CLocalStore_1.default.load_boolean("enable_music");
        return ret != null ? ret : true;
    };
    /**
     * 背景音乐播放器
     */
    CSound.musicPlayer = null;
    /*** 是否允许音乐 ***/
    CSound.enable_music = true;
    return CSound;
}());
exports.default = CSound;

cc._RF.pop();