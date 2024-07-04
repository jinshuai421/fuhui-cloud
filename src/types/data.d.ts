// 统计关键数据
declare interface KeyData {
    text: string;
    num: number;
    unit?: string;
    
}


/**
 * @description 策略类型
 */
declare type Strategy<Type,ValueType> = {
    [k in keyof Type]: ValueType;
}