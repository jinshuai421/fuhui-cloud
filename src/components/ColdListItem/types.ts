
import { ButtonType } from '@/components/Button/types';

export enum ColdStatus {
    /** 
     * 未共享
     */
    NOT_SHARE = '0',
    /**
     * 共享中
     */
    SHAREING = '1',

    /** 
     * 已关闭
     */
    CLOSED = '2',
    /** 
     * 未启用 
     */
    NOT_USE = '3',
}

// 冷库数据
export interface ColdItemData {

    /**
     * @description 冷库id
     *
     * @type {string}
     * @memberof ColdItemData
     */
    id: string;
    /**
     * @description 冷库状态
     */
    status: ColdStatus;
    image: string;
    /**
     * @description 冷库名
     */
    title: string;
    /**
     * @description 距离
     */
    distance?: number | string;
    /**
     * @description 剩余量
     */
    remaining?: string | number;
    /**
     * @description 标签
     */
    label: Array<string>;
    /**
     * @description 价格
     */
    price: string | number;
    /**
     * @description 电话
     */
    tel: string;
    /**
     * @description 预约人数
     */
    appointment: number | string;
    /**
     * @description 冷库地址
     */
    address: string;

    /**
     * @description 纬度
     *
     * @type {(number|string)}
     * @memberof ColdItemData
     */
    lat: number | string;


    /**
     * @description 经度
     *
     * @type {(number|string)}
     * @memberof ColdItemData
     */
    lng: number | string;
    vrHref?: string

}

export enum ColdState {

}

export interface ButtonItem {
    type: ButtonType,
    text?: string,
} 