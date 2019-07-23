let packageName = "uieditor";
let fs = require( 'fire-fs' );
// panel/index.js
Editor.Panel.extend( {
    style: fs.readFileSync( Editor.url( 'packages://' + packageName + '/panel/style.css', 'utf8' ) ) + "",
    template: fs.readFileSync( Editor.url( 'packages://' + packageName + '/panel/index.html', 'utf8' ) ) + "",

    $: {
        btn: '#btn'
    },

    ready() {
        Editor.log( "面板初始化中" );
        ( window.uicreator === void 0 ) && ( window.uicreator = {} );

        window.uicreator.vm = new window.Vue( {
            el: this.shadowRoot,
            data: {
                uis: [],
                inited: false,
                header: 'header',
                child: 'child'
            },
            methods: {
                // 加载按钮点击
                onLoadClick( event ) {

                    Editor.Scene.callSceneScript( "uieditor", 'initScene', function ( err, uis ) {
                        if ( uis.length > 0 ) {
                            window.uicreator.vm.inited = true;
                            window.uicreator.vm.uis = uis;
                        } else {
                            Editor.warn( "当前场景不存在UI" );
                        }
                    } );
                },

                checkFolderAndCreate( url ) {
                    if ( !fs.existsSync( url ) ) {
                        fs.mkdirSync( url );
                    }
                },

                // 导出数据
                onExportClick( event, override ) {
                    // 安全检查
                    for ( let i = 0; i < window.uicreator.vm.uis.length; i++ ) {
                        let uis = window.uicreator.vm.uis[ i ];
                        for ( let j = 0; j < uis.length; j++ ) {
                            const ui = uis[ j ];
                            if ( ui.out && ui.desc == "" ) {
                                Editor.warn( "请填写注释！！" );
                                return;
                            }

                            for ( let k = 0; k < ui.comps.length; k++ ) {
                                const comp = ui.comps[ k ];
                                if ( comp.out && comp.desc == "" ) {
                                    Editor.warn( "请填写注释！！" );
                                    return;
                                }

                            }
                        }
                    }

                    // 导出数据
                    for ( let i = 0; i < window.uicreator.vm.uis.length; i++ ) {
                        let ui = window.uicreator.vm.uis[ i ];
                        if ( ui.length < 1 || !ui[ 0 ].out ) continue;

                        let outevent = ui[ 0 ].outevent;

                        this.checkFolderAndCreate( Editor.url( "db://assets/script/ui" ) );

                        let uiname = ui[ 0 ].name
                        let descname = uiname + "_Define.ts";
                        let euiname = uiname + ".ts";
                        let folderPath = "db://assets/script/ui/" + window.uicreator.nowscene;
                        this.checkFolderAndCreate( Editor.url( folderPath ) );

                        let descpath = folderPath + "/" + descname;
                        let uipath = folderPath + "/" + euiname;

                        // 输出数据基类
                        let data = "";

                        data += "/*\n";
                        data += " ## this is ui creator auto generate\n";
                        data += " ## Copyright 2019 Timing.Leo.AllRightsReserved.”\n";
                        data += "*/\n\n";
                        data += "import { CUIBase } from \"../../../coffee_bean/ui/CUIBase\"\n";
                        data += "import { cuinfo } from \"../../../coffee_bean/ui/CUIDecorator\"\n";
                        data += "\n";
                        data += "const { ccclass, property } = cc._decorator;\n";
                        data += "\n";
                        data += "/**\n";
                        data += " * " + ui[ 0 ].desc + " \n";
                        data += " * \n";
                        data += " * @export\n";
                        data += " * @class " + uiname + "_Define\n";
                        data += "*/\n";
                        data += "@ccclass\n";
                        data += "@cuinfo( \"prefab/ui/" + uiname + "\", " + ui[ 0 ].isSingleton + ", \"请输入描述\" )\n";
                        data += "export default class " + uiname + "_Define extends CUIBase {\n";

                        // 输出定义
                        for ( let j = 1; j < ui.length; j++ ) {
                            let node = ui[ j ];
                            if ( node.out ) {
                                data += "    /** " + node.desc + "*/\n"
                                data += "    protected " + node.name.toLowerCase() + ": cc.Node;\n\n"
                            }

                            for ( let k = 0; k < node.comps.length; k++ ) {
                                const comp = node.comps[ k ];
                                if ( comp.out ) {
                                    let index = comp.name.indexOf( "<" );
                                    let compname = comp.name.substr( 0, index );
                                    let comptype = comp.name.substr( index + 1, comp.name.length - index - 2 );
                                    compname = compname.toLowerCase() + "_" + comptype.toLowerCase();

                                    data += "    /** " + comp.desc + "*/\n"
                                    data += "    protected " + compname + ": cc." + comptype + ";\n\n"
                                }
                            }
                        }

                        // 输出load
                        data += "    /**\n";
                        data += "     * 加载时\n";
                        data += "     *\n";
                        data += "     * @memberof " + uiname + "\n";
                        data += "     */\n";
                        data += "    protected onLoad (): void {\n"
                        for ( let j = 1; j < ui.length; j++ ) {
                            let node = ui[ j ];
                            if ( node.out ) {
                                data += "        this." + node.name.toLowerCase() + " = this.node.getChildByRelativePath( \"" + node.url.substr( 1 ) + "\" );\n";
                            }

                            for ( let k = 0; k < node.comps.length; k++ ) {
                                const comp = node.comps[ k ];
                                if ( comp.out ) {
                                    let index = comp.name.indexOf( "<" );
                                    let compname = comp.name.substr( 0, index );
                                    let comptype = comp.name.substr( index + 1, comp.name.length - index - 2 );
                                    compname = compname.toLowerCase() + "_" + comptype.toLowerCase();
                                    data += "        this." + compname + " = this.node.findChildComponent( \"" + node.url.substr( 1 ) + "\", cc." + comptype + " );\n";
                                }
                            }
                        }

                        data += "    } // load end\n\n";

                        data += "} // class end\n";

                        if ( override ) {
                            Editor.assetdb.createOrSave( descpath, data );
                        } else {
                            Editor.assetdb.create( descpath, data );
                        }


                        // 导出事件类
                        if ( outevent ) {
                            let data = ""

                            data += "/*\n";
                            data += " ## this is ui creator auto generate\n";
                            data += " ## Copyright 2019 Timing.Leo.AllRightsReserved.”\n";
                            data += "*/\n\n";
                            data += "import " + uiname + "_Define from \"./" + uiname + "_Define\"\n";
                            data += "import { EventUI } from \"../../../coffee_bean/expand/CExEvent\";\n"
                            data += "\n";
                            data += "const { ccclass, property } = cc._decorator;\n";
                            data += "\n";
                            data += "/**\n";
                            data += " * 事件逻辑类 " + ui[ 0 ].desc + "\n";
                            data += " *\n";
                            data += " * @export\n";
                            data += " * @class " + uiname + "\n";
                            data += " */\n";
                            data += "@ccclass\n";
                            data += "export default class " + uiname + " extends " + uiname + "_Define {\n"
                            data += "    /**\n";
                            data += "     * 加载时\n";
                            data += "     *\n";
                            data += "     * @memberof " + uiname + "\n";
                            data += "     */\n";
                            data += "    protected onLoad (): void {\n"
                            data += "        super.onLoad();\n\n";

                            let eventlist = [];

                            // 输出load
                            for ( let j = 1; j < ui.length; j++ ) {
                                let node = ui[ j ];

                                for ( let k = 0; k < node.comps.length; k++ ) {
                                    const comp = node.comps[ k ];
                                    if ( comp.out ) {
                                        let index = comp.name.indexOf( "<" );
                                        let compname = comp.name.substr( 0, index );
                                        let comptype = comp.name.substr( index + 1, comp.name.length - index - 2 );
                                        compname = compname.toLowerCase() + "_" + comptype.toLowerCase();

                                        if ( comptype == "Button" ) {
                                            data += "        this." + compname + ".node.on( EventUI.CLICK, this.on_" + compname + "_click, this );\n";
                                            eventlist.push( [ "on_" + compname + "_click", comp.desc + " click 事件" ] );
                                        } else if ( comptype == "Toggle" ) {
                                            data += "        this." + compname + ".node.on( EventUI.TOGGLE, this.on_" + compname + "_toggle, this );\n";
                                            eventlist.push( [ "on_" + compname + "_toggle", comp.desc + " toggle 事件" ] );
                                        }
                                    }
                                }
                            }

                            data += "    }\n\n";

                            data += "    /**\n";
                            data += "     * 开始\n";
                            data += "     */\n";
                            data += "    protected start(): void{\n\n";
                            data += "    } // start end\n\n";

                            // 输出事件
                            for ( let j = 0; j < eventlist.length; j++ ) {
                                const item = eventlist[ j ];
                                data += "    /**\n";
                                data += "     * " + item[ 1 ] + "\n";
                                data += "     */\n";
                                data += "    private " + item[ 0 ] + " (event): void{\n\n";
                                data += "    } // event end\n\n";
                            }
                            data += "} // class end\n";

                            if ( override ) {
                                Editor.assetdb.createOrSave( uipath, data );
                            } else {
                                Editor.assetdb.create( uipath, data );
                            }
                        }
                    }
                },

                onchange( e, node ) {
                    node.desc = e.target.value;
                }
            }
        } );
    },

    messages: {
        "onReady": function ( event ) {
            Editor.Scene.callSceneScript( "uieditor", 'getSceneName', function ( err, name ) {
                Editor.log( "当前场景名：" + name );
                ( window.uicreator === void 0 ) && ( window.uicreator = {} );
                window.uicreator.nowscene = name;
                window.uicreator.vm.uis = [];
                window.uicreator.vm.inited = false;
            } );
        }
    }
} );