import { wxAuth } from '@/utils/wx'
import { pxToVw, vwToPx } from '@/utils/util'
import { defineComponent, nextTick, ref, watch } from 'vue'
import style from './index.module.less'

export const wxOpenLaunchWeapProps = {
  id: {
    type: String
  },
  width: {
    type: String,
    default: '100px'
  },
  height: {
    type: String,
    default: '100px'
  }
}

export default defineComponent({
  props: wxOpenLaunchWeapProps,
  setup(props, { slots }) {
    const authComplete = ref(false)
    const openBtnRef = ref<Element>()

    const btnWidth = vwToPx(pxToVw(props.width))
    const btnHeight = vwToPx(pxToVw(props.height))
    wxAuth().then(() => {
      nextTick(() => {
        authComplete.value = true
      })
    })

    watch(
      () => authComplete.value,
      () => {
        nextTick(() => {
          if (openBtnRef.value) {
          }
        })
      }
    )

    const renderOpenBtn = () => {
      // if(!authComplete.value) return

      return (
        <div v-html={
          `<wx-open-launch-weapp
          ref={openBtnRef}
          username={props.id}
          
        >
        <script type="text/wxtag-template">
        <style>
            .btn{
                width: ${btnWidth};
                height: ${btnHeight};
                background-color: transparent;
                border:none;
            }
        </style>
            <button class="btn"></button>
        </script>
        </wx-open-launch-weapp>`
        }>

        </div>
      )
    }

    return () => <div>{renderOpenBtn()}</div>
  }
})
