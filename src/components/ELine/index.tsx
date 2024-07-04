import { EChartsOption, LineSeriesOption } from 'echarts'
import { defineComponent, reactive, ref, watch } from 'vue'
import ChartUnit from '../ChartUnit'
import { getUnitProps } from '@/components/ChartUnit/types'
import Echart from '../Echart'
import style from './index.module.less'
import { ELineProps } from './types'
import { getTooltipConfig } from '@/utils/echart'

export default defineComponent({
  props: ELineProps,
  emits: ['click'],
  setup(props, { emit }) {
    const { smooth, axisLabelSize, unit } = props

    let instance = null
    const getChartSize = () => {
      return {
        width: props.width,
        height: props.height
      }
    }

    const onInit = (data: any) => {
      instance = data

      instance.on('click', (params: any) => {
        emit('click', params)
      })
    }

    const getOptions = () => {
      const options: EChartsOption = {
        grid: {
          top: '10%',
          right: '0%',
          left: props.gridLeft
        },
        tooltip: {
          show: false
        },
        xAxis: {
          type: 'category',
          data: props.xAxis,
          axisLabel: {
            color: '#999999',
            fontSize: axisLabelSize,
            interval: props.xAxisLabelInterval as any
          },
          axisLine: {
            lineStyle: {
              color: '#D8D8D8'
            }
          },

          axisTick: {
            show: false
          }
        },
        yAxis: {
          type: 'value',
          axisLabel: {
            color: '#999999',
            fontSize: axisLabelSize
          },
          splitLine: {
            // lineStyle: {
            //   color: "rgba(255,255,255,0.2)",
            // },
          }
        }
      }

      options.series = props.data.map((item, i) => {
        return {
          type: 'line',
          data: item.data,
          name: item.name || '',
          smooth: smooth,
          showSymbol: props.showPoint,
          symbolSize: item.pointSize || 4,
          lineStyle: {
            color: item.color || item.color
          },
          label: {
            show: props.showValue,
            fontSize: props.labelFontSize,
            fontWeight: 'bold',
            color: '#2665FA'
          },
          areaStyle: {
            color: item.areaColor || item.color
          },
          itemStyle: {
            color: item.pointColor || item.color,
            borderColor: item.pointBorderColor || item.color
          }
        }
      })

      return options
    }

    const options = ref<any>(null)

    options.value = getOptions()

    watch(
      () => {
        return props.data
      },
      () => {
        options.value = getOptions()
      }
    )

    const renderUnit = () => {
      return <ChartUnit {...getUnitProps(props)} />
    }

    return () => {
      return (
        <div>
          {renderUnit()}
          <Echart onInit={onInit} options={options.value} {...getChartSize()} />
        </div>
      )
    }
  }
})
