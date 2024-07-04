// import {
//     getLocation,
// } from '@/third/map/Tencent/index'

// import {
//     getLocation,
// } from '@/third/map/Amap/index'

import {
  isAlipayMiniProgram,
  isWeChat,
  isZLB,
  isZLBWeChatMiniProgram,
} from "./env";
import { wxAuth } from "@/utils/wx";

import { getCurrentLocation as getZLBCurrentLocation } from "@/utils/zlb";
import { H5Nav } from "@/third/map/Tencent";
import { reportNav } from "./aegis";

// 获取事件中的dataset指定key的数据
export const getDataset = function (e: MouseEvent, key: string): any {
  const { target } = e;
  let el = target;
  while (el) {
    const { dataset } = el as HTMLElement;
    if (dataset?.[key]) {
      return dataset[key];
    }
    el = (el as HTMLElement)?.parentElement;
  }

  return null;
};

type GetlocationPromiseType = Promise<{ lat: number; lng: number }>;

/**
 * @description 微信IOS同时多次调用只触发一次
 */
let wxGetlocationPromise: GetlocationPromiseType | null;

/**
 * @description 获取当前定位
 *
 * @returns
 */
export const getCurrentLocation = (): GetlocationPromiseType => {
  /**
   * @description 数据模拟
   */
  // return Promise.resolve({ lat: 29.875571, lng: 121.70357 })

  // const data =  await getLocation()
  if (wxGetlocationPromise) return wxGetlocationPromise;

  if (isZLB || isAlipayMiniProgram || isZLBWeChatMiniProgram) {
    return (wxGetlocationPromise = getZLBCurrentLocation() as any);
  }

  // if (!isWeChat) {
    return (wxGetlocationPromise = getCurrentLocationH5());
  // }

  // wxGetlocationPromise = new Promise((resolve, reject) => {
  //   // console.log("getCurrentLocation调用");

  //   wxAuth().then(() => {
  //     console.log("wxAuth的then执行 ");

  //     wx.getLocation({
  //       type: "wgs84", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
  //       altitude: true,
  //       success: function (res) {
  //         console.log("getLocation 获取成功");

  //         wxGetlocationPromise = null;
  //         console.log("wx.getLocation success", res);

  //         resolve({ lat: res.latitude, lng: res.longitude });
  //       },
  //       fail: function (err) {
  //         console.log("getLocation 获取失败");

  //         console.log("wx.getLocation fail", err);
  //         // reject(err);
  //         resolve({ lat: 30.188804, lng: 121.26274 });
  //       },
  //     });
  //   });
  // });
  // console.log(wxGetlocationPromise,123)

  // return wxGetlocationPromise;
};

export const mapNav = (
  to: LngLatObj,
  from?: LngLatObj,
  name: string = "",
  address: string = ""
) => {
  reportNav({
    to,
    from,
    name,
    address,
  });
  return H5Nav(to, from, name, address);
};


export const getCurrentLocationH5 = (): GetlocationPromiseType => {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(
      (res) => {
        console.log("getCurrentLocationH5", {
          lat: res.coords.latitude,
          lng: res.coords.longitude,
        });

        resolve({ lat: res.coords.latitude, lng: res.coords.longitude });
      },
      (err) => {
        console.log("getCurrentLocationH5 error", err);
        /**
         * @description 慈溪农业局
         */
        // resolve({ lat: 30.188804, lng: 121.26274 });
        // 南商
        resolve({ lat: 29.804939, lng: 121.54593 });
        // reject(err);
      },
      {
        timeout: 3000,
        enableHighAccuracy: true,
      }
    );
  });
};

/**
 * @description 清空无效参数
 */
export const clearInvalidParams = function (params: any) {
  const keys = Object.keys(params);
  for (let key of keys) {
    const item = params[key];
    if (["", undefined, null].includes(item)) {
      delete params[key];
    }
  }
};

/**
 * @description 处理营业时间格式
 */
export const formatBusinessHours = (time: string) => {
  const match = time.match(/((?::?\d{2}){2})/);
  if (match) {
    return match[0];
  }
  return "";
};
