import { defineComponent, onMounted, ref, watch } from 'vue'
// import style from "./index.module.less";

import * as echarts from 'echarts'
import { EchartProps } from './types'
import { pxToVw } from '@/utils/util'

export default defineComponent({
  props: EchartProps,
  emits: ['init'],

  setup(props, { emit }) {
    const chartRef = ref()
    let chartInstance = null as any

    watch(
      () => props.options,
      () => {
        if (!chartInstance) return
        chartInstance.setOption(props.options)
      },
      {
        deep: true
      }
    )

    onMounted(() => {
      const el = chartRef.value as HTMLElement
      chartInstance = echarts.init(el)
      chartInstance.setOption(props.options)
      emit('init', chartInstance)
    })

    const getSize = (size: string) => {
      if (size.includes('%')) {
        return size
      } else {
        return pxToVw(parseFloat(size))
      }
    }

    return () => (
      <div
        ref={chartRef}
        style={{ width: getSize(props.width), height: props.height }}
      ></div>
    )
  }
})
