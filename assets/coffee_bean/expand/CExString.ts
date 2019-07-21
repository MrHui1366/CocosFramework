import CMD5 from "../utils/CMD5";

/**
 * MD5字符串
 *
 * @returns MD5加密后的字符串
 * @memberof String
 */
String.prototype.MD5 = function ( this: string ): string {
    return CMD5.hashStr( this ) as string;
}


/**
 * 判断一个字符串是否为空
 *
 * @returns
 * @memberof String
 */
String.prototype.isEmptyOrNull = function ( this: string ): boolean {
    return this == null || this.length == 0;
}



/**
 * 函数:格式化字符串
 * 参数：str:字符串模板； data:数据
 * 调用方式:formatString("api/values/{id}/{name}",{id:101,name:"test"});
 *         formatString("api/values/{0}/{1}",101,"test");
 */
String.formatString = function ( str: string, ...data ): string {
    if ( !str || data == undefined ) {
        return str;
    }

    if ( str.indexOf( "{0}" ) == -1 ) {
        for ( const item of data ) {
            for ( let key in item ) {
                if ( item.hasOwnProperty( key ) ) {
                    str = str.replace( new RegExp( "\{" + key + "\}", "g" ), item[ key ] );
                }
            }
        }
    } else {
        let args = arguments,
            reg = new RegExp( "\{([0-" + ( args.length - 1 ) + "])\}", "g" );
        return str.replace( reg, function ( match, index ) {
            return args[ index - ( -1 ) ];
        } );
    }
    return str;
}

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
String.omitStr = function ( targetStr: string, omitStart: number, replacestr: string = '.', replacelen = 3 ): string {
    if ( targetStr.length <= omitStart ) {
        return targetStr;
    }
    let tail = replacestr.repeat( replacelen );
    return targetStr.substr( 0, omitStart ) + tail;
}


/**
 * UTF-8数组转字符串
 * @param array utf8数组
 */
String.Utf8ArrayToStr = function ( array: Array<number> ): string {
    var out, i, len, c;
    var char2, char3, char4;

    out = "";
    len = array.length;
    i = 0;
    while ( i < len ) {
        c = array[ i++ ];
        var pre = ( c >> 3 );
        if ( pre >= 0 && pre <= 15 ) {// 0xxxxxxx
            out += String.fromCharCode( c );
        } else if ( pre >= 24 && pre <= 27 ) {// 110x xxxx   10xx xxxx
            char2 = array[ i++ ];
            out += String.fromCharCode( ( ( c & 0x1F ) << 6 ) | ( char2 & 0x3F ) );
        } else if ( pre >= 28 && pre <= 29 ) {// 1110 xxxx  10xx xxxx  10xx xxxx
            char2 = array[ i++ ];
            char3 = array[ i++ ];
            out += String.fromCharCode( ( ( c & 0x0F ) << 12 ) |
                ( ( char2 & 0x3F ) << 6 ) |
                ( ( char3 & 0x3F ) << 0 ) );
        } else if ( pre == 30 ) {//1111 0xxx  10xx xxxx  10xx xxxx 10xx xxxx
            char2 = array[ i++ ];
            char3 = array[ i++ ];
            char4 = array[ i++ ];
            out += String.fromCharCode(
                ( ( c & 0x07 ) << 15 ) |
                ( ( char2 & 0x3F ) << 12 ) |
                ( ( char3 & 0x3F ) << 6 ) |
                ( ( char4 & 0x3F ) << 0 ) );
        }
    }

    return out;
}

/**
 * 十六进制字符串转十进制数字
 *
 * @param hexstring 十六进制字符串
 * @returns 数字
 * @memberof StringConstructor
 */
String.hexStrtoDecNumber = function ( hexstring: string ): number {
    let num = 0;
    for ( let i = 0; i < hexstring.length; i++ ) {
        const element = hexstring.charAt( i );
        num <<= 4;

        switch ( element ) {
            case 'A':
            case 'a':
                num += 10;
                break;
            case 'b':
            case 'B':
                num += 11;
                break;
            case 'c':
            case 'C':
                num += 12;
                break;
            case 'd':
            case 'D':
                num += 13;
                break;
            case 'e':
            case 'E':
                num += 14;
                break;
            case 'f':
            case 'F':
                num += 15;
                break;
            default:
                num += parseInt( element );
                break;
        }
    }

    return num;
}