import { defineComponent } from 'vue'
import { ChartUnitProps } from './types'
// import style  from "./index.module.less";
export default defineComponent({
  props: ChartUnitProps,
  setup(props) {
    return () => {
      if (!props.unit) return ''
      return (
        <div
          class={[props.unitClassName]}
          style={{ color: props.unitColor || '' }}
        >
          单位:{props.unit}
        </div>
      )
    }
  }
})
