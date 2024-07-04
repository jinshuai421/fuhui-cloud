export interface ColdMarginAreaItemData {
    /**
     * @description 冷库剩余容积
     *
     * @type {string}
     * @memberof ColdMarginAreaItemData
     */
    area: string;

    /**
     * @description 日期
     *
     * @type {string}
     * @memberof ColdMarginAreaItemData
     */
    date?: string;
    /**
    * @description 冷库价格
    */
    storageMoney: string;
}

export interface ColdMarginAreaData {
    [date: string]: ColdMarginAreaItemData
}