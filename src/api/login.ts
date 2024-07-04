import { postAction, getAction } from "@/command/netTool";

/**
 * @description 微信跳转登录<直接重定向>
 */
export const getDoLoginWxApi = (data: any) => {
  return getAction('/api/temple/auth/doLoginWx2', data)
}

/**
 * @description 登录接口
 */
export const getLoginWxApi = (data: any) => {
  return getAction('/api/temple/auth/callback', data)
}