import { defineComponent, PropType } from 'vue'
// import style from "./index.module.less";
import {
  FormType,
  FormData,
  VerifyConfig,
  VerifyResult,
  FormConfigItem,
  CheckboxType,
  FormConfigItemMultiple,
  FormMultipleType,
  CheckboxTypeMultiple
} from './types'
import Checkbox from './Checkbox'
import Text from './Text'
import TextArea from './TextArea'
import Range from './Range'
import Slider from './Slider'
import DatetimePicker from './DatetimePicker'
import { Toast } from 'vant'

export default defineComponent({
  name: 'Form',
  props: {
    rules: {
      type: [Object, Array] as PropType<VerifyConfig | VerifyConfig[]>
    },
    config: {
      type: Array as () => FormData,
      default: () => []
    }
  },
  data() {
    return {
      form: this.normalizeForm()
    }
  },
  emits: ['change'],
  methods: {
    // 标准化表单数据
    normalizeForm() {
      const form: any = {}
      for (let item of this.config) {
        const { field } = item
        form[field] = {} as any
        const { data } = item
        if (Array.isArray(data)) {
          let value
          for (let it of data) {
            form[field][it.type] = it.value
            if (!['', undefined, null].includes(it.value as any)) {
              value = it.value
            }
          }
          form[field].value = value
          form[field].rules = item.rules
        } else {
          form[field].value = data.value
          form[field].rules = item.rules
        }
      }

      return form
    },

    // 获取表单数据
    getFormData() {
      const { form } = this
      const data: any = {}
      const keys = Object.keys(form)
      for (let key of keys) {
        data[key] = form[key].value
      }

      return data
    },
    // 表单验证
    verify() {
      const { form } = this
      const fields = Object.keys(form)
      for (let field of fields) {
        const { value, rules } = form[field]
        if (!rules) continue

        const result: VerifyResult = this.ruleVerify(value, rules)
        if (!result.status) {
          if (value && rules.showPrompt !== undefined && rules.showPrompt) {
            Toast(rules.errMessage)
          }
          return false
        }
      }
      return true
    },

    ruleVerify(value: any, rules: VerifyConfig): VerifyResult {
      const result = { status: true, errMessage: rules.errMessage || '' }
      // 验证必填
      if (rules.required) {
        if (
          ['', undefined, null].includes(value) ||
          (Array.isArray(value) && value.length === 0)
        ) {
          result.status = false
          return result
        }
      }

      // 正则验证
      if (rules.pattern) {
        if (!rules.pattern.test(value)) {
          result.status = false
          return result
        }
      }

      if (rules.max) {
        if (parseFloat(value) > rules.max) {
          result.status = false
          return result
        }
      }

      return result
    },

    getValue(key: string, type?: FormType) {
      let item = (this.form as any)[key]
      if (type) {
        return item[type]
      }
      return item.value
    },
    /**
     * @description 重置表单数据
     *
     */
    reset() {
      const { form } = this
      // debugger
      const keys = Object.keys(form)
      for (let key of keys) {
        const item = form[key]
        item.value = null
        const keys = Object.keys(item)

        if (keys.length) {
          for (let key of keys) {
            item[key] = null
          }
        }
      }
    },

    resetObj(obj: any) {},

    /**
     * @description 当单字段多类型数据发生变化时，清除其他类型数据
     * @param field {string} 字段名
     * @param type {FormType} 数据发生改变的类型
     */
    clearMultipleData(field: string, type: FormType, value: any) {
      const obj = this.form[field]
      const keys = Object.keys(obj)
      for (let key of keys) {
        if (['value', type].includes(key)) continue
        // FormType.Text 类型特殊处理
        if (key === FormType.Text) {
          obj[key] = value
          continue
        }

        // 处理范围输入框组件数和单选框组件组合时的单选项数据回显
        if (
          [FormType.Range, FormType.Slider].includes(type) &&
          key === FormType.Radio
        ) {
          obj[key] = value.join('-')
          continue
        }

        if (
          [FormType.Range, FormType.Slider].includes(key as FormType) &&
          type === FormType.Radio
        ) {
          obj[key] = value.split('-')
          continue
        }

        // 处理范围组件与滑动组件的组合
        if (
          [FormType.Slider].includes(key as FormType) &&
          type === FormType.Range
        ) {
          obj[key] = value
          continue
        }
        if (
          [FormType.Range].includes(key as FormType) &&
          type === FormType.Slider
        ) {
          obj[key] = value
          continue
        }

        // 赋值null触发组件自定义的数据初始化
        obj[key] = null
      }
    },
    onChange(type: FormType, field: string, value: any) {
      // console.log('type', type, 'field', field, 'value', value)
      console.log('form', this.form)

      const obj = this.form[field]
      if (obj.hasOwnProperty(type)) {
        this.clearMultipleData(field, type, value)
        obj[type] = value
        obj.value = value
        //    console.log('obj',obj);
      } else {
        obj.value = value
      }

      this.$emit('change', this.getFormData())
    },

    // 获取插槽
    getSolts(item: FormConfigItem | FormMultipleType) {
      const slot: any = {}
      if (item.type === FormType.Checkbox) {
        let data
        if ((item as FormConfigItem).data) {
          data = (item as FormConfigItem).data as CheckboxType
        } else {
          data = item as CheckboxTypeMultiple
        }
        if (data?.renderItem) {
          slot.default = data.renderItem
        }

        return slot
      }

      return slot
    },
    getComponent(item: FormConfigItem | FormMultipleType) {
      switch (item.type) {
        case FormType.Checkbox:
          return Checkbox

        case FormType.Radio:
          return Checkbox

        case FormType.Text:
          return Text

        case FormType.TextArea:
          return TextArea

        case FormType.Range:
          return Range

        case FormType.Slider:
          return Slider

        case FormType.Datetime:
          return DatetimePicker

        default:
          return Text
      }
    },
    // 单项多类型表单组件
    renderComponentMuitiple(items: FormConfigItemMultiple) {
      const { data, renderLabel, label } = items

      let labelVnode

      if (renderLabel) {
        labelVnode = renderLabel(label || '')
      }

      if (!labelVnode && label) {
        labelVnode = <div class={['font--t9 text-black']}>{label}</div>
      }
      return (
        <div>
          {labelVnode}
          {data.map((item, index) => {
            item = item as FormMultipleType
            // const slot = this.getSolts(item);
            const Comp: any = this.getComponent(item)
            // 处理单选框
            if (item.type === FormType.Radio) {
              ;(item as CheckboxType).single = true
            }
            item.value = this.getValue(items.field, item.type)
            return (
              <Comp
                onChange={(value: any) =>
                  this.onChange(item.type, items.field, value)
                }
                {...item}
              />
            )
          })}
        </div>
      )
    },
    renderComponent() {
      const { config } = this
      return config.map((item, index) => {
        if (Array.isArray(item.data))
          return this.renderComponentMuitiple(item as FormConfigItemMultiple)
        item = item as FormConfigItem
        // const slot = this.getSolts(item);
        const Comp: any = this.getComponent(item)

        const { data } = item

        // 处理单选框
        if (item.type === FormType.Radio) {
          ;(data as CheckboxType).single = true
        }

        data.value = this.getValue(item.field)
        // console.log('data',data);

        return (
          <Comp
            onChange={(value: any) =>
              this.onChange((item as FormConfigItem).type, item.field, value)
            }
            {...data}
          />
        )
      })
    }
  },
  render() {
    return <div>{this.renderComponent()}</div>
  }
})
