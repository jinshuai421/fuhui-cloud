import { defineComponent, PropType } from 'vue'
import style from './index.module.less'
import { Calendar } from 'vant'
import { CalendarDayItem } from 'vant'
// // import moment from "moment";;

import { ColdMarginAreaData } from './types'

export default defineComponent({
  props: {
    showConfirm: {
      type: Boolean,
      default: true
    },
    areaData: {
      type: Object as PropType<ColdMarginAreaData>,
      default: () => []
    }
  },
  data() {
    return {
      show: true
    }
  },
  emits: ['change'],
  methods: {
    getMaxTime() {
      return moment().add(12, 'months').toDate()
    },
    formatDate(item: any): CalendarDayItem {
      const date = moment(item.date).format('YYYY-MM-DD')
      const { areaData } = this
      let area = 0
      const dateData = areaData[date]
      const money = parseFloat(dateData?.storageMoney) || '面议'
      if (dateData?.area !== undefined) {
        area = parseInt(dateData.area) || 0
        item.bottomInfo = `余${area}`
        item.area = area
      }

      item.money = money

      if (area === 0 || money === 0) {
        item.type = 'disabled'
        item.className = style['calendar__item--empty']
      } else {
        item.className = style['calendar__item']
      }

      return item
    },
    onChange(value: any) {
      console.log('value', value)
      const status = value.length === 2

      this.$emit('change', { value, status })
    },
    renderTitle() {
      return (
        <div class={['flex--center--v', style['header']]}>
          {this.renderTitleItem('租赁日期', '12月19日')}
          <div class={['']}>
            <div class={['px-8 font--t5 text-white']}>共16天</div>
            <div class={['mt-5', style['header__underline']]}></div>
          </div>
          {this.renderTitleItem('到期日期', '1月3日')}
        </div>
      )
    },
    renderTitleItem(title: string, date: string) {
      return (
        <div class={['flex-1']}>
          <div class={['font--t5 text-white']}>{title}</div>
          <div class={['font--t11 text-white']}>{date}</div>
        </div>
      )
    }
  },
  render() {
    return (
      <div class={[style.calendar]}>
        <Calendar
          default-date={null}
          show-title={false}
          showConfirm={this.showConfirm}
          max-date={this.getMaxTime()}
          rowHeight={55}
          show-mark={false}
          show-subtitle={false}
          poppable={false}
          type="range"
          onSelect={this.onChange}
          v-model:show={this.show}
          formatter={this.formatDate}
          v-slots={{
            // title: this.renderTitle,
            'bottom-info': (item: CalendarDayItem) => {
              // console.log('item', item)
              if (item.bottomInfo) {
                let className = ''
                if (item.type === 'start') {
                  className = 'text-white'
                } else if (item.type === 'end') {
                  className = 'text-white'
                } else {
                  className = 'text-red'
                }

                if ((item as any).area) {
                  return (
                    <div>
                      <div>{item.bottomInfo}</div>
                      <div class={className}>￥{(item as any).money}</div>
                    </div>
                  )
                } else {
                  return (
                    <div>
                      <div>{item.bottomInfo}</div>
                    </div>
                  )
                }
              }
              return null
            }
          }}
        />
      </div>
    )
  }
})
