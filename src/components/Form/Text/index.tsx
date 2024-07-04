import { defineComponent, PropType } from 'vue'
import style from './index.module.less'
import { Field } from 'vant'
import { RenderLabel, InputType, RenderRight } from '../types'
export default defineComponent({
  name: 'Text',
  props: {
    className: {
      type: String,
      default: ''
    },
    labelClassName: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },

    placholder: {
      type: String,
      default: ''
    },
    value: {
      type: [String, Number],
      default: ''
    },
    unitClassName: {
      type: String,
      default: ''
    },
    // 单位
    unit: {
      type: String,
      default: ''
    },
    renderLabel: {
      type: Function as PropType<RenderLabel>
    },
    required: {
      type: Boolean,
      default: false
    },
    // 输入框类型
    inputType: {
      type: String as PropType<InputType>,
      default: InputType.Text
    },
    renderRight: {
      type: Function as PropType<RenderRight>
    }
  },
  emits: ['change'],
  data() {
    return {
      text: this.value || ''
    }
  },
  watch: {
    value(val) {
      val = String(val)
      if ([null, undefined].includes(val)) {
        val = ''
      }

      if (this.text !== val) {
        this.text = val
      }
    },
    text(val) {
      if (this.value == val) return

      this.$emit('change', val)
    }
  },
  methods: {
    getSlot() {
      const slot = {} as any
      if (this.renderLabel) {
        slot.label = () => this.renderLabel?.(this.label)
      }
      return slot
    },
    // 右侧渲染
    renderGt() {
      const { unit, unitClassName, renderRight } = this
      if (renderRight) return renderRight()
      if (unit) {
        return (
          <div class={unitClassName || [style['default__unit'], 'ml-10']}>
            {unit}
          </div>
        )
      }
      return ''
    }
  },
  render() {
    const slot = this.getSlot()
    return (
      <div class={this.className || [style['default'], 'flex--center--v']}>
        <Field
          type={this.inputType}
          required={this.required}
          {...slot}
          label={this.label}
          v-model={this.text}
        />
        {this.renderGt()}
      </div>
    )
  }
})
