import { getZLBUserInfo } from "@/state/user"
import { isAlipayMiniProgram, isIOS } from "./env"
import { openLocation } from "./alipay"



const completeJSBridgePromise = new Promise((resolve, reject) => {


    // try {
    //     if (!ZWJSBridge) {
    //         throw new Error('ZWJSBridge is not defined')
    //     }
    // } catch {
    //     return reject(false)
    // }


    // ZWJSBridge.onReady(function (data: any) {
    //     console.log('初始化完成后，执行bridge方法')
    //     resolve(null)
    // })

})

/**
 * @description: 判断是否是老年模式
 */
export const getIsOldStyle = ():Promise<boolean> => {
    return new Promise((resolve, reject) => {
        completeJSBridgePromise.then(() => {

            ZWJSBridge.getUiStyle().then((data: any) => {
                const isOld = data.uiStyle === 'elder'
                resolve(isOld)
            }).catch(() => {
                return reject(false)
            })
        })
    })
}





export const getCurrentLocation = () => {
    return new Promise((resolve) => {
        completeJSBridgePromise.then(() => {
            ZWJSBridge.getLocation({}).then((res: any) => {
                resolve({ lat: res.latitude, lng: res.longitude });
            })
        })

    })
}

export const callUp = (phone: string) => {

    ZWJSBridge.phoneCall({
        corpId: phone
    })
}


export const openLink = (link: string) => {
    completeJSBridgePromise.then(() => {
        ZWJSBridge.openLink({
            url: link,
        })
    })

}

export const closeLink = () => {
    completeJSBridgePromise.then(() => {
        ZWJSBridge.close()
    })
}



export const getUserInfo = () => {
    return new Promise((resolve, reject) => {
        const data = getZLBUserInfo()
        resolve(data)
    })
}

export const mapNav = (to: any, from: any) => {
    let link = ''

    if (isAlipayMiniProgram) {
        openLocation(to)
        return
    }

    const params = {
        sourceApplication: 'zlb',
        sid: '',
        slat: from?.lat || '',
        slon: from?.lng || '',
        sname: '出发地',
        did: '',
        dlat: to.lat,
        dlon: to.lng,
        dname: '目的地',
        dev: 0,
        t: 0
    }
    if (isIOS) {
        link = 'iosamap://path?'
    } else {
        link = 'amapuri://route/plan/?'
    }

    link += getParamUrl(params)

    if (isIOS) {
        window.location.href = link
    } else {
        openLink(link)
    }
}









/**
 * @description 将对象转成encodeurl格式
 * @param params 
 * @returns 
 */
export const getParamUrl = (params: any) => {
    let str = ''

    const keys = Object.keys(params);
    for (let key of keys) {
        str += `${key}=${params[key]}&`;
    }
    return str.slice(0, -1)
}







export const chooseImage = (upload: boolean) => {
    return new Promise((resolve, reject) => {
        completeJSBridgePromise.then(() => {
            ZWJSBridge.chooseImage({
                upload,
            }).then((data: any) => {
                console.log('chooseImage', data)
                resolve(data)
            }).catch((error: any) => {
                console.log('chooseImage', error)
            })
        })

    })
}




