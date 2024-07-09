import moment from "moment";

export const isWechat = function () {
  let ua = navigator.userAgent.toLowerCase();
  let isWeixin = ua.indexOf("micromessenger") != -1;
  if (isWeixin) {
    return true;
  } else {
    return false;
  }
};

export const isWeapp = function () {
  return navigator.userAgent == "weapp";
};

/* 逆向地理编码 */
export const getAMapAddress = function (lnglat: any) {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.Geocoder", function () {
      var geocoder = new AMap.Geocoder();
      geocoder.getAddress(lnglat, function (addStatus: any, addResult: any) {
        if (addStatus === "complete" && addResult.info === "OK") {
          console.log("逆地理编码成功：", addResult);
          resolve({
            address: addResult.regeocode.formattedAddress,
          });
        } else {
          console.log("逆地理编码失败：" + addResult.info);
          resolve({
            address: lnglat[0] + "," + lnglat[1],
          });
        }
      });
    });
  });
};

// 获取地理位置
export const getPosition = function () {
  return new Promise((resolve, reject) => {
    AMap.plugin("AMap.Geolocation", () => {
      let geolocation = new AMap.Geolocation({
        enableHighAccuracy: true, // 是否使用高精度定位，默认:true
        timeout: 1000, // 超过10秒后停止定位，默认：无穷大
        maximumAge: 0, // 定位结果缓存0毫秒，默认：0
        convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
        showButton: true, // 显示定位按钮，默认：true
        buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
        buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
        showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
        showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
        panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
        zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
      });
      geolocation.getCurrentPosition((status: any, result: any) => {
        if (status == "complete") {
          console.log("高德定位成功：");
          // 定位成功
        } else {
          console.log("高德定位失败：" + result.message);
        }
      });
      // debugger;
      AMap.Event.addListener(geolocation, "complete", (data: any) => {
        getAMapAddress([data.position.lng, data.position.lat]).then(
          (addRes: any) => {
            let item = {
              ...data.position,
              longitude: data.position.lng,
              latitude: data.position.lat,
              ...addRes,
            };
            localStorage.setItem("latlng", JSON.stringify(item));
            resolve(item);
          }
        );
      });

      AMap.Event.addListener(geolocation, "error", (data: any) => {
        reject(data);
      });
    });
  });
};

/**
 * 获取历史的定位
 */
export const getLastPosition = function () {
  let latlng = localStorage.getItem("latlng");
  if (latlng) {
    return JSON.parse(latlng);
  } else {
    return JSON.parse(
      '{"lat":"29.811216","latitude":"29.811216","longitude":"121.552677","lng":"121.552677","address":"未知"}'
    );
  }
};

/**
 * 获取经纬度
 *
 * @returns
 */
export const getLocation = () => {
  return new Promise((resolve, reject) => {
    if (isWechat() || isWeapp()) {
      const getLatlng = () => {
        wx.getLocation({
          type: "gcj02", // 默认为wgs84的gps坐标，如果要返回直接给openLocation用的火星坐标，可传入'gcj02'
          altitude: false,
          // highAccuracyExpireTime: 4000,
          success: function (res: any) {
            if (res.latitude && res.longitude) {
              res.lat = res.latitude;
              res.lng = res.longitude;
            }

            getAMapAddress([res.lng, res.lat])
              .then((addRes: any) => {
                let item = {
                  ...res,
                  ...addRes,
                };
                console.log(item, "浙江省宁浙江省宁浙江省宁浙江省宁");
                localStorage.setItem("latlng", JSON.stringify(item));
                resolve(item);
              })
              .catch((err) => {
                resolve(getLastPosition());
              });
            return;
          },
          fail: function (res) {
            console.log("失败", res);
            resolve(getLastPosition());
          },
        });
      };
      if (isWechat()) {
        wx.ready(() => {
          getLatlng();
        });
      } else {
        getLatlng();
      }
    } else {
      getPosition();
      resolve(getLastPosition());
      return;
    }
  });
};

export const getParams = function getParams(params = {}, url = "") {
  let newParams = { ...params } as any;
  let text = "";
  Object.keys(JSON.parse(JSON.stringify(newParams))).forEach((e) => {
    if (newParams[e] !== undefined && newParams[e] !== "null") {
      text += e + "=" + newParams[e] + "&";
    }
  });
  if (text) {
    if (url.indexOf("?") === -1) {
      text = "?" + text;
    } else {
      text = "&" + text;
    }
  }
  return text;
};

// 获取差异的时间
export const getDiffTimeStr = function (time: any) {
  const year = moment().diff(moment(time), "year");
  const month = moment().diff(moment(time), "month") + 1;
  const min = moment().diff(moment(time), "minute");
  const week = moment().diff(moment(time), "weeks");
  const days = moment().diff(moment(time), "days");
  const hour = moment().diff(moment(time), "hour");
  if (year > 0) {
    return "一年前";
  } else if (month > 6) {
    return "半年前";
  } else if (month > 1 && month < 6) {
    return "一个月前";
  } else if (week > 0) {
    return "一周前";
  } else if (hour == 0) {
    return "刚刚";
  } else if (hour < 2) {
    return "2小时前";
  } else if (hour > 2 && hour < 3) {
    return "3小时前";
  } else if (hour < 24) {
    return "今天";
  } else if (days > 1 && days < 3) {
    return `${days}天前`;
  } else if (days < 7) {
    return "一周内";
  }
};

// 手机号脱敏
export const getPhoneNumbe = function (phone: any) {
  if (phone) {
    return phone.slice(0, 3) + "****" + phone.slice(7);
  }
};

export function getAmountChinese(val: any) {
  let regexp = /[a-zA-Z]/;
  if (!val && val !== 0) return "";
  if (Number(val) === 0) return "零元";
  if (regexp.test(val)) return "数字较大溢出";
  const value = val;
  if (val < 0) {
    val = Number(val.toString().split("-")[1]);
  }
  const amount = +val;
  if (Number.isNaN(amount)) return "";
  const NUMBER = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const N_UNIT1 = ["", "拾", "佰", "仟"];
  const N_UNIT2 = ["", "万", "亿", "兆"];
  const D_UNIT = ["角", "分", "厘", "毫"];
  let [integer, decimal] = amount.toString().split(".");
  if (integer && integer.length > 15) return "数字较大溢出";
  let res = "";
  // 整数部分
  if (integer) {
    let zeroCount = 0;
    for (let i = 0, len = integer.length; i < len; i++) {
      const num = integer.charAt(i);
      const pos = len - i - 1; // 排除个位后 所处的索引位置
      const q = pos / 4;
      const m = pos % 4;
      if (num === "0") {
        zeroCount++;
      } else {
        if (zeroCount > 0 && m !== 3) res += NUMBER[0];
        zeroCount = 0;
        res += NUMBER[parseInt(num)] + N_UNIT1[m];
      }
      if (m == 0 && zeroCount < 4) res += N_UNIT2[Math.floor(q)];
    }
  }
  if (Number(integer) != 0) res += "元";
  // 小数部分
  if (parseInt(decimal)) {
    for (let i = 0; i < 4; i++) {
      const num: any = decimal.charAt(i);
      if (parseInt(num)) res += NUMBER[num] + D_UNIT[i];
    }
  } else {
    res += "";
  }
  if (value < 0) res = "负数" + res;
  return res;
}
