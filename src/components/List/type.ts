export interface ListProps {
    /**
     * @description 页数
     */
    page: number;
    /**
     * @description 页数别名
     */
    pageAlias: string;

    /**
     * @description 列表项渲染函数
     */
    renderItem:any;

}