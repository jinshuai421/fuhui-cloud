import { defineComponent, PropType } from 'vue'
import style from './index.module.less'
export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => []
    }
  },
  emits: ['click'],
  render() {
    return (
      <div class={style['config-data-item']}>
        {this.data.map((item: any) => {
          return (
            <div
              class={style['config-list']}
              onClick={() => this.$emit('click', item)}
            >
              {item.iconImg && <img src={item.iconImg} alt={item.title} />}
              <span>{item.num}</span>
              <div>{item.title}</div>
            </div>
          )
        })}
      </div>
    )
  }
})
