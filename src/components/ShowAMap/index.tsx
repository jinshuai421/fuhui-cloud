import { defineComponent } from 'vue'
import style from './index.module.less'

export default defineComponent({
  name: 'Step',
  props: {
    data: {},
    // 当前步骤
    step: {
      type: Number,
      default: 0
    }
  },
  emits: ['click'],
  methods: {},
  render() {
    return <div></div>
  }
})
