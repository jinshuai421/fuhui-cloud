import { defineComponent, PropType } from 'vue'
import style from './index.module.less'

export default defineComponent({
  name: 'ColdEvaluation',
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['confirm', 'reset', 'change'],
  data() {},
  methods: {},
  render() {
    return <div>冷库评价待开发</div>
  }
})
