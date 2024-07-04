import { postMessage } from "./h5"



/**
 * @description 是否是模拟器
 */
export const isSimulator = () => {
    const { search } = location
    const searchObj = new URLSearchParams(search)
    const isSimulator = searchObj.get('simulator')
    return !!isSimulator
}

/**
 * @description 下单成功
 */
export const checkoutSuccess = (data: any) => {
  
    postMessage('checkoutSuccess', data)
}