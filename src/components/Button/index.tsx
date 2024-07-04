import { defineComponent } from 'vue'
import style from './index.module.less'
import * as Types from './types'

import { callUp } from '@/utils/util'
import { mapNav } from '@/utils/helper'

export default defineComponent({
  props: {
    type: {
      type: String as () => Types.ButtonType,
      default: 'button'
    },
    icon: {
      type: String,
      default: ''
    },
    phone: {
      type: String,
      default: ''
    },
    lat: {
      type: [Number, String]
    },
    lng: {
      type: [Number, String]
    },
    name: {
      type: String,
      default: ''
    },
    address: {
      type: String,
      default: ''
    }
  },
  emits: ['click'],
  methods: {
    onClick(e: MouseEvent) {
      const { type } = this

      switch (type) {
        case Types.ButtonType.phone:
          e.stopPropagation()
          return this.actionPhone()

        case Types.ButtonType.navigation:
          e.stopPropagation()
          return this.actionNavigation()

        case Types.ButtonType.button:
          return this.$emit('click')
      }
    },
    actionPhone() {
    
      callUp(this.phone)
    },
    actionNavigation() {
      // debugger
      if (this.lat && this.lng) {
        
        mapNav(
          { lat: this.lat as number, lng: this.lng as number },
          undefined,
          this.name,
          this.address
        )
      }
    },
    renderButton() {
      if (this.$slots.default) {
        return this.$slots.default()
      }

      if (this.icon) {
        return <img class={style['icon--1']} src={this.icon} />
      }

      return 'Button'
    }
  },
  render() {
    return <div onClick={this.onClick}>{this.renderButton()}</div>
  }
})
