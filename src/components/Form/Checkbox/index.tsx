import { defineComponent, PropType } from 'vue'
import style from './index.module.less'
import {
  CheckboxItem,
  CheckboxItemObj,
  CheckboxValue,
  CheckboxRenderItem,
  RenderLabel
} from '../types'
import ArrowImg from './assets/arrow.png'
import { Data, OptionsType } from './types'
import { getDataset } from '@/utils/helper'

export default defineComponent({
  name: 'Checkbox',
  props: {
    // 选项数据
    options: {
      type: Array as () => CheckboxItem[],
      default: () => []
    },
    // 选中的值
    value: {
      type: [Array as () => Array<CheckboxValue>, Number, String],
      default: () => []
    },
    field: {
      type: String,
      default: ''
    },
    // 是否单选
    single: {
      type: Boolean,
      default: false
    },

    // 标签
    label: {
      type: String,
      default: ''
    },

    // 选中图标
    selectIcon: {
      type: String
    },
    renderItem: {
      type: Function as PropType<CheckboxRenderItem>
    },
    renderLabel: {
      type: Function as PropType<RenderLabel>
    },
    labelClassName: {
      type: String,
      default: ''
    },
    // 选项列表盒子的className
    bodyClassName: {
      type: String,
      default: ''
    },
    // 启用全选
    selectAll: {
      type: Boolean,
      default: false
    }
  },
  data(): Data {
    let value
    if (this.single) {
      value = this.value || ''
    } else {
      value = this.value || []
    }

    return {
      select: value,
      showSelectAll: this.single ? false : this.selectAll
    }
  },
  watch: {
    value(val) {
      // 设置初始值
      if ([null, undefined].includes(val)) {
        if (this.single) {
          this.select = ''
        } else {
          this.select = []
        }
        return
      }
      this.select = val
    }
  },
  emits: ['change'],
  methods: {
    onClickOption(e: MouseEvent) {
      console.log('onClickOption', e)

      const index = getDataset(e, 'index')
      if ([null, undefined].includes(index)) return

      this.$emit('change', this.getValue(parseInt(index)))
    },
    // 获取改变后的值
    getValue(index: number) {
      console.log('getValue', index)

      // 处理全选按钮
      if (index === -1) {
        // 取消全选
        if (this.getIsSelectAll()) {
          return []
        }
        const newValue = []

        for (let item of this.options) {
          newValue.push((item as CheckboxItemObj).value || item)
        }

        return newValue
      }

      const item = this.options[index]
      const value: CheckboxValue =
        (item as CheckboxItemObj)?.value || (item as string)

      if (this.single) return value

      const oldVal = (this.select as Array<CheckboxValue>).slice()
      const itemIndex = oldVal.indexOf(value as any)
      if (itemIndex > -1) {
        oldVal.splice(itemIndex, 1)
      } else {
        oldVal.push(value as any)
      }

      return oldVal
    },
    // 获取当前是否全选
    getIsSelectAll() {
      const { value, options, single, selectAll } = this
      if (single || !selectAll) return false
      return (value as CheckboxValue[])?.length === options.length
    },

    // 判断是否选中
    getSelected(value: CheckboxValue) {
      const { select, single } = this
      if (single) {
        return select === value
      } else {
        return (
          (select as Array<CheckboxValue>).filter((item) => item == value)
            .length > 0
        )
      }
    },
    renderLab() {
      if (this.renderLabel) {
        return this.renderLabel(this.label)
      }
      if (!this.label) return ''
      return (
        <div class={['font--t9 text-black', this.labelClassName]}>
          {this.label}
        </div>
      )
    },
    renderCheckbox(
      item: CheckboxItemObj,
      index: number,
      select: boolean,
      optionType?: OptionsType
    ) {
      let realIndex = index
      const { single, selectAll } = this
      if (!single && selectAll) {
        index++
      }

      // 自定义优先
      if (this.renderItem) {
        return (
          <div data-index={realIndex}>
            {this.renderItem(item, index, select)}
          </div>
        )
      }

      if (select) {
        return (
          <div
            class={[
              'flex--center--v',
              'mt-base-15',
              style['checkout__item'],
              style['checkout__item--select']
            ]}
            data-index={index}
          >
            <div class={['flex-1 font--t7']}>{item.text}</div>
            <img
              src={this.selectIcon || ArrowImg}
              class={[style['icon--1']]}
              alt=""
            />
          </div>
        )
      }
      return (
        <div
          data-index={index}
          class={[
            'mt-base-15',
            style['checkout__item'],
            ' text-black font--t7 '
          ]}
        >
          {item.text}
        </div>
      )
    },
    renderOption() {
      const { options, single, selectAll } = this

      const optionsVnode = options.map((item: CheckboxItem, index) => {
        if (typeof item === 'string') {
          item = {
            text: item,
            value: item
          }
        }

        if (this.getSelected(item.value)) {
          return this.renderCheckbox(item, index, true)
        } else {
          return this.renderCheckbox(item, index, false)
        }
      })

      // 处理全选按钮
      if (!single && selectAll) {
        optionsVnode.unshift(this.renderSelectAll())
      }

      return optionsVnode
    },

    // 全选按钮
    renderSelectAll() {
      const { options, value } = this
      const allItem = {
        text: '全选',
        value: ''
      }
      const isSelected = options.length === (value as CheckboxValue[])?.length

      return this.renderCheckbox(allItem, -1, isSelected, OptionsType.All)
    }
  },
  render() {
    return (
      <div onClick={this.onClickOption}>
        {this.renderLab()}
        <div class={[this.bodyClassName]}>{this.renderOption()}</div>
      </div>
    )
  }
})
