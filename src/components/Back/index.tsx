import { defineComponent } from 'vue'
import style from './index.module.less'
import backImg from './image/back.png'
import { isApp } from '@/utils/app'
import { isAlipayMiniProgram, isZLB, isZLBWeChatMiniProgram } from '@/utils/env'
export default defineComponent({
  name: 'Back',
  data() {
    return {
      isApp: isApp()
    }
  },
  props:{
    url:{
      type:String,
      default:''
    }
  },
  methods: {},

  render() {
    if (isZLB || isAlipayMiniProgram||isZLBWeChatMiniProgram) {
      return ''
  }
    return (
      <div
        class={[
          style.backContainer,
          this.isApp ? style['backContainer--app'] : ''
        ]}
        onClick={() => {
         this.$router.back();

          // setTimeout(() => { location.reload() }, 100)


        }}
      >
        <img src={backImg} style={{ width: '28px', height: '28px' }} alt="" />
      </div>
    )
  }
})
