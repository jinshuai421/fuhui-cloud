import { isWeChat, isZLBWeChatMiniProgram } from "@/utils/env";
import { encodeUrl } from "@/utils/util";
import { getAction } from "@/command/netTool";

/**
 * @description 最新授权url
 */
let authUrl = "";

let requestPromise: any = null;
/**
 * @description 正式公众号
 */
let appID = "wx099ca54cf202de56";

let wxProxyName = "api";
// if (import.meta.env.VITE_ZLB) {
//     wxProxyName = 'netGxlkWx'
// }

export const wxAuth = () => {
  if (isZLBWeChatMiniProgram) {
    return new Promise((resolve) => {
      wx.ready(() => {
        resolve(null);
      });
    });
  }
  // if (!isWeChat) return Promise.resolve();
  const currentUrl = `${window?.location.href.split("#")[0]}`;

  if (authUrl === currentUrl) return requestPromise;
  authUrl = currentUrl;

  if (import.meta.env.DEV) {
    /**
     * @description 测试公众号
     */
    appID = "wx9b7318f08af08c03";
    //  appID = "wx7daa918acb801b01";
  }

  requestPromise = Promise.resolve().then(() => {
    // return getAction(`/api/a/wechat/oauth/getSign`, {
    //   url: currentUrl,
    //   // appId: appID
    // }).then((e) => {
    //   // eslint-disable-next-line no-undef
    //   wx.config({
    //     ...e,
    //     debug: false,
    //     jsApiList: [
    //       "startRecord",
    //       "stopRecord",
    //       "uploadVoice",
    //       "openLocation",
    //       "getLocation",
    //       "updateAppMessageShareData",
    //       "updateTimelineShareData",
    //       "scanQRCode",
    //       "chooseImage",
    //       "uploadImage",
    //     ],
    //     openTagList: ["wx-open-launch-weapp"],
    //   });

    //   return new Promise<void>((resolve, reject) => {
    //     wx.ready(() => {
    //       resolve();
    //     });
    //   });
    // });
  });

  return requestPromise;
};

export interface ChooseImageOptions {
  /**
   * @description 选择图片的数量
   */
  count?: number;
  sizeType?: Array<"original" | "compressed">;
  /**
   * @description 图片选择成功后回调
   */
  choose?: (res: string[]) => void;
}

export interface ChooseImageResult {
  localIds: Array<string>;
}

export const chooseImage = (
  options: ChooseImageOptions = {}
): Promise<ChooseImageResult["localIds"]> => {
  return new Promise((resolve, reject) => {
    wxAuth().then(() =>
      wx.chooseImage({
        count: options.count || 1,
        sizeType: options.sizeType || ["original", "compressed"],
        success(res: ChooseImageResult) {
          const localIds = res.localIds;

          options.choose?.(localIds);
          console.log("选择图片", localIds);

          resolve(localIds);
          return;
        },
        fail(err: any) {
          alert(err.errMsg);
        },
      })
    );
  });
};

export const getServerId = (
  localIds: string | Array<string>,
  serverIds: Array<string> = []
): Promise<Array<string>> => {
  if (!Array.isArray(localIds)) {
    localIds = [localIds];
  }
  console.log("获取serverId", localIds);
  const localId = localIds.pop();

  return new Promise((resolve, reject) => {
    wx.uploadImage({
      localId: localId,
      isShowProgressTips: 1,
      success(res: any) {
        console.log("uploadImage success, serverId is: ", res);
        serverIds.push(res.serverId);
        if (localIds.length > 0) {
          resolve(getServerId(localIds, serverIds));
          return;
        } else {
          uploadImgAPI(serverIds)
            .then((res) => {
              const imgUrl = res.map((e) => e.key);
              resolve(imgUrl);
            })
            .catch((e) => {
              resolve([]);
            });
          return;
        }
      },
    });
  });
};

/**
 * @description 上传图片
 */
export const uploadImg = (
  options: ChooseImageOptions = {}
): Promise<string[]> => {
  return new Promise((resolve, reject) => {
    chooseImage(options).then(async (localIds) => {
      //   getServerId(localIds).then((serverIds) => {
      //     console.log("serverIds", serverIds);
      //     resolve(serverIds);
      //   });
        console.log(localIds,"localIds")
      let localData = localIds;
      await localIds.forEach((filePath) => {
        // wx.uploadImage({
        //   localId: filePath,
        //   isShowProgressTips: 0, 
        //   success: function (res: any) {
        //     console.log(res,123123);

        //     // 自定义处理返回结果
        //   },
        // });

        resolve(localIds);
      });
    });
  });
};

interface UploadImgAPIDataItem {
  /**
   * @description 上传后的图片链接
   */
  key: string;
}

/**
 * @description 图片上传
 */
export const uploadImgAPI = async (
  serverId: Array<string>
): Promise<Array<UploadImgAPIDataItem>> => {
  const res: Array<UploadImgAPIDataItem> = await getAction(
    "/gxlkWx/downImgNewNew",
    { serverId, appId: appID }
  );
  console.log("uploadImgAPI", res);
  return res;
};
