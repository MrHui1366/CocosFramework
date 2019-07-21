/**
 * UI装饰器接口
 */
export interface ICUInfo {
    prefab_url: string;
    is_singleton: boolean;
    desc: string;
}

/**
 * UI装饰器
 * @param prefab_url 预制体名字
 * @param is_singleton 是否是单例UI
 * @param desc 描述
 */
export function cuinfo ( prefab_url: string, is_singleton: boolean, desc: string = "这是一个UI" ) {
    return ( target ) => {
        target.prefab_url = prefab_url;
        target.is_singleton = is_singleton;
        target.desc = desc;
    };
}

/**
 * UI动画装饰器
 *
 * @export
 */
export function hideAnim () {

}