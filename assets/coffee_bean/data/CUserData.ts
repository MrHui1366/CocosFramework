/**
 * CoffeeBean
 * 用户数据封装
 * 
 * By Leo
 */

import { CSingleton } from './../core/CSingleton';
import CRes from './../core/CRes';

/**
 * 吉祥美大厅返回用户数据结构
 */
export class UserInfo {
    /*** 用户ID ***/
    public user_id: string;
    /*** 用户名 ***/
    public user_name: string;
    /*** 用户性别 ***/
    public user_sex: string;
    /*** 用户头像 ***/
    public user_icon: string;
    /*** 用户VIP等级 ***/
    public vip_level: string;
    /*** 游戏ID ***/
    public game_id: string;
    /*** 所在区域 ***/
    public area: string;
    /*** 设备号 ***/
    public device: string;
}

/**
 * 用户数据管理
 * 提供用户数据的存储和访问
 *
 * @export
 * @class CUserData
 */
export class CUserData extends CSingleton {
    /*** 用户信息 ***/
    private _userinfo: UserInfo;

    /*** 用户信息 ***/
    public get UserInfo (): UserInfo { return this._userinfo; }

    /**
     * 使用本地json来初始化用户信息
     *
     * @memberof CUserData
     */
    public initWithLocalData (): void {

        let jsonobj = CRes.getJson<UserInfo>( "resources/config/account.json" );
        this._userinfo = jsonobj;
    }

}