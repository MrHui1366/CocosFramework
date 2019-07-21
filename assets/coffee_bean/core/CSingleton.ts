/**
 * CoffeeBean
 * 单例封装
 * 
 * By Leo
 */

/**
 * 普通单例类
 * 
 * 示例
 * export class test:CSingleton{
 *     public a:number = 10; 
 * }
 * 可以使用 
 *     test.instance().a 
 * 来访问其成员
 */

export class CSingleton {
    private static _inst = null;
    public static instance<T extends CSingleton> ( this: { new(): T } & typeof CSingleton ): T {
        if ( this._inst == null )
            this._inst = new this();

        return this._inst;
    }
}


