import {CheckboxValue} from '../types'

export enum OptionsType {
    All = 'all',
}
export interface Data {
    select: number|string|Array<CheckboxValue>;
    // 是否显示全选按钮
    showSelectAll: boolean;
}
