
import {FilterProps} from '@/components/Filter/types'

export interface FilterItemFilterProps{
    title: string,
    config:FilterProps,

    /**
     * @description 是否置顶
     *
     * @type {boolean}
     * @memberof FilterItemFilterProps
     */
    top:boolean
    
}

interface Data {
    show: boolean;
    selectTab: boolean;
}


export const Data = function():Data{
    return {
        show: false,
        selectTab:false
    }
}