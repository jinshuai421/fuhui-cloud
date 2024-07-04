import { SortData } from './components/FilterItemSort/types'
import { FilterProps } from '@/components/Filter/types';
// import  {FormData} from '@/components/Form/types'
import { FilterButtonData } from '@/components/Filter/types'

// 筛选功能类型  sort:排序    dropdown:下拉   filter:筛选
// export type FilterEffectType = 'sort' | 'dropdown' | 'filter' 
export enum FilterEffectType {
    sort = 'sort',
    dropdown = 'dropdown',
    filter = 'filter',
}

export interface FilterBarChangeEvent {
    type: FilterEffectType,
    data: any
}

// 排序状态 positive 正序 reverse 倒序 normal 默认顺序
export type SortState = 'positive' | 'reverse' | 'normal'


// 下拉菜单状态     open 展开   close 关闭
export type DropdownState = 'open' | 'close'


// 下拉菜单类型     single 单选    multiple 多选
export type DropdownType = 'single' | 'multiple'


// 筛选数据类型     single 单选    multiple 多选  range 范围
export type FilterDataType = 'single' | 'multiple' | 'range'

export interface OperateType {
    button: Array<FilterButtonData>
    operateClassName?: string
}


// 筛选配置
export interface FilterBarConfigItem {
    type: FilterEffectType,
    title: string,
    data: SortData | FilterProps,
};

export type FilterBarConfig = Array<FilterBarConfigItem>;


export interface Data {
    filterData: any;
    refs: Partial<Record<keyof typeof FilterEffectType, any>>
}

export interface EventValue {
    field: string;
    value: any
}


export const getState = (): Data => {
    return {
        filterData: {},
        refs: {
            [FilterEffectType.sort]: [],
            [FilterEffectType.filter]: [],
        }
    }
}