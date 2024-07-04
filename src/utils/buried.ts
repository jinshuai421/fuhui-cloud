import { isHaishuZLB } from "./env";

export const init = () => {
    let appid = ''
    if (isHaishuZLB) {
        appid = '2002297306'
    } else {
        appid = '2002202557'
    }
    (function (w: any, d: any, s, q, i) {
        w[q] = w[q] || [];
        var f = d.getElementsByTagName(s)[0],
            j = d.createElement(s);
        j.async = true;
        j.id = "beacon-aplus";
        j.src = "https://d.alicdn.com/alilog/mlog/aplus.js?id=202951085";
        f.parentNode.insertBefore(j, f);
    })(window, document, "script", "aplus_queue");

    aplus_queue.push({
        action: 'aplus.setMetaInfo',
        arguments: ['_hold', 'START']
    });

    // 如果是私有云部署还需要在上面那段 JS 后面紧接着添加日志域名埋点 // 通常私有云日志服务端域名类似于：quickaplus-web-api.xxx.com.cn ，具体 域名需找交付同学要
    aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["aplus-rhost-v", "alog.zjzwfw.gov.cn"],
    });
    aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["aplus-rhost-g", "alog.zjzwfw.gov.cn"],
    }); // 这个会落到 app_key 字段上
    aplus_queue.push({
        action: "aplus.setMetaInfo",
        arguments: ["appId", "60506758"],
    });

    aplus_queue.push({
        action: 'aplus.setMetaInfo',
        arguments: ['aplus-waiting', 'MAN']
      });

    aplus_queue.push({
        action: 'aplus.sendPV',
        arguments: [
            { is_auto: false },
            { 'miniAppId': appid }
        ],
    })
    // debugger
    aplus_queue.push({
        action: 'aplus.sendPV',
        arguments: ['miniAppName', '天台农业现代园区'],
    })

    console.log('aplus_queue', aplus_queue)
}


export const pickUserName = (userInfo: any) => {
    
    setMeta('_user_id', userInfo.userid)
    setMeta('_user_nick', userInfo.username)
}





/**
 * @description 设置元数据模式
 */
type MetaMode = 'OVERWRITE​' | 'APPEND'

/**
 * @description 阻塞自动上报
 */
export const blockAutoReport = () => {
    setMeta('_hold', 'BLOCK')
}

/**
 * @description 启用自动上报
 */
export const enableAutoReport = () => {
    setMeta('_hold', 'START')
}

/**
 * @description 设置元数据项
 */
export const setMeta = (metaName: string, metaValue: any, mode: MetaMode = 'OVERWRITE​') => {
    window.aplus_queue.push({
        action: 'aplus.setMetaInfo',
        arguments: [metaName, metaValue, mode]
    })
}

/**
 * @description 发送PV日志
 */
export const sendPV = (userData:Record<string,any>={}) => {
    const { aplus_queue } = window;
    aplus_queue.push({
        action: 'aplus.sendPV',
        arguments: [{ is_auto: false },userData]
    });
}


/**
 * @description 使用手动曝光
 * 
 *  sdk提供手动pv发送机制，启用手动pv(即关闭自动pv)，需设置aplus-waiting=MAN;
 *  注意：由于单页面路由改变时不会刷新页面，无法自动发送pv，所以对于单页应用，强烈建议您关闭自动PV, 手动控制PV事件的发送时机N": N取值为300-3000之间的整数值 , 所有日志指令在SDK初始化完成后的N毫秒内将被hold在指令队列, 直至N毫秒等待结束；"MAN": 取消自动化PV日志采集. 设置为MAN之后, 所有PV日志均需手动触发, 但其他类型的事件日志不受影响
 * 
 */
export const useManualExpose = () => {
    setMeta('aplus-waiting', 'MAN');
}


/**
 * @description 开启调试模式
 */
export const enableDebug = () => {
    setMeta('DEBUG',true);
}

/**
 * @description 关闭调试模式
 */
export const disableDebug = () => {
    setMeta('DEBUG',false);
}


/**
 * @description 发送事件日志
 */
export const sendEvent = (eventCode: string, eventType: string,eventParams:any) => {
    const {aplus_queue} = window;
    aplus_queue.push({
     action: 'aplus.record',
      arguments: [eventCode, eventType, eventParams]
    });
}

