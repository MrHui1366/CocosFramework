

// panel/index.js
module.exports = {
    'getSceneName': function ( event ) {
        let ret = cc.director.getScene().name
        // debugger
        if ( event.reply ) {
            event.reply( null, ret );
        }
    },

    'initScene': function ( event ) {
        Editor.log( "开始检查场景" );
        // 获得所有的UI节点,组件，
        let ret = this.init();

        // debugger
        if ( event.reply ) {
            event.reply( null, ret );
        }
    },

    init () {
        let canvas = cc.find( 'Canvas' );
        if ( canvas == null ) {
            Editor.log( "请先选择一个场景" );
            return null;
        }

        let childs = canvas.children;

        let uis = [];

        for ( let i = 0; i < childs.length; i++ ) {
            const child = childs[ i ];
            let ui = [];

            if ( child.name.substr( 0, 3 ) == "UI_" ) {
                this.handlerUI( child, ui );
                uis.push( ui );
            }
        }

        Editor.log( "处理UI结束" );
        return uis;
    },

    handlerUI ( uinode, uic ) {
        Editor.log( "处理 UI :" + uinode.name );

        let ui = {};
        ui.name = uinode.name;
        ui.url = "";
        ui.comps = [];
        ui.isroot = true;
        ui.offset = 0;
        ui.out = true;
        ui.isSingleton = true;
        ui.desc = "";
        ui.outevent = false;

        uic.push( ui );

        this.appendChild( uinode, uic, ui.url, ui.offset );

        return uic;
    },

    appendChild ( node, uic, url, offset ) {
        let childs = node.children;

        for ( let i = 0; i < childs.length; i++ ) {
            let uinode = {};
            uinode.name = childs[ i ].name;
            uinode.url = url + "/" + uinode.name;
            uinode.comps = [];
            uinode.isroot = false;
            uinode.offset = offset + 4;
            uinode.out = false;
            uinode.desc = "";

            for ( let k = 0; k < childs[ i ]._components.length; k++ ) {
                let comp = {};
                comp.name = childs[ i ]._components[ k ].name;
                comp.out = false;
                comp.desc = "";

                uinode.comps.push( comp );
            }
            uic.push( uinode );

            this.appendChild( childs[ i ], uic, uinode.url, uinode.offset );
        }
    }

};