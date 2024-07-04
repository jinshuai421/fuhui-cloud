

export interface MatchingProps {
    /**
     * @description 匹配数量
     *
     * @type {number}
     * @memberof MatchingProps
     */
    number: number,
}

export interface MatchingData {
    /**
     * @description 计时器
     *
     * @type {(null|number)}
     * @memberof MatchingData
     */
    timer: null | number

    /**
     * @description 匹配时间
     *
     * @type {string}
     * @memberof MatchingData
     */
    matchTime: string,

    /**
     * @description 匹配状态
     *
     * @type {MatchStatus}
     * @memberof MatchingData
     */
    status: MatchStatus,


}

export enum MatchStatus {
    /**
     * @description 匹配中
     */
    Await = 'Await',
    /**
     * @description 匹配完成
     */
    Complete = 'Complete',
}

export const getState = (): MatchingData => {
    return {
        timer: null as any,
        matchTime: '',
        status: MatchStatus.Await
    }
}