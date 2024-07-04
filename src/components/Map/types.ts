import { ColdItemData } from '@/components/ColdListItem/types'
import { ColdStatus } from '@/components/ColdListItem/types'


export interface MapProps {
    // 地图宽度
    width?: number | string;
    // 地图高度
    height?: number | string;
    // 显示全屏按钮
    showFullScreen?: boolean;
    // 显示全屏按钮的class
    fullScreenClassName?: string;
    // 显示重定位按钮
    showReset?: boolean;
    // 显示重定位按钮的class
    resetClassName?: string;
    /**
     * @description 标点数据
     */
    data: Array<MapPointerInfo>

}
// 经纬度类型
// type LatLngType = [number, number]

interface Data {
    // 地图实例
    map: any,
    // 标点数据
    marker: {
        data: Array<any>,
    },
    // 聚合点
    cluster: any,
}




/**
 * @description 地图标点数据
 *
 * @export
 * @interface MapPointerInfo
 */
export interface MapPointerInfo extends ColdItemData {
    /**
     * @description 冷库总容积
     */
    totalArea: number;
    /**
     * @description 纬度
     *
     * @type {number}
     * @memberof MapPointerInfo
     */
    lat: number;

    /**
     * @description 经度
     *
     * @type {number}
     * @memberof MapPointerInfo
     */
    lng: number;

    /**
     * @description 冷库余量
     *
     * @type {number}
     * @memberof MapPointerInfo
     */
    margin: number;

    /**
     * @description 冷库类型
     *
     * @type {string}
     * @memberof MapPointerInfo
     */
    coldType: string;

    /**
     * @description 街道编码
     */
    streetCode: number | string;

    /**
     * @description 街道名称
     */
    streetName: string;

    /**
     * @description 冷库状态
     */
    status: ColdStatus;

    /**
     * @#description 冷库地址
     */
    address: string;
    /**
     * @#description 冷库地址
     */
     price: string | number;
}




export const getState = function (): Data {
    return {
        map: null as any,
        marker: {
            data: []
        },
        cluster: {
            first: true,
            // 聚合点数量
            num: 0,
        },

    }
}