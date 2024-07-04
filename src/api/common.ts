import { getAction, postAction } from "@/command/netTool";
import { getUserInfo } from "@/state/user";

export interface DictionaryData {
  [key: string]: DictionaryItemData[];
}

/**
 * @description 字典项数据
 *
 * @export
 * @interface DictionaryItemData
 */
export interface DictionaryItemData {
  id: string;
  name: string;
  sort: number;
}

/**
 * @description 字典数据
 */
export const getDictionaryData = async (
  codes: string
): Promise<DictionaryItemData[]> => {
  if (import.meta.env.VITE_ZLB) {
    const res: DictionaryData = await getAction("/netPublic/admin/dict/codes", {
      codes,
    });
    return res[codes];
  }
  const res: DictionaryData = await getAction("/gxlkPublic/admin/dict/codes", {
    codes,
  });
  return res[codes];
};

/**
 * @description 增加用户访问量
 */
export const getIncreaseUserAccessAPI = async () => {
  const res = await getAction("/gxlkApi/user/common/addVisit", {});
  console.log("增加用户访问量", res);
  return res;
};

let publicProxyName = "gxlkPublic";
if (import.meta.env.VITE_ZLB) {
  publicProxyName = "netGxlkPublic";
}

/**
 * @description 获取地区级联数据
 */
export const getRegionalCascadeAPI = async (
  level: number = 0,
  id: number | string = ""
) => {
  let res: any;
  // if (import.meta.env.VITE_ZLB) {
  //   res = await getAction("/netGxlkPublic/currency/region/freeTree", {
  //     level,
  //     id,
  //   });
  // } else {
  res = await getAction("/api/common/areaTree", {
    level,
    id,
  });
  // }

  console.log("获取地区级联数据", res);
  return res;
};

/**
 * @description 字典
 * code: pet_type:宠物类型  pet_pre_order_item:预约项目
 */
export const getDictPetTypeList = async (code: string) => {
  return await getAction("/api/common/dictList", { code });
};

/**
 * @description 用户信息
 */
export const getUserInfoAPI = async () => {
  return await getAction("/api/a/api/h5/user/homePage/getUserInfo");
};

/**
 * @description 查询主体列表
 */
export const getSubjectListAPI = async () => {
  return await getAction(
    "/api/a/api/h5/admin/warning/warningSubject/subjectList"
  );
};

/**
 * @description 联系-获取主体联系方式
 */
export const getSubjectPhoneAPI = async (id: string) => {
  return await getAction(
    `/api/a/api/h5/admin/warning/warningSubject/getPhone/${id}`
  );
};

/**
 * @description 查询帮扶点列表数据
 */
export const getServicePointListAPI = async () => {
  return await getAction(
    `/api/a/api/h5/admin/warning/warningSubject/serviceHelpListData`
  );
};

/**
 * @description 查询收储服务列表数据
 */
export const getStorageListAPI = async () => {
  return await getAction(
    `/api/a/api/h5/admin/warning/warningSubject/storageListData`
  );
};