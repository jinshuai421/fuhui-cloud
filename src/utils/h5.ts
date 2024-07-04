import { getAction, postAction } from "@/command/netTool";

import * as qiniu from "qiniu-js";

export const postMessage = (type: string, data: any = {}) => {
  data.type = type;
  window.parent.postMessage(data, "*");
};

export const getMessage = (type: string, callback: (data: any) => void) => {
  window.addEventListener(
    "message",
    (e: any) => {
      if (e.data.type !== type) return;
      callback(e.data);
    },
    false
  );
};

export const uploadBase64API = (base64: string) => {
  return postAction("/gxlkApi/user/common/profile", {
    avatar: base64,
  })
    .then((res) => {
      console.log("上传成功", res);
      return res;
    })
    .catch((err) => {
      console.log("上传失败", err);

      return err;
    });
};

interface getQNYFileAPI {
  fileName: string;
  fileSize: string;
  uploadTime: string;
  urlid: string;
}

export const getQNYFileAPI = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);
  const res: getQNYFileAPI = await postAction("/api/a/api/oss/upload", formData);
  return res;
};

const genFileName = (file: File): string => {
  const suffix = file.type.split("/")[1];
  const name = `${Date.now()}_${Math.round(Math.random() * 1000)}.${suffix}`;
  return name;
};

export const uploadImgAPI = (file: File): Promise<string> => {
  return new Promise(async (resolve, reject) => {
    getQNYFileAPI(file)
      .then((res: any) => {
        resolve(res.fileUrl);
      })
      .catch((err) => {
        console.log(err);
        resolve("");
      });
  });
};

/**
 * @description 监听页面离开事件
 */
export const listenerUnload = (callback: () => void) => {
  window.addEventListener("beforeunload", callback);
};
