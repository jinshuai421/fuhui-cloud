// export interface SearchHistoryItem {    
//     // 搜索内容
//     text: string;
// }

export interface SearchHistoryProps {
    /**
     * @description 新添加的搜索历史
     *
     * @type {string}
     * @memberof SearchHistoryProps
     */
    text: string;
}

export interface SearchHistoryData {
    /**
     * @description 可编辑
     *
     * @type {boolean}
     * @memberof SearchHistoryData
     */
    editable: boolean;

    /**
     * @description 历史记录
     *
     * @type {string[]}
     * @memberof SearchHistoryData
     */
    data: string[];

    /**
     *@description 本地存储字符串
     *
     * @type {string}
     * @memberof SearchHistoryData
     */
    storage: string;
    /**
     *@description 缺省页判断
     *
     * @type {boolean}
     * @memberof SearchHistoryData
     */
     prompt: boolean;


}

export const getState = ():SearchHistoryData=>{
    return {
        editable:false,
        data:[],
        storage:'',
        prompt:false
    }
}