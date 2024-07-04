
export enum TimeType {
    /**
     *  @description 开始时间
     */
    Start = 'start',

    /**
     * @description 结束时间
     */
    End = 'end',
}

export interface DatetimePickerData {
    /**
     * @description 选择的时间
     */
    date:[Date?,Date?];
    /**
     * @description 当前操作的时间类型
     */
    currentType:TimeType;


}

