import { postAction, getAction, putAction } from "@/command/netTool";

/**
 * @description 撤销数据
 */
export const setCancelDataAPI = (id: string) => {
  return putAction(`/api/a/api/h5/user/storageBook/cancel/${id}`);
};

/**
 * @description 确认未受灾
 */
export const setNormalAPI = (id: string) => {
  return postAction(`/api/a/api/h5/admin/warning/warningSubject/normal/${id}`);
};

/**
 * @description 确认未受灾
 */
export const setVerifyAPI = (data: any) => {
  return postAction(
    `/api/a/api/h5/admin/warning/warningSubject/confirmApply`,
    data
  );
};


/**
 * @description 驳回申请
 */
export const setRejectApplyAPI = (data: any) => {
  return postAction(
    `/api/a/api/h5/admin/warning/warningSubject/rejectApply`,
    data
  );
};

/**
 * @description 已解决申请
 */
export const setResolveApplyAPI = (data: any) => {
  return postAction(
    `/api/a/api/h5/admin/warning/warningSubject/resolveApply`,
    data
  );
};

/**
 * @description 记录处理情况
 */
export const setSaveRecordAPI = (data: any) => {
  return postAction(
    `/api/a/api/h5/admin/warning/warningSubject/saveRecord`,
    data
  );
};