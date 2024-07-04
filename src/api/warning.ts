import { postAction, getAction } from "@/command/netTool";

/**
 * @description 预警分页数据
 */
export const getWarningInfoPageAPI = (data: any) => {
  return getAction("/api/a/api/h5/user/homePage/warningInfoPage", data);
};

/**
 * @description 获取预警
 */
export const getAlarmInfoDetailAPI = (id: string) => {
  return getAction(`/api/a/api/h5/user/homePage/getWarnDetail/${id}`);
};
