import { getPageEnterTime } from "@/state";
import { getUserInfo } from "@/state/user";

let aegis: any

// const init = () => {
//     const userInfo = getUserInfo()
//     let key: string
//     if (import.meta.env.DEV) {
//         key = 'W7b6YIadvbnn16yy0P'
//     } else {
//         key = 'KJPbGHqDDGJVlxqLL9'
//     }
//     const initParams: {
//         [key: string]: any
//     } = {
//         id: key, // 应用ID，即上报ID
//         reportApiSpeed: true, // 接口测速
//         reportAssetSpeed: true, // 静态资源测速
//         spa: true // spa 应用页面跳转的时候开启 pv 计算
//     }

//     if (userInfo?.id) {
//         initParams['uin'] = userInfo.id
//     }
//     aegis = new Aegis(initParams);
// }



/**
 * @description 获取页面停留时间
 */
export const getPageStayTime = () => {
    const pageEnterTime = getPageEnterTime()
    if (!pageEnterTime) return 0;
    return Date.now() - pageEnterTime;
}


type ReportLogUserype = '打电话' | '​导航' | '分享' | '​筛选' | '​页面跳转' | '​亲农在线' |
    '预约' | '登录' | '跳出' | '打开应用' | '打开商城'
type ReportEventOwnerType = '​我要开店'

type ReportEventType = ReportLogUserype | ReportEventOwnerType


export const reportLogin = () => {
    const userInfo = getUserInfo()

    aegis.setConfig({
        uin: userInfo.id
    })

    reportLog('登录', { data: userInfo })
}


export const reportCall = (phone: string) => {
    reportLog('打电话', {
        data: { phone, }
    })
}

export const reportNav = (data: any) => {
    reportLog('​导航', {
        data
    })
}


export const reportMall = (url: string) => {
    reportLog('打开商城', {
        data: {
            url
        }
    })
}



export const reportPageJump = (from: string, to: string) => {
    const stayTime = getPageStayTime()

    if (!stayTime) {
        reportLog('打开应用', {
            data: {
                from,
                to,
                stayTime,
            }
        })
        return;
    }

    reportLog('​页面跳转', {
        data: {
            from,
            to,
            stayTime,

        }

    })
}

export const reportQinnong = () => {
    reportLog('​亲农在线')
}

export const reportOpenShop = () => {
    reportLog('​我要开店')
}

export const reportShare = (url: string) => {
    reportLog('分享', { data: { url } })
}

export const reportFilter = (data: any) => {
    reportLog('​筛选', {
        data,
    })
}

export const reportReserve = (data: any = {}) => {
    reportLog('预约', {
        data,
    })
}

export let jumpOut = true
export const setJumpOut = (value: boolean) => {
    jumpOut = value
}

export const reportJumpOut = () => {

    reportLog('跳出', {
        data: {
            url: location.href,
            stayTime: getPageStayTime()
        }
    })
}

/**
 * @description 上报日志
 * 
 * @param {string} type 日志类型
 * @param {any} data 日志数据 
 */
export const reportLog = (type: ReportEventType, opts: {
    data?: object,
    msg?: string,
    remark?: string
} = {}) => {
    // if (!aegis) {
    //     init()
    // }

    // const { data = {}, msg = '', remark = '' } = opts

    // aegis.reportEvent({
    //     name: type,
    //     ext1: msg,
    //     ext2: JSON.stringify(data),
    //     ext3: remark,
    // })
}



