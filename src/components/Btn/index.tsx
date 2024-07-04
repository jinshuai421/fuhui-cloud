import { defineComponent } from 'vue'

import style from './index.module.less'
export default defineComponent({
  name: 'Btn',
  props: {
    //暂时最多传两个
    dataArr: {
      type: Array,
      default: () => ['取消预约', '打电话']
    },
    styleObj: {
      type: Object,
      default: () => {}
    },
    colours: {
      type: Array,
      default: () => ['#2665FA', '#FFFFFF']
    }
  },
  emits: ['clikChange'],
  methods: {
    handleClass(i: number) {
      //处理类名切换
      if (this.dataArr.length == 1) {
        return style.btnListItem1 + ' ' + style.colours2
      } else if (this.dataArr.length == 2) {
        return style.btnListItem2 + ' ' + style['colours' + i]
      }
    },
    handleColors(i: number) {
      //处理字体颜色、背景等自定义样式
      let obj = {}
      if (this.dataArr.length == 1) {
        obj = {
          ...this.styleObj,
          color: this.colours[2]
        }
      } else {
        obj = {
          ...this.styleObj,
          color: this.colours[i]
        }
      }
      return obj
    }
  },

  render() {
    return (
      <div class={style.btnContainer}>
        {this.dataArr.map((item, i) => {
          return (
            <div
              class={`${style.btnListItem} ${this.handleClass(i)}`}
              style={this.handleColors(i)}
              key={i}
              onClick={() => {
                this.$emit('clikChange', item)
              }}
            >
              {item}
            </div>
          )
        })}
      </div>
    )
  }
})
