import genFetch from "./genFetch";

export const getParams = function getParams(params = {}) {
  let newParams = { ...params };
  let text = "";
  let texts = [];
  Object.keys(JSON.parse(JSON.stringify(newParams))).forEach((e) => {
    if (newParams[e] !== undefined && newParams[e] !== "null") {
      texts.push(e + "=" + newParams[e]);
    }
  });

  if (texts.length) {
    text = "?" + texts.join("&");
  }

  return text;
};

export const bodyParams = function (params = {}) {
  if (Array.isArray(params)) {
    return JSON.stringify(params);
  }
  return JSON.stringify({
    ...params,
  });
};

export const postAction = function (url, params = {}, config) {

  const type = Object.prototype.toString.call(params);

  return genFetch(
    url,
    {
      method: "POST",
      body: type == "[object FormData]" ? params : bodyParams(params),
    },
    config
  );
};

export const putAction = function (url, params = {}, config = {}) {
  const type = Object.prototype.toString.call(params);

  return genFetch(
    url,
    {
      method: "PUT",
      body: type == "[object FormData]" ? params : bodyParams(params),
    },
    config
  );
};

export const getAction = function (url, params = {}, config = {}) {
  // const roleCode = localStorage.getItem("roleCode");
  const subjectObj = JSON.parse(sessionStorage.getItem("subjectObj") || "{}");
  return genFetch(
    url +
      getParams({
        __ajax: "json",
        // roleCode: subjectObj.roleCode || roleCode,
        subjectId: subjectObj.id,
        ...params,
      }),
    {
      method: "GET",
    },
    {
      ...config,
      headers: {
        "Content-Type": "*",
      },
    }
  );
};

export const deleteAction = function (url, params = {}) {
  const type = Object.prototype.toString.call(params);
  return genFetch(url, {
    method: "DELETE",
    body: type == "[object FormData]" ? params : bodyParams(params),
  });
};

export const loginAction = function (url, config) {
  return genFetch(
    url,
    {
      method: "POST",
      headers: {
        Authorization:
          "Basic c3p4Y19hcHA6OThkMzVjODEtOGYwZS00MjM4LWJjODYtYjkwMjYwMmVlZTAz",
      },
    },
    config
  );
};

export const tokenAction = function (url) {
  return fetch(`api/${url}`, {
    headers: new Headers({
      Authorization:
        "Basic c3p4Y19hcHA6OThkMzVjODEtOGYwZS00MjM4LWJjODYtYjkwMjYwMmVlZTAz",
    }),
  }).then((e) => {
    // eslint-disable-next-line no-async-promise-executor
    return new Promise(async (resolve) => {
      resolve({
        ...(await e.json()),
        status: e.status,
      });
    });
  });
};

export default {
  postAction,
  getAction,
  putAction,
  deleteAction,
  loginAction,
  getParams,
  tokenAction,
};
