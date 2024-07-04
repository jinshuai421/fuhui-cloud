import { getUserInfo } from "@/state/user";
import { number } from "echarts";
import VueRouter from "@/router";
import { Toast } from "vant";
import { isHaishuZLB, isZLB, isZLBWeChatMiniProgram } from "./env";

/**
 * @description 初始化标题
 */
export const initTitle = () => {
  document.title = getTitleText();
};

export const getTitleText = () => {
  return "福慧云";
};

export const getCopyrightText = () => {
  if (isHaishuZLB) {
    return "宁波市海曙区农业农村局提供";
  } else {
    return "宁波慈溪市农业农村局提供";
  }
};

/**
 * @description 获取用户跳转到其他系统的登录参数
 */
export const getUserLoginParams = () => {
  const userInfo = getUserInfo() as any;
  if (!userInfo) return null;
  const { faceUrl, loginTag, name, otherUserId, phone } = userInfo;

  return {
    faceUrl,
    loginTag,
    name,
    otherUserId,
    phone,
  };
};

export const getColdAllowanceTypeText = (type: any) => {
  const strategy = {
    1: "绿码",
    2: "黄码",
    3: "红码",
  } as any;

  return strategy[type];
};
/*将日期转化为周几 */
export const changeweekday = (dt: string) => {
  var dt1 = new Date(dt);
  var weekDay = ["周日", "周一", "周二", "周三", "周四", "周五", "周六"];
  console.log("今天是:", weekDay[dt1.getDay()]);
  return weekDay[dt1.getDay()];
};
/*格式化时间 */
export const spliceTime = (time: string) => {
  if (time !== "") {
    const newTime = time.slice(0, 11);
    return newTime;
  } else {
    return;
  }
};
/* 转换为数字并保留小数 */
export const lkDistance = (diatance: any) => {
  return (diatance / 1000).toFixed(2);
};

export const promptToBeDeveloped = () => {
  VueRouter.push("/projectDeclaration");
};

/**
 * @description 格式化浙里办用户信息
 */
export const formatZLBUserInfo = (data: any) => {
  const { personInfo = {} } = data;

  const { attributes = {} } = personInfo;

  let userInfo = {
    ...data,
    ...attributes,
    ...personInfo,
  };
  if (!userInfo.username) {
    userInfo.username = userInfo.userName;
  }

  if (!userInfo.mobile) {
    userInfo.mobile = userInfo.phone;
  }

  if (!userInfo.idnum) {
    userInfo.idnum = userInfo.idNo;
  }

  if (!userInfo.userid) {
    userInfo.userid = userInfo.userId;
  }

  return userInfo;
};
