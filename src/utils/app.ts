import { hashToObject } from "./util"


export const isApp = () => {
    const { isApp = '' } = hashToObject(location.hash) || {}
    if (isApp) {
        localStorage.setItem('isApp', isApp)
    }
    return !!localStorage.getItem('isApp')
}

export const navMap = (lat: number | string, lng: number | string) => {
    const { origin, pathname } = location

    // debugger
    // if (!lat) {
    //     lat = '29.875571'
    //     lng = ' 121.70357'
    // }
    location.href = `sznc://goMap?lat=${lat}&lng=${lng}`
}