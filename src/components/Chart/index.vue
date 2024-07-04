<template>
	<div ref="chartRef"  id="chartRef" class="chart-box"></div>
</template>

<script lang="ts" setup>
import type { ECharts, EChartsType, EChartsOption } from 'echarts'
import { onMounted, ref, watch } from 'vue'
import * as echarts from 'echarts'
const equipmentList = ref<any>([])
let chart: EChartsType
const chartRef = ref<any>()
const resize = function () {
	console.log('resize')
	// chart.setOption(_.options);
	chart.resize()
}
const emits = defineEmits(['load'])
const props = defineProps({
	options: {
		type: Object as () => EChartsOption,
		default: () => {},
	},
})
onMounted(() => {
    // view 改成 div  uni 获取不到 view的真实dom
	chart = echarts && echarts.init(chartRef.value) 
	setTimeout(() => {
		console.log('props.option', props.options, props)
		chart.setOption(props.options)
	}, 300)
	window.addEventListener('resize', resize)
	console.log(chart,"chart")
	emits('load', chart)
})
watch(
	() => props.options,
	(newValue: any) => {
		console.log('newValue', newValue)
		chart.setOption(newValue)
	},
)
</script>


<style lang="scss" scoped>
.chart-box {
	overflow: hidden;
}
</style>