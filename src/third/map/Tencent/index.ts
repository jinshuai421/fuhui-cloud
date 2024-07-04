declare let qq: any;

import { KEY } from "@/config/map";
// import CustomOverlay from "./CustomOverlay";

import { getAction } from "@/command/netTool";

import { wxAuth } from "@/utils/wx";
import { isAlipayMiniProgram, isWeChat, isZLB, isZLBWeChatMiniProgram } from "@/utils/env";
import { getParamUrl } from "@/utils/util";
import { isApp, navMap } from "@/utils/app";
import { getCurrentLocation } from "@/utils/zlb";
import {
    mapNav as mapNavZLB
} from "@/utils/zlbjssdk";


// 腾讯地图初始化参数
// 参考：https://lbs.qq.com/javascript_v2/doc/mapoptions.html
interface MapOptions {
    // 地图中心坐标
    center?: [lat: number, lng: number];
    // 缩放级别
    zoom?: number;
    // 地图类型控件的初始启用/停用状态。
    mapTypeControl?: boolean;
    // 平移控件的初始启用/停用状态。
    panControl?: boolean;
    // 缩放控件的初始启用/停用状态。
    zoomControl?: boolean;
    // 比例尺控件的初始启用/停用状态。
    scaleControl?: boolean;
    // 如果为 false，则禁止拖动地图。默认情况下启用拖动。
    draggable?: boolean;
    // 地图样式ID，有效值为‘style[编号]’，与key绑定，详见个性化地图配置页面。
    mapStyleId?: string;
}

// 初始化地图
export const init = (el: Element, options?: MapOptions): any => {
    if (qq) {
        return new qq.maps.Map(el, options);
    }
};

// Geolocation实例
let geo: any;

const initGeo = () => {
    return new qq.maps.Geolocation(KEY, "中兴慧农", {
        failTipFlag: true,
    });
};

export interface LocationData {
    /**
     * @description 误差范围，以米为单位
     *
     * @type {number}
     * @memberof LocationData
     */
    accuracy: number;

    /**
     * @description 行政区ID，六位数字, 前两位是省，中间是市，后面两位是区，比如深圳市ID为440300
     *
     * @type {number}
     * @memberof LocationData
     */
    adcode: number;

    /**
     * @description 地址信息
     *
     * @type {string}
     * @memberof LocationData
     */
    addr: string;

    /**
     * @description 城市信息
     *
     * @type {string}
     * @memberof LocationData
     */
    city: string;

    /**
     * @description 纬度
     *
     * @type {number}
     * @memberof LocationData
     */
    lat: number;

    /**
     * @description 经度
     *
     * @type {number}
     * @memberof LocationData
     */
    lng: number;
    module: "geolocation";

    /**
     * @description 国家信息
     *
     * @type {string}
     * @memberof LocationData
     */
    nation: string;

    /**
     * @description 省信息
     *
     * @type {string}
     * @memberof LocationData
     */
    province: string;

    /**
     * @description 定位类型
     *
     * @type {string}
     * @memberof LocationData
     */
    type: string;
}

// 获取当前定位
export const getLocation = (): Promise<LocationData> => {
    if (!geo) {
        geo = initGeo();
    }
    const local = getLastLocation();
    return new Promise((resolve, reject) => {
        if (local) resolve(local);

        geo.getLocation(
            function success(res: LocationData) {
                localStorage.setItem("lastLocation", JSON.stringify(res));
                if (!local) location.reload();
                resolve(res);
            },
            function fail(err: any) {
                console.log("腾讯地图定位失败", err);
                const local = getLastLocation();
                if (local) {
                    reject(err);
                } else {
                    resolve(local);
                }
            },
            {
                // timeout:5,
                failTipFlag: true,
            },
        );
    });
};

/**
 * @description 获取上次定位
 */
export const getLastLocation = (): LocationData => {
    const lastLocation = JSON.parse(localStorage.getItem("lastLocation") || "null");
    return lastLocation;
};

interface LatLng {
    lat: number;
    lng: number;
}
// 创建坐标点
export const createLatLng = (lat: number, lng: number): LatLng => {
    return new qq.maps.LatLng(lat, lng);
};

// 创建标记覆盖内容
export const createMarkerDecoration = (content: string, offset?: any) => {
    return new qq.maps.MarkerDecoration(
        content,
        offset,
    );
};

export const createMVCArray = () => {
    return new qq.maps.MVCArray();
};

// options参考https://lbs.qq.com/javascript_v2/doc/markercluster.html
// 添加聚合点
export const addCluster = (options: any) => {
    return new qq.maps.MarkerCluster(options);
};

// 参考文档 https://lbs.qq.com/javascript_v2/doc/markeroptions.html
// 添加覆盖物
export const addMarker = (optinos: any) => {
    if (optinos.icon === false) {
        optinos.icon = new qq.maps.MarkerImage(" ");
    }
    return new qq.maps.Marker(optinos);
};

// 创建标记点
// export const createMarker = (location: any, marker: string, onClick?: Function) => {
//     return new CustomOverlay(location, marker, onClick);
// };

// 添加监听事件
export const addListener = (map: any, event: string, callback: Function) => {
    qq.maps.event.addListener(map, event, callback);
};

// 移除监听事件
export const removeListener = (map: any, event: string, callback: Function) => {
    qq.maps.event.removeListener(map, event, callback);
};

/**
 * @description 你地址解析
 */
export const getAddress = (lat?: number, lng?: number): Promise<any> => {
    return getAction("https://api.map.qq.com/ws/geocoder/v1/?location=30.03619,122.079828");
};

export enum H5NavParamsType {
    /**
     * 公交
     */
    Bus = "bus",
    /**
     * @description 驾车
     */
    Drive = "drive",
    /**
     * @description 步行
     */
    Walk = "walk",
    /**
     * @description 骑行
     */
    Bike = "bike",
}

export type LatLngType = [number, number];
/**
 * @description H5导航参数
 */
export interface H5NavParams {
    // type: H5NavParamsType,
    /**
     * @description 起点经度
     */
    spointx: number;
    /**
     * @description 起点纬度
     */
    spointy: number;

    /**
     * @description 终点经度
     */
    epointx: number;
    /**
     * @description 终点纬度
     */
    epointy: number;
    /**
     * @description 终点名称
     */
    eword: string;
    referer: string;
    key: string;
}

/**
 * @description H5导航
 */
export const H5Nav = async (to: LatLng, from?: LatLng, name: string = '', address: string = '') => {
    // addNavCountAPI()
    if (!from) {
        if (isZLB || isAlipayMiniProgram) {
            from = await getCurrentLocation()
            const params = getParamUrl({
                from: [from!.lng, from!.lat, '开始位置'].toString(),
                to: ([] as any[]).concat(to.lng, to.lat, '结束位置').toString(),
                mode: 'car',
                policy: 0,
                callnative: 1
            })
            console.log(params)
            mapNavZLB(to,from)
            setTimeout(() => {
                if (!document.hidden) {
                    location.href = '//uri.amap.com/navigation?' + params
                }
            }, 2000)
            return;
        } else {

            from = getLastLocation() || {};
        }
    }
    if (isWeChat || isZLBWeChatMiniProgram) {
        wxAuth().then(() => {
            wx.openLocation({
                latitude: parseFloat(to.lat as any),
                longitude: parseFloat(to.lng as any),
                name,
                address,
                scale: 14,
                infoUrl: "",
            });
        });

        setTimeout(() => {

            if (!document.hidden) {
                const params: H5NavParams = {
                    spointx: from!.lng,
                    spointy: from!.lat,
                    epointx: to.lng,
                    epointy: to.lat,
                    eword: "目的地",
                    referer: "myApp",
                    key: KEY,
                };

                location.href = `https://map.qq.com/nav/drive#routes/page?${getParamUrl(params)}`;
            }
        }, 1000)
        return;
    }
    // debugger
    if (isApp()) {
        navMap(to.lat, to.lng)
        return
    }
    const params: H5NavParams = {
        spointx: from.lng,
        spointy: from.lat,
        epointx: to.lng,
        epointy: to.lat,
        eword: "目的地",
        referer: "myApp",
        key: KEY,
    };

    location.href = `https://map.qq.com/nav/drive#routes/page?${getParamUrl(params)}`;
};
