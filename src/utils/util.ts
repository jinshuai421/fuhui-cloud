import { Toast, ImagePreview } from "vant";
// import { reportCall } from "./aegis";
import { isAlipayMiniProgram, isZLB, isZLBWeChatMiniProgram } from "./env";

import { getToken } from "@/state/user";
import { callUp as callUpZLB } from "@/utils/zlbjssdk";
export interface AntiShakeResultHandler {
  (): void;
}

export interface AntiShakeResultCancel {
  (): void;
}

export interface AntiShakeResult {
  /**
   * @description 防抖函数
   *
   * @memberof AntiShakeResult
   */
  handler: AntiShakeResultHandler;

  /**
   * @description 用来清除防抖的函数
   *
   * @memberof AntiShakeResult
   */
  cancel: AntiShakeResultCancel;
}

/**
 * @desc 防抖
 * @param {Function} fn 调用函数
 * @param {Number} delay 防抖时间 单位ms
 * @param {Object} thisArg 需要绑定的this
 * @returns {Object}
 */
export const antiShake = (fn: Function, delay: number, thisArg: any) => {
  let timer: any = null;
  fn = fn.bind(thisArg);
  const handler = (...rset: any[]) => {
    fn(...rset);
    timer = null;
  };
  return {
    handler() {
      if (timer) {
        clearTimeout(timer);
      }

      timer = setTimeout(handler, delay, ...arguments);
      return;
    },
    cancel() {
      if (!timer) return;
      clearTimeout(timer);
    },
  };
};

export interface PreventRepeatedClickResult {
  disabled: () => void;
  enable: () => void;
  getStatus: () => boolean;
}

/**
 * @description 防止重复点击
 */
export function preventRepeatedClick(
  status: boolean = true
): PreventRepeatedClickResult {
  let clickable = status;
  return {
    disabled() {
      clickable = false;
    },
    enable() {
      clickable = true;
    },
    getStatus() {
      return clickable;
    },
  };
}

/**
 * @description 获取距离文字
 *
 * @param distance
 * @returns
 */
export const getDistanceText = (distance: number): string => {
  if (distance > 1000) {
    return `${(distance / 1000).toFixed(2)}km`;
  }
  return `${distance}m`;
};

/**
 * @description 判断是否是''、undefined、null
 */
export const isFalse = (val: any): boolean => {
  return ["", undefined, null].includes(val);
};

/**
 * @description 判断数组元素是否都是''、undefined、null或长度为0
 */
export const isFalseArr = (value: any[]): boolean => {
  if (value.length === 0) return true;
  for (let item of value) {
    if (!isFalse(item)) return false;
  }
  return true;
};

/**
 * @description 打电话
 */
export const callUp = (phone: string, statistics: boolean = true) => {
  // if (statistics) {
  //   addTelephoneReservationCountAPI()
  // }

  // reportCall(phone);
  // if (isZLB || isAlipayMiniProgram || isZLBWeChatMiniProgram) {
  //   // callUpZlb(phone)
  //   callUpZLB(phone);
  //   return;
  // }
  location.href = `tel:${phone}`;
};

/**
 * @description 将对象转成encodeurl格式
 * @param params
 * @returns
 */
export const getParamUrl = (params: any) => {
  let str = "";

  const keys = Object.keys(params);
  for (let key of keys) {
    str += `${key}=${params[key]}&`;
  }
  return str.slice(0, -1);
};

/**
 * @description 获取消息日期，去除日期中当前的年份
 */
export const getMessageDateText = (date: string = ""): string => {
  date = date?.match(/(\d{4}(?:-\d{2}){2})/)?.[0] || "";

  if (date) {
    const year = date.slice(0, 4);
    const currentYear = new Date().getFullYear();
    if (parseInt(year) === currentYear) {
      date = date.slice(5);
    }
  }

  return date;
};

export const encodeUrl = (url: string): string => {
  url = url.replace(
    /((?:(?:\?|&)[\w]+)=)([^&]*)(&?)/g,
    function (match: string, name: string, value: string, symbol: string = "") {
      // debugger
      return name + encodeURIComponent(value) + symbol;
    }
  );

  return url;
};

//中兴慧农授权登录

export const zxhnOuthLogin = () => {
  // let redirect_uri = encodeURI(
  //   "http://192.167.5.42:1000/#/pages/zlbIndex/index"
  // );
  // let ssoUrl =
  //   "http://sso.palm.ztesa.work/oauth/authorize?client_id=nqb&redirect_uri=" +
  //   redirect_uri;
  // //ssoUrl += "&response_type=code&scope=server&state=nqb";
  // ssoUrl +=
  //   "&response_type=code&scope=server&state=nqb&token_type=bearer&access_token=" +
  //   getToken();
  // window.open(ssoUrl);
};

/**
 * @description 将hash中的参数转为对象
 */
export const hashToObject = (
  hash: string
): null | { [key: string]: string } => {
  if (!hash) return null;
  if (!hash.includes("#")) return null;
  hash =
    hash
      .split("#")
      .filter((item) => item)
      .pop() || "";
  if (!hash.includes("?")) return null;
  hash =
    hash
      .split("?")
      .filter((item) => item)
      .pop() || "";
  if (!hash) return null;

  return urlencodedToObject(hash);
};

/**
 * @description 将url中的参数转为对象
 */
export const urlToObject = (
  params: string
): null | { [key: string]: string } => {
  if (!params) return null;
  if (!params.includes("?")) return null;
  params =
    params
      .split("?")
      .filter((item) => item)
      .pop() || "";
  if (!params) return null;
  return urlencodedToObject(params);
};

/**
 * @description 将urlencoded格式的参数转为对象
 */
export const urlencodedToObject = (
  url: string
): null | { [key: string]: string } => {
  const obj = {} as any;
  const arr = url
    .replace("///g", "")
    .split("&")
    .filter((item) => item);
  for (let item of arr) {
    const [key, value] = item.split("=");
    obj[key] = value;
  }
  return obj;
};

/**
 * @description 将px转为vw
 */
export const pxToVw = (px: number | string) => {
  if (typeof px === "string") {
    px = parseFloat(px);
  }
  // return `${(px / 375) * 100}vw`
  return `${(px / 375) * 100}vw`;
};

/**
 * @description 将vw转为px
 */
export const vwToPx = (vw: number | string) => {
  if (typeof vw === "string") {
    vw = parseFloat(vw);
  }

  const width = window.innerWidth;
  return `${(vw / 100) * width}px`;
};

export const getSize = (size: string) => {
  if (size.includes("%")) {
    return size;
  } else {
    return pxToVw(parseFloat(size));
  }
};

/**
 * @description 格式化数字
 */
export const formatNumber = (num: number | string, digits: number = 2) => {
  if (typeof num === "string") {
    num = parseFloat(num);
  }
  return parseFloat(num.toFixed(digits));
};
/**
 * @description 文本复制
 */

export const copyText = (e: any, phone: string) => {
  if (phone == "") {
    Toast("复制失败");
    return false;
  }
  e.stopPropagation();
  e.preventDefault();
  let input = document.createElement("input");
  input.value = phone;
  document.body.appendChild(input);
  input.select();
  document.execCommand("copy");
  document.body.removeChild(input);
  Toast("复制成功");
  return phone;
};

/**
 * @description 使元素父级滚动到可见该元素
 */
export const scrollIntoView = (
  selecotr: string,
  dir: "start" | "end" = "end"
) => {
  const element = document.querySelector(selecotr);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      inline: dir,
    });
  }
};

/**
 * @description 打开新链接
 */
export const openUrl = (url: string) => {
  // debugger
  location.href = url;
};

/**
 * @description 睡眠
 */
export const sleep = (time: number) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve(null);
    }, time);
  });
};

/**
 * @description 外部链接
 */
export const isExternalLinks = (url: string) => {
  const agreement = ["http:", "tel:", "https:"];

  return agreement.some((item) => url.includes(item));
};

type DesensitizationType = "name" | "idCard" | "phone";
/**
 * @description 脱敏
 */
export const desensitization = (data: string, type: DesensitizationType) => {
  const strategy: Record<DesensitizationType, () => string> = {
    name: () => {
      let name = "*" + data.slice(1);
      return name;
    },
    idCard: () => {
      let match = data.slice(1, -1).replace(/\d/g, "*");
      let idCard = data.slice(0, 1) + match + data.slice(-1);
      return idCard;
    },
    phone: () => {
      let match = data.slice(3, -4).replace(/\d/g, "*");
      let phone = data.slice(0, 3) + match + data.slice(-4);
      return phone;
    },
  };

  return strategy[type]();
};

/**
 * @description 图片预览
 */
export const onImagePreview = (images: any, index: number) => {
  ImagePreview({
    images: images,
    startPosition: index || 0,
  });
};
