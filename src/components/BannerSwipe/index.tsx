import { defineComponent } from 'vue'
import style from './index.module.less'
import demoSwiper from './aseets/demo-swiper.png'
import { Swipe, SwipeItem } from 'vant'
export default defineComponent({
  props: {
    dataList: {
      type: Array,
      default: () => []
    }
  },
  emits: ['change'],
  render() {
    return (
      <div class={style['footer-swoper-item']}>
        <Swipe
          class={style['my-swipe']}
          autoplay="3000"
          indicator-color="#333333"
        >
          {this.dataList.map((item: any) => {
            return (
              <SwipeItem
                onClick={() => {
                  location.href = item.href
                }}
              >
                <img src={item.banner} alt="" />
              </SwipeItem>
            )
          })}
        </Swipe>
      </div>
    )
  }
})
