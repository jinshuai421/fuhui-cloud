export interface StreetColdNum{
    // 冷库数量
    num:number|string;
    // 街道编码
    streetCode:number|string;
    // 街道名称
    /**
     * 成都市温江区
     */
    streetName:string;
}

export interface SelectStreetProps {
    /**
     * 可见
     */
    visible: boolean;

    // 街道数据
    data: Array<StreetColdNum>;

    /**
     * 选择街道
     */
    currentPosition: string;

}
