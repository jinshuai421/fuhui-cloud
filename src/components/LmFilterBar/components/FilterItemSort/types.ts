
// 排序状态 positive 正序 reverse 倒序 normal 默认顺序
export enum SortState {
    /**
     * @description 正序
     */
    Positive = 'positive',
    /**
     * @description 倒序
     */
    Reverse = 'reverse',
    /**
     * @description 默认顺序
     */
    Normal = 'normal',
}

export interface SortData {
    sort: SortState,
    // title: string,
    field: string,
}


export const stateSwitch = (state:SortState):SortState=>{
    if(state === SortState.Positive){
        return SortState.Reverse
    }

    if(state === SortState.Reverse){
        return SortState.Normal
    }

    if(state === SortState.Normal){
        return SortState.Positive
    }

    return SortState.Normal

}