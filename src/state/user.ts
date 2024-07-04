/**
 * user相关
 */
// import { UserInfoData, UserType } from '@/api/index'
import { reportLogin } from "@/utils/aegis";

// let userInfo: UserInfoData
let userInfo = {};

let isLogin = false;

/**
 * @description 用户状态
 */
export const user = {
  getLoginStatus() {
    return isLogin;
  },
  setLoginStatus(status: boolean) {
    isLogin = status;
  },
  /**
   * @description 用户TIM的聊天id
   */
  setUserTIMID(userTIMID: string) {
    localStorage.setItem("userTIMID", userTIMID);
  },
  getUserTIMID() {
    return localStorage.getItem("userTIMID") || "";
  },
  /**
   * @description 店铺经纬度
   */
  setShoplat(shoplat: string) {
    localStorage.setItem("shoplat", shoplat);
  },
  getShopLat() {
    return localStorage.getItem("shoplat") || "";
  },
  setShoplng(shoplng: string) {
    localStorage.setItem("shoplng", shoplng);
  },
  getShoplng() {
    return localStorage.getItem("shoplng") || "";
  },
  /**
   * @description 用户的系统id
   */
  setUserID(userID: string) {
    localStorage.setItem("userID", userID);
  },
  getUserID() {
    return localStorage.getItem("userID") || "";
  },
  getUserInfo() {
    return JSON.parse(localStorage.getItem("userInfo") || "null") || "";
  },
  // UserInfoData
  setUserInfo(data: any) {
    localStorage.setItem("userInfo", JSON.stringify(data));
    reportLogin();

    const { contextTag } = data;
    this.setUserTIMID(contextTag);
    userInfo = data;
  },
  setToken(token: string | null) {
    if (token && !["undefined"].includes(token)) {
      document.cookie = `TheEndToken=${token};path=/;`;
      setToken(token);
    }
    user.verifyCookie();
  },

  verifyCookie() {
    if (!/TheEndToken=(?:.*);?/.test(document.cookie)) {
      user.setLoginStatus(false);
      return false;
    } else {
      user.setLoginStatus(true);
      return true;
    }
  },
};

//新增的登录
/**
 * @description 用户登录状态
 */
export function getLoginStatus() {
  return isLogin;
}

/**
 * @description token设置
 */
export function setToken(token: string) {
  localStorage.setItem("token", token);
}

export function getToken() {
  const token = localStorage.getItem("token") || "";
  return token;
}

interface UserInfo {
  id: string;
  officeName: string;
  name: string;
  phone: string;
  contextTag: string;
  faceUrl: string;
  loginTag: string;
  otherUserId: string;
  userType: string;
  wxOpenId: string;
}

export function setUserInfo(userInfo: UserInfo) {
  localStorage.setItem("userInfo", JSON.stringify(userInfo));
  reportLogin();

  const { contextTag } = userInfo;
  user.setUserTIMID(contextTag);
}

export function getUserInfo(): UserInfo {
  const userInfo = localStorage.getItem("userInfo") || "null";
  return JSON.parse(userInfo);
}

export function setUserPhone(phone: string) {
  localStorage.setItem("userPhone", phone);
}

export function getUserPhone() {
  const phone = localStorage.getItem("userPhone") || "";
  return phone;
}

export function setZLBUserInfo(userInfo: any) {
  localStorage.setItem("ZLBuserInfo", JSON.stringify(userInfo));
}

export function getZLBUserInfo(): any {
  const userInfo = localStorage.getItem("ZLBuserInfo") || "null";
  return JSON.parse(userInfo);
}

export const setZLBTheme = (theme: string) => {
  localStorage.setItem("ZLBTheme", theme);
};

export const getZLBTheme = () => {
  return localStorage.getItem("ZLBTheme") || "";
};

export function getAppAuth() {
  const appAuth = localStorage.getItem("appAuth") || "";
  return appAuth;
}

export function setAppAuth(appAuth: string) {
  // appAuth = 'wxlk,wxjy,wxfw,wxyj,wxjc'
  localStorage.setItem("appAuth", appAuth);
}
