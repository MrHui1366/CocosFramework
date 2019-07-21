
/**
 * CoffeeBean
 * 字符串扩展
 *
 * By Leo
 */
interface String implements StringConstructor {

    /**
     * MD5字符串
     *
     * @returns MD5加密后的字符串
     * @memberof String
     */
    MD5 ( this: string ): string;

    /**
     * 判断一个字符串是否为空
     *
     * @returns
     * @memberof String
     */
    isEmptyOrNull ( this: string ): boolean;
}

/**
 * String 构造器
 *
 * @interface StringConstructor
 */
interface StringConstructor {
    new(): String;

    /**
     * 函数:格式化字符串
     * 参数：str:字符串模板； data:数据
     * 调用方式:String.formatString("api/values/{id}/{name}",{id:101,name:"test"});
     *          String.formatString("api/values/{0}/{1}",101,"test");
     */
    formatString ( str: string, ...data ): string;

    /**
    * 将一个字符串省略一定长度，以特定字符替代
    * 如
    *     String.omitStr('asdgadsgdf',3)  =>  'asd...';
    *     String.omitStr('asdgadsgdf',4 ,'*')  =>  'asdg***';
    *     String.omitStr('asdgadsgdf',5 ,'$' ,2)  =>  'asdga$$';
    *
    * @param targetStr 目标字符串
    * @param omitStart 保留长度
    * @param replacestr 替换字符
    * @param replacelen 替换长度
    */
    omitStr ( targetStr: string, omitStart: number, replacestr: string = '.', replacelen = 3 ): string;


    /**
     * UTF-8数组转字符串
     * 
     * @param array  utf8数组
     * @returns 字符串
     * @memberof StringConstructor
     */
    Utf8ArrayToStr ( array: Array<number> ): string;

    /**
     * 十六进制字符串转十进制数字
     *
     * @param hexstring 十六进制字符串
     * @returns 数字
     * @memberof StringConstructor
     */
    hexStrtoDecNumber ( hexstring: string ): number;

}