interface Function implements FunctionConstructor {
    /**
     * 返回一个函数是否绑定过this
     *
     * @returns
     * @memberof Function
     */
    hasBind (): boolean;
}