import { defineComponent, PropType } from 'vue'
import style from './index.module.less'
import Form from '@/components/Form/'
import { FormData } from '@/components/Form/types'
import {
  FilterButtonData,
  ButtonType,
  getState,
  RenderConfirmButton
} from './types'

export default defineComponent({
  name: 'Filter',
  props: {
    data: {
      type: Array as () => FormData,
      default: () => []
    },
    buttonGroup: {
      type: Array as () => Array<FilterButtonData>,
      default: () => []
    },
    operateClassName: {
      type: String,
      default: ''
    },
    showLine: {
      type: Boolean,
      default: true
    },
    //
    renderConfirmButton: {
      type: Function as PropType<RenderConfirmButton>
    }
  },
  emits: ['confirm', 'reset', 'change'],
  data() {
    return getState()
  },
  methods: {
    // To do
    // sort切换
    // 展开收取下拉框
    onClickOption(e: Event) {
      console.log(e)
      const { data, type }: { data: any; type: any } = (e.target as any)
        ?.dataset
      console.log(data, type)
    },

    fillData(data: Array<any>, step: number) {
      const { length } = data

      const patch = (step - (length % step)) % step

      for (let i = 0; i < patch; i++) {
        data.push('')
      }

      return data
    },

    /**
     * @description Filter 组件点击确认按钮
     *
     */
    onClickConfirm() {
      console.log('Filter 确认', this.formData)
      this.$emit('confirm', this.formData)
    },
    // 点击清空
    onClickReset() {
      const formRef = this.$refs.form as any
      formRef?.reset?.()
      // console.log('Filter 重置',this.formData,formRef?.getFormData());
      this.formData = formRef?.getFormData()

      this.$emit('reset', this.formData)
    },
    /**
     * @description Filter change事件监听器
     *
     * @param {*} data
     */
    onChange(data: any) {
      console.log('Filter change data', data)

      this.$emit('change', data)
      this.formData = data
    },

    renderForm() {
      return <Form ref="form" onChange={this.onChange} config={this.data} />
    },
    renderConfirmBtn(btn: FilterButtonData) {
      if (this.renderConfirmButton) {
        return (
          <div class={['flex-1 ']} onClick={this.onClickConfirm}>
            {this.renderConfirmButton()}
          </div>
        )
      }
      return (
        <div
          onClick={this.onClickConfirm}
          class={[
            ' flex-1 font--t7 text-white',
            style['btn'],
            style['btn__check']
          ]}
        >
          {btn.text || '确定'}
        </div>
      )
    },
    renderRestBtn(btn: FilterButtonData) {
      return (
        <div
          onClick={this.onClickReset}
          class={[
            'mr-15 font--t7 text-neutral-9',
            style['btn'],
            style['btn__reset']
          ]}
        >
          {btn.text || '重置'}
        </div>
      )
    },

    // 操作
    renderOperate() {
      const { buttonGroup } = this
      const obj = {
        [ButtonType.Reset]: this.renderRestBtn,
        [ButtonType.Confirm]: this.renderConfirmBtn
      }

      const btnVnode = buttonGroup
        .map((btn: FilterButtonData) => obj[btn.type](btn))
        .filter((e) => e)

      if (btnVnode.length === 0) return ''

      return (
        <div
          class={[
            'py-12 mt-20 flex--center--v',
            this.showLine ? style.operate : '',
            this.operateClassName
          ]}
        >
          {btnVnode}
        </div>
      )
    }
  },
  render() {
    return (
      <div class={[style.filter]}>
        {this.renderForm()}
        {this.renderOperate()}
      </div>
    )
  }
})
