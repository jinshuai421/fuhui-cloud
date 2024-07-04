import { getAction } from "@/command/netTool"
import { appCode } from "@/config/zlb"
import { isHaishuZLB } from "@/utils/env"

/**
 * @description 浙里办小程序登录
 */
export const getZLBAppletsLoginAPI = async (ticketId: string) => {
    const ticketService = 'https://cold.zgwlxc.cn'
    let appId = ''
    let loginAPI = ''
    if (isHaishuZLB) {
        appId = '2002297306'
        loginAPI = '/auth/hsLoginTow'
    } else {
        appId = '2002202557'
        loginAPI = '/auth/loginTow'
    }
    
    return getAction(`${ticketService}${loginAPI}`, { ticketId, appId })
}


// 凭证接口
const ticketApiStrategy:Record<AppCodeType,string> = {
    'test':'/tk',
    'gxlk1.0':'/tk',
    gxlk:'/tk',
    hsgxlk:'/hs/tk'
}

/**
 * @description 浙里办APP或支付宝小程序登录
 */
export const getZLBAppLoginAPI = async (ticketId: string) => {
        const apiName = ticketApiStrategy[appCode]
        const res = await getAction(`https://cold.zgwlxc.cn${apiName}`,{
            tk:ticketId
        })

        console.log('浙里办APP或支付宝小程序登录', res)
        return res
}