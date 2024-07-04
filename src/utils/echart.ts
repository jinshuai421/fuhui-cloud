import { LinearGradientObject, TooltipComponentOption } from "echarts"
// import moment from "moment";
import { getSize } from "./util"

/**
 * @desc 获取echart线性渐变颜色对象
 *
 * @param {String} startColor 开始颜色
 * @param {String} endColor 结束颜色
 * @param {String} dir 渐变方向方向 h:水平  v:垂直
 * @returns {Object}
 */
export const getLinearGradient = (startColor: string, endColor: string, dir: 'level' | 'vertical' = 'vertical'): LinearGradientObject => {
    if (dir === 'vertical') {
        return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 0,
            y2: 1,
            colorStops: [
                {
                    offset: 1,
                    color: startColor // 0% 处的颜色
                },
                {
                    offset: 0,
                    color: endColor // 100% 处的颜色
                }
            ]
        }
    } else {
        return {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
                {
                    offset: 1,
                    color: startColor // 0% 处的颜色
                },
                {
                    offset: 0,
                    color: endColor // 100% 处的颜色
                }
            ]
        }
    }
}



export const getTooltipConfig = (type: 'searies' | 'label' | 'value' = 'searies'): TooltipComponentOption => {
    return {
        show: true,
        backgroundColor: 'transparent',
        borderColor: 'transparent',
        trigger: "axis",
        confine: true,
        formatter(params) {
            let optionStr = '';
            if (Array.isArray(params)) {
                for (let item of params) {
                    if (type === 'searies') {
                        optionStr += `
                        <div class="flex--center--v">
                            <div  class="font--t5 text-white">${item.seriesName}:</div>
                            <div class="font--t5 text-yellow number font-bold">${item.value}</div>
                        </div>`
                    } else if (type === 'value') {
                        optionStr += `
                        <div class="flex--center--v">
                          
                            <div class="font--t5 text-yellow number font-bold">${item.value}</div>
                        </div>`
                    }
                    else {
                        optionStr += `
                        <div class="flex--center--v">
                            <div  class="font--t5 text-white">${item.name}:</div>
                            <div class="font--t5 text-yellow number font-bold">${item.value}</div>
                        </div>`
                    }
                }
            } else {

            }

            return `
            <div class="relative overflow-hidden  px-26 py-16 echart__tooltip echart__tooltip__border--1 echart__tooltip__border--2 echart__tooltip__border--3 echart__tooltip__border--4">
               ${optionStr}
            </div>
            `
        }


    }
}

/**
 * @description 获取指定范日期的坐标轴数据
 */
export const getRangeDate = (days: number, options: {
    format?: string,
} = {}) => {
    const { format = 'MM-DD' } = options

    const nowDay = moment().format(format)
    const res = [nowDay] as string[];

    for (let i = 0; i < days; i++) {
        const day = moment().subtract(i, 'days').format(format)
        res.push(day)
    }

    return res.reverse()

}




export const getAxisLabelConfig = () => {
    return {
        axisLabel: {
            fontSize: 21
        },
    }
}

export const getGridConfig = () => {

    return {
        grid: {
            top: '10%',
            right: '5%'
        },
    }
}


export const getChartSize = (props: any, type?: 'vw') => {
    if (type === 'vw') {
        return {
            width: getSize(props.width),
            height: props.height,
        }
    }

    return {
        width: props.width,
        height: props.height,
    }
}