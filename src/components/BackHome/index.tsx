import { defineComponent } from 'vue'
import style from './index.module.less'
import BackHomeImg from './assets/back-home.png'
export default defineComponent({
  methods: {
    onClick() {
      this.$router.push('/')
    }
  },
  mounted() {
    // 获取dom
    let div = this.$refs.popButton as HTMLDivElement
    // let startX = 0
    // 获取手指初始坐标
    let startY = 0
    // let x = 0;
    // 获得盒子原来的位置
    let y = 0
    // 手指触摸
    div.addEventListener('touchstart', function (e) {
      // 获取手指初始坐标
      // startX = e.targetTouches[0].pageX
      startY = e.targetTouches[0].pageY
      // x = this.offsetLeft
      y = this.offsetTop
      // this.style.boxShadow = '0 0 15px rgba(0, 0, 0, .6)'
    })
    // 手指离开
    div.addEventListener('touchend', function (e) {
      // this.style.boxShadow = ''
    })

    // 手指按住移动(目前只纵向移动)
    div.addEventListener('touchmove', function (e) {
      // 计算手指的移动距离：手指移动之后的坐标减去手指初始的坐标
      // let moveX = e.targetTouches[0].pageX - startX
      let moveY = e.targetTouches[0].pageY - startY
      // 移动盒子 盒子原来的位置 + 手指移动的距离
      // this.style.left = x + moveX + 'px'
      this.style.top = y + moveY + 'px'
      this.style.bottom = 'auto'
      e.preventDefault()
      // 阻止屏幕滚动的默认行为
    })
  },
  render() {
    return (
      <div
        onClick={this.onClick}
        class={['flex--center', style['back-home'], style['content-item']]}
        ref="popButton"
      >
        <img class={[style['img--1']]} src={BackHomeImg} alt="" />
      </div>
    )
  }
})
