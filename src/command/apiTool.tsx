import vueRouter from '../router'

// 跳转到登录
export const jumpLogin = function jumpLogin() {
  vueRouter.push({ path: '/login' })
}

// 获取尺寸
export const getSize = function getSize(size: number) {
  return size / 3.75 + 'vw'
}

// 判断是否是微信
export const isWechat = function () {
  let ua = navigator.userAgent.toLowerCase()
  let isWeixin = ua.indexOf('micromessenger') != -1
  // console.log(navigator.userAgent, '判断当前浏览器是什么内核', isWeixin)
  if (isWeixin) {
    return true
  } else {
    return false
  }
}

// // 获取地理位置
// export const getPosition = function() {
//     return new Promise((resolve, reject) => {
//         AMap.plugin("AMap.Geolocation", () => {
//             let geolocation = new AMap.Geolocation({
//                 enableHighAccuracy: false, // 是否使用高精度定位，默认:true
//                 timeout: 10000, // 超过10秒后停止定位，默认：无穷大
//                 maximumAge: 60000, // 定位结果缓存0毫秒，默认：0
//                 convert: true, // 自动偏移坐标，偏移后的坐标为高德坐标，默认：true
//                 showButton: true, // 显示定位按钮，默认：true
//                 buttonPosition: "LB", // 定位按钮停靠位置，默认：'LB'，左下角
//                 buttonOffset: new AMap.Pixel(10, 20), // 定位按钮与设置的停靠位置的偏移量，默认：Pixel(10, 20)
//                 showMarker: true, // 定位成功后在定位到的位置显示点标记，默认：true
//                 showCircle: true, // 定位成功后用圆圈表示定位精度范围，默认：true
//                 panToLocation: true, // 定位成功后将定位到的位置作为地图中心点，默认：true
//                 zoomToAccuracy: true, // 定位成功后调整地图视野范围使定位位置及精度范围视野内可见，默认：false
//             });
//             geolocation.getCurrentPosition();

//             AMap.Event.addListener(
//                 geolocation,
//                 "complete",
//                 (data: { position: { latitude: any; longitude: any } }) => {
//                     resolve(data.position);
//                 },
//             );
//             AMap.Event.addListener(geolocation, "error", (data: {}) => {
//                 // resolve({})
//                 reject(data);
//             });
//         });
//     });
// };

export default {
  jumpLogin,
  getSize,
  isWechat
  // getPosition,
}
