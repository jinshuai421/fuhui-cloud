import { isZLBProd } from "@/utils/env"


export const appCode: AppCodeType = 'gxlk'

const appIdMap:Record<AppCodeType,number|string> = {
    'test':2001972512,
    'gxlk1.0':2001972512,
    'gxlk':2002202557,
    'hsgxlk':2002297306,
  }

  const appId = appIdMap[appCode]

// // 线上
const baseUrlStragegy:Record<AppCodeType,string> = {
    // 'test':'//192.167.5.177:3000',
    'test':'//scold.ztesa.work',
    'gxlk1.0':'//gxlk.ztesa.com.cn',
    'gxlk':'//cs.zgwlxc.cn/gxlk/h5',
    'hsgxlk':'//hsgxlk.zgwlxc.cn/gxlk/h5',
  }
  const BASE_URL = baseUrlStragegy[appCode]
  
  const AKStragegy:Record<AppCodeType,string> = {
    'test':'377e702f46ee4e528c1fdd444bf7bfca',
    'gxlk1.0':'377e702f46ee4e528c1fdd444bf7bfca',
    'gxlk':'377e702f46ee4e528c1fdd444bf7bfca',
    'hsgxlk':'BCDSGA_8c30aed03f64e30d72d2b84887d33a67',
  }

  export const AK = AKStragegy[appCode]


  let projectUrl = `https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/${appId}/lastTest/web/index.html`
  if (isZLBProd) {
    projectUrl = `https://mapi.zjzwfw.gov.cn/web/mgop/gov-open/zj/${appId}/reserved/web/index.html`
  }

  export const ZLBUrl =  projectUrl






