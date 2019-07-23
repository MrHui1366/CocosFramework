'use strict';

module.exports = {
    load() {
        // 当 package 被正确加载的时候执行
    },

    unload() {
        // 当 package 被正确卸载的时候执行
    },

    messages: {
        "open": () => {
            Editor.log( "打开Panel" );
            Editor.Panel.open( "uieditor" );
        }
        ,
        "scene:ready": function ( a, b, c ) {
            Editor.log( "场景加载完成" );
            Editor.Ipc.sendToPanel( 'uieditor', 'onReady' );
        }
    }
}