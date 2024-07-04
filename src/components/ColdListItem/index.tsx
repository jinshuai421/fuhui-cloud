import { defineComponent, PropType } from 'vue'
import style from './index.module.less'
import * as Types from './types'
import TelImg from './assets/tel.png'
import NavImg from './assets/nav.png'
import noimg from './assets/noimg.png'
import Button from '@/components/Button'
import { ButtonType } from '@/components/Button/types'
// import {Image as VantImage} from 'vant'

export default defineComponent({
  name: 'ColdListItemLayout',
  /**
   * @slots
   *
   * button 自定义按钮
   *
   * state 自定义状态
   */

  props: {
    data: {
      type: Object as PropType<Types.ColdItemData>,
      default: () => ({})
    },
    index: {
      type: Number,
      default: 0
    },
    button: {
      type: [
        Object as () => Types.ButtonItem,
        Array as () => Array<Types.ButtonItem>
      ],
      default: ButtonType.button
    },
    /**
     * @description 隐藏图片
     */
    hiddenImgae: {
      type: Boolean,
      default: false
    },
    old: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    // 图片
    renderImg() {
      return <img class={['mr-base-10', style.img]} src={this.data.image ? this.data.image : noimg} />
      // return <VantImage lazyLoad={true}  class={['mr-base-10', style.img]} src={this.data.image} />
    },
    // 标题
    renderTitle() {
      const { data } = this
      return (
        <div class={['flex-1 text-black font--t6 text--ellipsis--1']}>
          {data.title}
        </div>
      )
    },
    renderDescItem(desc: string, value: string | number, unit: string) {
      return (
        <div class={['flex--center--v font--t3']}>
          <div class={['text-neutral-9 ']}>{desc}</div>
          <div class={['font-semibold text-grey']}>
            {value}
            {unit}
          </div>
        </div>
      )
    },
    // 描述
    renderDesc() {
      const { data } = this
      return (
        <div>
          <div class={['flex--center--v']}>
            {this.renderDescItem('距离·', data?.distance || '', '')}
            <div class={['mx-base-5 text-neutral-d leading-none']}>|</div>
            {this.renderDescItem('共享余量·', data?.remaining || '', 'm³')}
          </div>
        </div>
      )
    },
    renderDescOld() {
      const { data } = this
      return <div class={['text-grey font--t3']}>{data.appointment}人已约</div>
    },
    renderLableItem(text: string) {
      return (
        <div class={['w-max px-8 py-2 font--t2  text-blue', style.label]}>
          {text}
        </div>
      )
    },
    // 标签
    renderLabel() {
      const { data } = this
      return (
        <div class={['flex--center--v']}>
          {data.label.map((item: string) => this.renderLableItem(item))}
        </div>
      )
    },
    // 价格
    renderPrice() {
      const { data } = this
      // debugger
      return (
        <div>
          <div class="text-red font--t7">
            {data.price == null ? <div>面议</div> : data.price == '面议' ? <div>面议</div> :<div>{data.price}<span class="font--t2"> 元/m³</span></div>}
          </div>
        </div>
      )
    },
    // 右上角状态
    renderState() {
      if (this.$slots.state) {
        return this.$slots.state()
      }
      const { data } = this

      return <div class={['text-blue font--t3']}>{data.appointment}人已约</div>
    },
    renderButtonItem(item: Types.ButtonItem) {
      const { type } = item
      const { data } = this

      if (this.$slots.button) {
        return this.$slots.button() || ''
      }

      if (type === ButtonType.phone) {
        return (
          <Button
            class={['ml-base-15']}
            phone={data.tel}
            type={type}
            icon={TelImg}
          />
        )
      }

      if (type === ButtonType.navigation) {
        return (
          <Button
            class={['ml-base-15']}
            lat={data.lat}
            lng={data.lng}
            type={type}
            icon={NavImg}
            name={data.title}
            address={data.address}
          />
        )
      }
    },

    // 按钮
    renderButton() {
      const { button } = this
      if (Array.isArray(button)) {
        return button.map((item: Types.ButtonItem) => {
          return this.renderButtonItem(item)
        })
      }
    },
    renderLeft() {
      if (this.hiddenImgae) return ''
      return this.renderImg()
    },
    renderRight() {
      if (this.old) return this.renderRightOld()
      return (
        <div
          class={[
            'flex-1 py-15 overflow-hidden',
            this.index === 0 ? '' : style['right__border']
          ]}
        >
          <div class={['flex--center--v']}>
            {this.renderTitle()}
            {/* {this.renderState()} */}
          </div>
          {this.renderDesc()}
          <div class={['flex mt-5']}>
            <div class={['flex-1 flex--sb--col']}>
              {this.renderLabel()}
              {this.renderPrice()}
            </div>
            <div class={['ml-10 self-end flex--center--v']}>
              {this.renderButton()}
            </div>
          </div>
        </div>
      )
    },
    // renderRightYoung(){

    // },
    renderRightOld() {
      return (
        <div
          class={[
            'flex-1 py-15 overflow-hidden',
            this.index === 0 ? '' : style['right__border']
          ]}
        >
          <div class={['flex--center--v']}>{this.renderTitle()}</div>

          <div class={['flex--center--v']}>
            <div class={['flex-1 flex--sb--col ']}>
              {/* {this.renderDescOld()} */}

              {this.renderPrice()}
            </div>
            <div class={['ml-10 self-end flex--center--v']}>
              {this.renderButton()}
            </div>
          </div>
        </div>
      )
    }
  },
  render() {
    return (
      <div class={['flex--center--v']}>
        {this.renderLeft()}
        {this.renderRight()}
      </div>
    )
  }
})
