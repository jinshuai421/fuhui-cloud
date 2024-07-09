import { postAction, getAction } from "@/command/netTool";

/**
 * @description 用户信息查询
 */
export const getConfigApi = (code: any) => {
  return getAction(`/api/temple/config/${code}`, {}, { type: code });
};

/**
 * @description 二级分类详情
 */
export const getSecondApi = (code: any) => {
  return getAction(`/api/temple/second/${code}`, {}, { type: code });
};
/**
 * @description 供奉类型的价格清单
 */
export const getPriceApi = (code: any) => {
  return getAction(`/api/temple/price/${code}`);
};

/**
 * @description 供奉类型的座位排布(只包含: 正常,禁用; 不包含已明灯数据)
 */
export const getTypeApi = (code: any) => {
  return getAction(`/api/temple/type/${code}`);
};

/**
 * @description 创建订单
 */
export const setCreateOrderApi = (data: any) => {
  return postAction(`/api/temple/createOrder`, data);
};

/**
 * @description 订单详情
 */
export const getOrderInfoApi = (orderId: any) => {
  return postAction(`/api/temple/orderInfo/${orderId}`);
};

/**
 * @description 订单支付
 */
export const setPayOrderApi = (data: any) => {
  return postAction(`/api/temple/payOrder`, data);
};
