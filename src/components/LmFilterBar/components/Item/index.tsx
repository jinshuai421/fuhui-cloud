import { defineComponent } from 'vue'
import style from './index.module.less'
// import * as  Types from './types'

import ArrowDown from './assets/arrow-down.png'
import ArrowDownSelect from './assets/arrow-down-select.png'

export default defineComponent({
  name: 'FilterBarItem',
  props: {
    title: {
      type: String,
      default: ''
    },
    select: {
      type: Boolean,
      default: false
    }
  },
  emits: ['click'],
  methods: {
    onClick(e: MouseEvent) {
      this.$emit('click')
    }
  },
  render() {
    return (
      <div
        class={[
          'flex--center--v font--t5 ',
          this.select ? 'text-blue' : 'text-grey'
        ]}
        onClick={this.onClick}
      >
        <div>{this.title}</div>
        <img
          src={this.select ? ArrowDownSelect : ArrowDown}
          class={['ml-base-5', style['icon--1']]}
        />
      </div>
    )
  }
})
