import { PropType } from "vue"



export const ChartUnitProps = {

    unit: {
        type: String,
        default: ''
    },
    unitClassName: {
        type: String,
        default: 'text-right text-white font--10'
    },
    unitColor: {
        type: String,
        default: ''
    }
}

export type ChartUnitProps = PropType<typeof ChartUnitProps>

export const getUnitProps = (props: any) => {
    return {
        unit: props.unit,
        unitClassName: props.unitClassName,
        unitColor: props.unitColor
    }
}