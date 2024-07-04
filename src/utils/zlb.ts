import { isAlipayMiniProgram, isZLB, isZLBWeChatMiniProgram } from "./env";

import { getIsOldStyle,getCurrentLocation as getZLBCurrentLocation } from "./zlbjssdk";


let isLogining = false;

export const setLogining = (bool: boolean) => {
    isLogining = bool;
}

export const getLogining = () => {
    return isLogining;
}




/**
 * @description 装饰路由
 */
export const decorateRouter = (router: any) => {
    const pushOrigin = router.push;
    router.push = function push(path: string, params: any, ...res: any[]) {
        // console.log(path)

        if ((isZLB || isAlipayMiniProgram) && !isZLBWeChatMiniProgram) {
            if (['/mapFindCold', '/my', '/', '/message'].some(item => {
                return path === item
            })) {
                pushOrigin(path, params, ...res);
            } else {
               
            }

        } else {
            pushOrigin(path, params, ...res);
        }


    }

}


export const getCurrentLocation = (): Promise<any> => {
   return getZLBCurrentLocation()
}






