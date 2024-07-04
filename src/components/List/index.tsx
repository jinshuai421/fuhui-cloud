import { defineComponent } from 'vue'
// import {List} from 'vant'
import style from './index.module.less'
import { scrollBehavior } from '@/behavior/scroll'

export default defineComponent({
  mixins: [scrollBehavior],
  props: {
    /**
     * @description 是否全部加载完成
     */
    finished: {
      type: Boolean,
      default: false
    },
    /**
     * @description 完全加载后的提示文案
     */
    finishedText: {
      type: String,
      default: '没有更多了'
    },
    load: {
      type: Boolean,
      default: true
    },
    /**
     * @description 距离底部多少像素触发scrollBottom
     */
    offsetBottom: {
      type: Number,
      default: 200
    }
  },
  created() {
    this.onLoad()
  },

  watch: {
    finished(val) {
      if (val) {
        this.removeEventListener()
      } else {
        this.addEventListener()
      }
    }
  },
  emits: ['load'],
  methods: {
    removeEventListener() {
      const el = this.getScrollElement()
      console.log(el,321312)
      if (!el) return
      el.removeEventListener('scroll', this.scrollHandler)
    },
    scrollHandler() {
      const el = this.getScrollElement()
      if (!el) return
      const { scrollHeight, scrollTop, clientHeight } = el
      if (scrollTop + clientHeight + this.offsetBottom >= scrollHeight) {
        this.onLoad()
      }
    },
    onLoad() {
      this.$emit('load')
    },
    renderFinshedText() {
      if (this.finished) {
        return (
          <div class={['mx-15 font--t3 text-neutral-9 text-center']} style={{ marginTop: '40px' }}>
            {this.finishedText}
          </div>
        )
      }

      return ''
    }
  },
  render() {
    return (
      <div
        ref="list"
        class={[this.selector ? '' : style.list, 'scroll__bar--clear']}
      >
        {this.$slots.default?.()}
        {this.renderFinshedText()}
      </div>
    )
  }
})
