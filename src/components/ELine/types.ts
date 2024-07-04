import { Color } from "echarts";
import { PropType } from "vue";
import { ChartUnitProps } from "../ChartUnit/types";
import { PublicEchartProps } from "../Echart/types";

export interface ELineItem {
    /**
     * @description 主色
     */
    color: Color;
    /**
     * @description 折线点颜色
     */
    pointColor?: string;
    name?: string;

    /**
     * @description 折线点大小
     */
    pointSize?: number;
    pointBorderColor?: string;
    lineColor?: string;

    areaColor?: string | Color;
    data: number[];

}
export const ELineProps = {
    ...PublicEchartProps,
    ...ChartUnitProps,
    gridLeft: {
        type: String,
        default: '8%'
    },
    /**
     * @description 显示折线点
     */
    showPoint: {
        type: Boolean,
        default: true
    },
    /**
     * @description 折线配置
     */
    xAxis: {
        type: Array as PropType<string[]>,
        default: () => []
    },
    xAxisLabelInterval: {
        type: [String, Number],
        default: 'auto'
    },

    /**
     * @description 是否平滑
     */
    smooth: {
        type: Boolean,
        default: false
    },
    /**
     * @description 数据
     */
    data: {
        type: Array as PropType<ELineItem[]>,
        default: () => []
    },
    axisLabelSize: {
        type: [Number, String],
        default: 21
    },
    tooltipType: {
        type: String as PropType<'searies' | 'label' | 'value'>,
        default: 'label'
    },
    showValue: {
        type: Boolean,
        default: false
    },
    labelFontSize: {
        type: Number,
        default: 20
    },


}


export type ELineProps = PropType<typeof ELineProps>;