import { defineComponent } from 'vue'
import style from './index.module.less'
import { StepItem } from './types'
export default defineComponent({
  name: 'Step',
  props: {
    data: {
      type: Array as () => StepItem[],
      default: () => []
    },
    // 当前步骤
    step: {
      type: Number,
      default: 0
    }
  },
  emits: ['click'],
  methods: {
    onClickItem(index: number) {
      this.$emit('click', index)
    },
    renderLine() {
      return <div class={['flex-1', style['line']]}></div>
    },
    renderIcon() {
      return (
        <div class={['flex--sb items-center']}>
          {this.data.map((item, index) => this.renderItemIcon(item, index))}
        </div>
      )
    },
    renderItemIcon(item: StepItem, index: number) {
      const { icon, selectIcon } = item,
        { step, data } = this
      let img = icon
      let line: any = ''
      if (index < data.length - 1) {
        line = this.renderLine()
      }
      if (index <= step) {
        img = selectIcon
      }

      return [
        <div class={['relative']} onClick={() => this.onClickItem(index)}>
          <img class={style['icon--1']} src={img} alt="" />
          {this.renderTitleItem(item, index)}
        </div>,
        line
      ]
    },
    renderTitleItem(item: StepItem, index: number) {
      const { title } = item,
        { step } = this

      return (
        <div
          class={['font--t5', style.title, index <= step ? 'text-blue' : '']}
        >
          {title}
        </div>
      )
    },

    renderTitle() {
      return (
        <div class={['flex--sb font--t5 ']}>
          {this.data.map((item, index) => this.renderTitleItem(item, index))}
        </div>
      )
    }
  },
  render() {
    return <div class={[style.steps]}>{this.renderIcon()}</div>
  }
})
