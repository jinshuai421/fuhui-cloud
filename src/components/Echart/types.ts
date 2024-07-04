import { EChartsOption } from "echarts";

import { PropType } from "vue";

export const PublicEchartProps = {
    width: {
        type: String,
        default: '100%'
    },
    height: {
        type: String,
        default: '300px'
    },
}

export const EchartProps = {
    ...PublicEchartProps,
    options: {
        type: Object as PropType<EChartsOption>,
        default: () => ({})
    }
}

export type EchartProps = PropType<typeof EchartProps>;

export interface EchartState {
    chart: any
}