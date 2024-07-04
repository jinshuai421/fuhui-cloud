import { defineComponent, PropType } from 'vue'
import style from './index.module.less'
import { DatetimePicker } from 'vant'
import { RenderLabel } from '../types'
import { TimeType, DatetimePickerData } from './types'
// // import moment from "moment";;
import { getSize } from '@/command/apiTool'

export default defineComponent({
  props: {
    minDate: {
      type: Date
    },
    maxDate: {
      type: Date
    },
    value: {
      type: Array as () => Array<string | undefined>,
      default: () => []
    },
    minDatePlaceholder: {
      type: String,
      default: '开始日期'
    },
    maxDatePlaceholder: {
      type: String,
      default: '结束日期'
    },
    className: {
      type: String,
      default: ''
    },
    label: {
      type: String,
      default: ''
    },
    renderLabel: {
      type: Function as PropType<RenderLabel>
    }
  },
  data(): DatetimePickerData {
    return {
      date: [],
      currentType: TimeType.Start
    }
  },
  created() {
    this.initDate()
  },
  emits: ['change'],
  watch: {
    value() {
      if (['', null, undefined].includes(this.value as any)) {
        this.date = [new Date(), undefined]
        return
      }
      // console.log(val);
      const [startVal, endVal] = this.value,
        [start, end] = this.date

      if (!this.isEqual(startVal, start)) {
        this.date[0] = moment(startVal).toDate()
      }

      if (!this.isEqual(endVal, end)) {
        this.date[1] = moment(endVal).toDate()
      }
    }
  },
  methods: {
    initDate() {
      const { value, date } = this

      if (value?.[1]) {
        date[1] = moment(value[1]).toDate()
      }
      if (value?.[0]) {
        date[0] = moment(value[0]).toDate()
      } else {
        date[0] = new Date()
        this.emitChange()
      }
    },
    dateToValue(value: Date | undefined): string {
      if (value) {
        return moment(value).format('YYYY-MM-DD')
      } else {
        return ''
      }
    },
    isEqual(value: string | undefined, date: Date | undefined) {
      return value === this.dateToValue(date)
    },
    onChange(value: Date) {
      console.log(value)
      const type = this.currentType
      if (type === TimeType.Start) {
        this.date[0] = moment(value).toDate()
      } else if (type === TimeType.End) {
        this.date[1] = moment(value).toDate()
      }
      console.log(this.date)

      this.emitChange()
    },
    onClickInput(type: TimeType) {
      this.currentType = type
      if (type === TimeType.End) {
        if (!this.value?.[1]) {
          this.date[1] = new Date()
          this.emitChange()
        }
      }
    },
    emitChange() {
      const [start, end] = this.date
      this.$emit('change', [this.dateToValue(start), this.dateToValue(end)])
    },
    renderDatetimePicker() {
      if (this.currentType === TimeType.Start) {
        return (
          <DatetimePicker
            swipeDuration={500}
            itemHeight={getSize(30)}
            onChange={this.onChange}
            v-model={this.date[0]}
            show-toolbar={false}
            type={'date'}
            key={this.currentType}
          />
        )
      } else if ((this, this.currentType === TimeType.End)) {
        return (
          <DatetimePicker
            swipeDuration={500}
            itemHeight={getSize(30)}
            onChange={this.onChange}
            v-model={this.date[1]}
            show-toolbar={false}
            type={'date'}
            key={this.currentType}
          />
        )
      }

      return ''
    },
    renderInput() {
      return (
        <div class={['flex--center--v font--t5']}>
          <div
            class={['flex-1 flex--center', style['input']]}
            onClick={() => this.onClickInput(TimeType.Start)}
          >
            {this.value?.[0] ? (
              <div>{this.value[0]}</div>
            ) : (
              <div class={[style['input--placeholder']]}>
                {this.minDatePlaceholder}
              </div>
            )}
          </div>
          <div class={[' mx-4 leading-none']}>-</div>
          <div
            class={['flex-1 flex--center', style['input']]}
            onClick={() => this.onClickInput(TimeType.End)}
          >
            {this.value?.[1] ? (
              <div>{this.value[1]}</div>
            ) : (
              <div class={[style['input--placeholder']]}>
                {this.maxDatePlaceholder}
              </div>
            )}
          </div>
        </div>
      )
    }
  },
  render() {
    return (
      <div class={[style['datetime']]}>
        {this.renderInput()}
        <div class={['mt-15']}>{this.renderDatetimePicker()}</div>
      </div>
    )
  }
})
