
let userAgent = navigator?.userAgent

const WeChatReg = /MicroMessenger/i
const IOSReg = /\(i[^;]+;( U;)? CPU.+Mac OS X/
const AndroidReg = /Android|Adr/
const MobileReg = /Mobile/i
const MiniProgram = /miniProgram/i
// 农业银行
const ABC = /bankabc/i

// 支付宝小程序
const AlipayMiniProgram = [
    /Alipay/i,
    // /miniprogram/i,
]

// 浙里办APP
const ZLB = /dtdreamweb|ZWEurope/i

// 自定义环境
const CustomEnv = /walker/i

// 微信浏览器
export const isWeChat = WeChatReg.test(userAgent)

// 安卓
export const isAndroid = AndroidReg.test(userAgent)

// IOS
export const isIOS = IOSReg.test(userAgent)

// 移动端
export const isMobile = MobileReg.test(userAgent)

// 微信小程序web-view
export const isMiniProgram = MiniProgram.test(userAgent)

// 农行
export const isABC = ABC.test(userAgent)

// 支付宝小程序
export const isAlipayMiniProgram = AlipayMiniProgram.every(reg => reg.test(userAgent))

// 浙里办APP
export const isZLB = ZLB.test(userAgent)


// 浙里办微信小程序
// export const isZLBWeChatMiniProgram = true
export const isZLBWeChatMiniProgram = isWeChat && isMiniProgram && location.host.includes('zjzwfw.gov.cn')

// 海曙浙里办
export const isHaishuZLB = import.meta.env.VITE_ZLB_TYPE === 'haishu'

// 浙里办正式环境
export const isZLBProd = location.pathname?.indexOf?.('/reserved/') > -1;

// 自定义环境
export const isCustomEnv = CustomEnv.test(userAgent)

