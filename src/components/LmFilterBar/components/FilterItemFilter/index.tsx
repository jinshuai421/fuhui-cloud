import { defineComponent } from 'vue'
import style from './index.module.less'
import { Popup } from 'vant'
import * as Types from './types'
import Item from '../Item'
import Filter from '@/components/Filter'
// import {FormData} from '@/components/Form/types'
// import {FilterButtonData} from '@/components/Filter/types'
import { FilterProps } from '@/components/Filter/types'
import { isFalse, isFalseArr } from '@/utils/util'
export default defineComponent({
  name: 'FilterItemFilter',
  props: {
    title: {
      type: String,
      default: ''
    },
    config: {
      type: Object as () => FilterProps,
      default: () => ({})
    },
    /**
     * @description 是否置顶
     */
    top: {
      type: Boolean,
      default: false
    }
    // data:{
    //     type:Object as ()=>FormData,
    //     default:()=>({})
    // },
    // button:{
    //     type:Array as ()=>Array<FilterButtonData>,
    //     default:()=>[]
    // },
    // operateClassName:{
    //     type:String,
    //     default:''
    // },
  },
  data: Types.Data,
  emits: ['confirm', 'reset', 'change', 'click'],
  methods: {
    hookHidden() {
      this.show = false
    },
    onClick(e: MouseEvent) {
      if (!this.show) {
        this.$emit('click')
        setTimeout(() => {
          this.show = !this.show
        }, 150)
        return
      }
      this.show = !this.show
      this.$emit('click')
    },
    // 点击确认按钮
    onConfirm(value: any) {
      this.show = false

      const keys = Object.keys(value || {})

      let selectTab = false

      for (let key of keys) {
        let item = value?.[key]
        if (Array.isArray(item)) {
          if (!isFalseArr(item)) {
            selectTab = true
            break
          }
        } else {
          if (!isFalse(item)) {
            selectTab = true
            break
          }
        }
      }
      // console.log('selectTab',selectTab);
      this.selectTab = selectTab

      // if(Object.keys(value||{}).length===0){
      //     this.selectTab = false;
      // } else {
      //     this.selectTab = true;
      // }
      this.$emit('confirm', value)
    },
    onChange(data: any) {
      this.$emit('change', data)
    },
    onReset(data: any) {
      this.$emit('reset', data)
    },
    renderFilter() {
      const { config } = this
      return (
        <div class={[style['popup'], this.top ? '' : style['popup--40']]}>
          <Popup duration={0.15} v-model:show={this.show} position="top">
            <Filter
              onChange={this.onChange}
              onReset={this.onReset}
              onConfirm={this.onConfirm}
              {...config}
            />
          </Popup>
        </div>
      )
    }
  },
  render() {
    return (
      <div>
        <Item
          select={this.selectTab}
          title={this.title}
          onClick={this.onClick}
        />
        {this.renderFilter()}
      </div>
    )
  }
})
