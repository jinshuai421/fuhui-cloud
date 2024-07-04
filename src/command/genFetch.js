// import storeTool from "./storeTool";
// import apiTool from "./apiTool";
// import { message } from 'ant-design-vue';
import { Toast } from "vant";
// import {Encrypt} from '@/utils/security'
import { toLogin } from "@/utils/navigation";
import { isHaishuZLB, isZLBWeChatMiniProgram } from "@/utils/env";

import { getToken } from "@/state/user";
import { getDoLoginWxApi } from "@/api/login";

/**
 * @description 代理映射
 */
const proxyMap = {
  thing: {
    // url:'http://124.71.197.132:8780/',
    url: "https://service-85pu4tzb-1257443019.sh.apigw.tencentcs.com/thing/",
    headers: {
      appId: "dd52471bd8d2406a",
      timestamp: Date.now(),
      sign: "c124e139283705c55a22159b34b4eded",
    },
  },
  netGxlkApi: {
    url: "https://service-85pu4tzb-1257443019.sh.apigw.tencentcs.com/netGxlkApi/",
  },
  netGxlkBpi: {
    url: "https://service-85pu4tzb-1257443019.sh.apigw.tencentcs.com/netGxlkBpi/",
  },
  netPublic: {
    url: "https://service-85pu4tzb-1257443019.sh.apigw.tencentcs.com/netPublic/",
  },
  netGxlkPublic: {
    url: "https://service-85pu4tzb-1257443019.sh.apigw.tencentcs.com/netGxlkPublic/",
  },
  netGxlkTrace: {
    url: "https://service-85pu4tzb-1257443019.sh.apigw.tencentcs.com/netGxlkTrace/",
  },
  netGxlkWx: {
    url: "https://service-85pu4tzb-1257443019.sh.apigw.tencentcs.com/netGxlkWx/",
  },
  netPay: {
    url: "https://service-85pu4tzb-1257443019.sh.apigw.tencentcs.com/netPay/",
  },
};

// 加密白名单  可以不加密的url
const whitelist = [
  "/user/common/upload",
  "/auth/social/token/wx",
  "/payCenter/h5ToPay",
  ...Object.keys(proxyMap).map((item) => `/${item}/`),
];

/**
 * @description 获取请求参数
 */
function getProxyRequestParams(url) {
  const proxyArr = Object.keys(proxyMap);
  const proxyName = proxyArr.find((item) => url.includes(`/${item}/`));
  if (!proxyName) return false;

  const proxy = proxyMap[proxyName];

  url = url.replace(`/${proxyName}/`, proxy.url);
  return {
    url,
    headers: proxy.headers || {},
  };
}

/**
 * @description 是否需要加密
 */
function isEncrypt(url) {
  // for (let item of whitelist) {
  //   if (url.indexOf(item) > -1) {
  //     return false
  //   }
  // }

  // return true
  return false;
}

export default function (url, params, config = {}) {
  // const auth = storeTool.auth.get()
  const type = Object.prototype.toString.call(params.body);
  const { isRedirect = true, isShowWarring = true } = config;

  return new Promise((resolve, reject) => {
    const headers = {
      "Content-Type": "application/json",
      __ajax: "json",
      TheEndToken: getToken(),
      Authorization: `bearer ${getToken() || ""} `,
      // Authorization: `${auth.tokenType || ''} ${auth.token || ''}`,
      "X-Application-name": "app",
      ...(config.headers || {}),
    };

    if (params.body && isEncrypt(url)) {
      let data = params.body;
      // console.log(JSON.parse(data), "--------")

      if (type == "[object FormData]") {
        const body = {};
        for (let item of params.body) {
          body[item[0]] = item[1];
        }
        data = body;

        data = Encrypt(JSON.stringify(data));
      } else {
        data = Encrypt(data);
      }

      params.body = JSON.stringify({ data });
    }

    if (type == "[object FormData]") {
      delete headers["Content-Type"];
    }

    const proxyParams = getProxyRequestParams(url);

    if (proxyParams) {
      url = proxyParams.url;
      params.headers = { ...params.headers, ...proxyParams.headers };
    }

    // if (isZLBWeChatMiniProgram || import.meta.env.VITE_ZLB) {
    //   let corsAPI = "";
    //   if (isHaishuZLB) {
    //     corsAPI =
    //       "https://service-8su0ka8z-1257443019.sh.apigw.tencentcs.com/haishu";
    //   } else {
    //     corsAPI =
    //       "https://service-8su0ka8z-1257443019.sh.apigw.tencentcs.com/sheng";
    //   }

    //   if (!/^http/.test(url)) {
    //     // url='http://zlb-gxlk.ztesa.work'+url
    //     url = corsAPI + url;
    //   }
    // }

    fetch(url, {
      ...params,
      headers: {
        ...headers,
        ...params.headers,
      },
    })
      .then((e) => {
        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve) => {
          if (e.status == 403) {
            resolve({ status: e.status });
          } else {
            resolve({
              ...(await e.json()),
              status: e.status,
            });
          }
        });
      })
      .then((e) => {
        // 如果401直接重定向
        if (e.code == 401 || e.code == 302 || e.message === "请登录后访问!") {
          const params = new URLSearchParams(location.hash.split("#/")[1]);
          const state = params.get("type") || "";
          getDoLoginWxApi({ state }).then((res) => {
            localStorage.setItem("reorderUrl", location.href);
            location.href = res;
          });
        }
        if (e.code == 400) {
          Toast.fail(e.msg);
          reject(e);
        } else if (e.result && e.result.code == "200") {
          resolve(e.result.data || e.result);
        } else if (e.page) {
          resolve(e.page.list || e.page);
        } else if (e.code == "200" || e.result === "true") {
          resolve(e.data || e);
          /*
          if (typeof e.data === 'string') {
            resolve(Encrypt(e.data));
          } else {
            resolve(e.data);
          }
          */
        } else if (e.code == 500 && e.msg == "参数验证失败!") {
          if (e.data) {
            const keys = Object.keys(e.data);
            Toast.fail(e.data[keys[0]]);
          } else {
            Toast.fail("接口出错");
          }
        } else if (e.fileUrl && e.fileUrl != "") {
          resolve(e);
        } else {
          reject(e);
        }
      })
      .catch((e) => {
        // 接口未登录直接重定向了
        toLogin();
        reject(e);
      });
  });
}
