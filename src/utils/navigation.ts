import VueRouter from "@/router";
import { getToken, user } from "@/state/user";
import { getParamUrl } from "@/utils/util";
import { getUserLoginParams } from "./business";
import { isAlipayMiniProgram, isZLB, isZLBWeChatMiniProgram } from "./env";

import { getLogining, setLogining } from "./zlb";
import { openLink } from "./zlbjssdk";
// import { reportMall } from "./aegis";
import { getQeuryUrl } from "@/command/externalLinks";
import { IMAppID } from "@/config/IM";
import { Toast } from "vant";
import { AK, ZLBUrl } from "@/config/zlb";

/**
 * @description 跳转到详情页
 */
export const toColdDetail = async (id: string) => {
  // debugger
  let isDetailPage = false;
  if (location.hash.includes("/coldDetails?")) {
    isDetailPage = true;
  }

  await VueRouter.push(`/coldDetails?id=${id}`);

  if (isDetailPage) {
    setTimeout(() => {
      location.reload();
    }, 500);
  }
};

enum TemplateType {
  /**
   * @description 空模板
   */
  Empty = "",
  /**
   * @description 默认模板
   */
  default = "287a53aa61aed3d900d4a9091f69dce0",
}

interface ToChatDetailOptions {
  targetPhone?: string;
  targetColdId?: string;
  title?: string;
}
/**
 * @description 跳转到聊天详情
 */
export const toChatDetail = async function (
  targetId: string,
  options: ToChatDetailOptions = {}
) {
  if (import.meta.env.VITE_ZLB) {
    return;
  }
  const userId = user.getUserTIMID();
  const { targetPhone = "", targetColdId = "", title = "聊天" } = options;
  let templateId: TemplateType = TemplateType.default;
  if (!(targetColdId || targetPhone)) {
    templateId = TemplateType.Empty;
  }
  const params = {
    userId,
    to: targetId,
    tel: targetPhone,
    id: targetColdId,
    template: templateId,
    title: title,
    appid: IMAppID,
  };

  const url = getParamUrl(params);

  // if (import.meta.env.DEV) {
  //         window.location.href =
  //                 `http://192.167.5.72:3000/#/?userId=${userId}&to=${targetId}&template=287a53aa61aed3d900d4a9091f69dce0&title=会话&targetPhone=${targetPhone}&targetColdId=${targetColdId}`;
  // } else {
  //         window.location.href =
  //                 `http://im.ztesa.com.cn/#//?userId=${userId}&to=${targetId}&template=287a53aa61aed3d900d4a9091f69dce0&title=会话&targetPhone=${targetPhone}&targetColdId=${targetColdId}`;
  // }
  window.location.href = `https://im.ztesa.com.cn/#/?${url}`;
  // if (import.meta.env.PROD) {

  // } else {
  //         window.location.href =
  //                 `https://im.nongqibang.com/#/?${url}`;
  // }
};

/**
 * @description 跳转到登录页
 */
export const toLogin = function () {
  // if (isZLB || isAlipayMiniProgram || isZLBWeChatMiniProgram) {
  //   toZLBLogin();
  // } else {
    VueRouter.push(`/login`);
  // }
};

/**
 * @description 跳转到浙里办登录页
 */
export const toZLBLogin = () => {
  if (getLogining()) return;

  if (isZLBWeChatMiniProgram) {

    const { origin, pathname, search } = window.location;
    const projectUrl = origin + pathname;
    const params = new URLSearchParams(search);
    const ticketId = params.get("ticketId");

    setLogining(true);
    VueRouter.replace(`/loginSuccess?ticket=${ticketId}&timestamp=${Date.now()}`);
    return
  }
  if(isZLB || isAlipayMiniProgram){
    const goto = encodeURIComponent(`${ZLBUrl}?/#/loginSuccess?timestamp=${Date.now()}`)
    setLogining(true);
    if(isAlipayMiniProgram){
      openLink(`https://puser.zjzwfw.gov.cn/sso/alipay.do?action=ssoLogin&servicecode=${AK}&goto=${goto}&redirectUrl=${goto}`)
    } else {
      openLink(`https://puser.zjzwfw.gov.cn/sso/mobile.do?action=oauth&scope=1&servicecode=${AK}&goto=${goto}&redirectUrl=${goto}`);
    }
  }
};

/**
 * @description 跳转到首页
 */
export const toHome = function (replace: boolean = false) {
  if (replace) {
    VueRouter.replace(`/`);
  } else {
    VueRouter.push("/");
  }
};


// /**
//  * @description 跳转到
//  */
//  export const to= () => {
//         VueRouter.push('/')
// }

/**
 * @description 跳转到支付中心
 */
export const toPayCenter = (orderId: string) => {
  let payUrl = "https://paycenter.ztesa.com.cn";
  if (import.meta.env.DEV) {
    payUrl = "http://paypaypay.center.ztesa.work";
  }
  payUrl += `/js/ztesa/payCenter/h5PayPage?id=${orderId}`;

  location.href = payUrl;
};

export const toSearch = () => {
  VueRouter.push("/search");
};


/**
 * @description 跳转到农创客
 */
export const toAgriculturalMaker = () => {
  const params = getUserLoginParams() as any;
  if (!params) return;
  const domain = "https://nck.ztesa.com.cn";
  // const domain = 'https://cxnync.zgwlxc.cn/scgx/h5'
  location.href = `${domain}/?${getParamUrl(params)}`;
};

/**
 * @description 跳转到食用合格证查询
 */
export const toFoodCertificateInquiry = () => {
  location.href = "http://ztesa.com.cn:7004/#/search";
};

/**
 * @description 跳转到vr页
 */
export const toVR = (id: string, link?: string) => {
  link = link?.split("?")[0];
  const vrId = link?.split("/").pop();
  const url = `https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/2001972512/vr.1.0.7/web/index.html?id=${vrId}&token=${getToken()}`;
  if (isZLB||isAlipayMiniProgram||isZLBWeChatMiniProgram) {
    openLink(url);
  } else {
    VueRouter.push(`/VRshow?id=${id}`)
    // location.href = url;
  }
};

export const openPage = (url: string) => {
  VueRouter.push(url);
};

/**
 * @description 保险
 */
export const toInsurance = () => {
  const params = getUserLoginParams() as any;
  /* Toast("开发中。。。");*/
  // let backUrl = encodeURI(location.href);
  // let url = "";
  // if (import.meta.env.DEV) {
  //   url = "http://bxh5.nqb.ztesa.xyz/#/pages/zlbIndex/index?systemmark=gxlk&platform=sheng&phone=";
  //   // url = "http://192.167.5.42:1000/#/pages/zlbIndex/index?systemmark=gxlk&platform=sheng&phone="
  // } else {
  //   url = "http://insurh5.ztesa.com.cn/#/pages/zlbIndex/index?systemmark=gxlk&platform=sheng&phone=";

  // }
  // url += params.phone + "&token=" + getToken() + "&redirectUrl=" + backUrl;
  // location.href = url;
};

