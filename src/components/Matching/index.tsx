import { defineComponent } from 'vue'
import style from './index.module.less'

import AwaitImg from './assets/await.png'

import { getState, MatchStatus } from './types'

export default defineComponent({
  props: {
    number: {
      type: Number,
      default: -1
    }
  },
  data() {
    return getState()
  },
  created() {
    // setTimeout(()=>{
    //     this.status = MatchStatus.Complete
    // },3000)
  },

  deactivated() {
    this.clearTimer()
  },
  watch: {
    number(value) {
      if (value >= 0) {
        this.status = MatchStatus.Complete
      }
    }
  },
  emits: ['check', 'cancel'],
  methods: {
    clearTimer() {
      if (this.timer) {
        clearInterval(this.timer)
      }
    },
    onClickCancel() {
      this.$emit('cancel')
    },
    onClickConfirm() {
      this.$emit('check')
    },

    renderPromot() {
      if (this.number >= 0) {
        return (
          <div class={['mt-base-15 text--t5 text-neutral-9']}>
            匹配出<span class={['text-blue']}>{this.number}</span>
            家符合条件的冷库
          </div>
        )
      }
      return (
        <div class={['mt-base-15 text--t5 text-neutral-9']}>
          匹配大约10s，请耐心等候
        </div>
      )
    },
    renderButton() {
      if (this.status === MatchStatus.Await) {
        return (
          <div
            onClick={this.onClickCancel}
            class={['font--t7 text-white', style['button']]}
          >
            取消匹配
          </div>
        )
      } else if (this.status === MatchStatus.Complete) {
        return (
          <div
            onClick={this.onClickConfirm}
            class={['font--t7 text-white', style['button']]}
          >
            查看结果
          </div>
        )
      }
    }
  },
  render() {
    return (
      <div class={[style['matching']]}>
        <div class={['flex--center flex-col', style['matching__content']]}>
          <img src={AwaitImg} class={[style['img--1']]} alt="" />
          <div class={['mt-base-15 font--t7 text-black']}>正在努力匹配中</div>
          {this.renderPromot()}
          {this.renderButton()}
        </div>
      </div>
    )
  }
})
