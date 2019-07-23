let packageName = "scener";
let fs = require( 'fire-fs' );
// panel/index.js
Editor.Panel.extend( {
    style: fs.readFileSync( Editor.url( 'packages://' + packageName + '/panel/style.css', 'utf8' ) ) + "",
    template: fs.readFileSync( Editor.url( 'packages://' + packageName + '/panel/index.html', 'utf8' ) ) + "",

    ready() {
        Editor.log( "场景管理器 面板初始化中" );

        window.scener.vm = new window.Vue( {
            el: this.shadowRoot,
            data: {
                scenes: {}
            },

            created: function () {
                this.scenes.other = [];

                let path = Editor.url( "db://assets/scene" );
                let files = fs.readdirSync( path );

                files.forEach( ( itm, index ) => {
                    var stat = fs.statSync( path + "/" + itm );
                    if ( stat.isDirectory() ) {
                        this.scenes[ itm ] = [];

                        let infiles = fs.readdirSync( path + "/" + itm );
                        infiles.forEach( ( initm, inindex ) => {
                            // 场景文件
                            if ( initm.indexOf( ".fire" ) > 0 && initm.indexOf( ".meta" ) == -1 ) {
                                this.scenes[ itm ].push( initm );
                            }
                        } );
                    } else {
                        // 场景文件
                        if ( itm.indexOf( ".fire" ) > 0 && itm.indexOf( ".meta" ) == -1 ) {
                            this.scenes.other.push( itm );
                        }
                    }
                } );


            },

            methods: {
                // 加载按钮点击
                onclick( folder, scenename ) {
                    let path = "";
                    if ( folder == "other" ) {
                        path = "db://assets/scene/" + scenename;
                    } else {
                        path = "db://assets/scene/" + folder + "/" + scenename;
                    }

                    let uuid = Editor.remote.assetdb.urlToUuid( path );
                    _Scene.loadSceneByUuid( uuid );
                },

            }
        } );
    },

    messages: {
        "onReady": function ( event ) {
            Editor.Scene.callSceneScript( "scener", 'getSceneName', function ( err, name ) {
                Editor.log( "当前场景名：" + name );
            } );
        }
    }
} );