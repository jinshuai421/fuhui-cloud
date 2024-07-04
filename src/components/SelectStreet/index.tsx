import { defineComponent } from 'vue'
import style from './index.module.less'
import ArrowBlackImg from './assets/arrow-black.png'
import CloseImg from './assets/close.png'
import LocationImg from './assets/location.png'
import { Popup } from 'vant'
import { StreetColdNum } from './types'
import { getDataset } from '@/utils/helper'

// import {getSize} from '@/command/apiTool'

export default defineComponent({
  name: 'SelectStreet',
  props: {
    title: {
      type: String,
      default: '选择慈溪相关乡镇'
    },
    visible: {
      type: Boolean,
      default: false
    },
    data: {
      type: Array as () => StreetColdNum[],
      default: () => []
    },
    currentPosition: {
      type: String,
      default: '慈溪市'
    }
  },
  emits: ['close', 'click', 'change'],
  data() {
    return {
      show: this.visible || false,
      name: this.data[0]
    }
  },
  watch: {
    visible(val) {
      this.show = val
    }
  },

  methods: {
    onClickSelect() {
      this.$emit('click')
    },
    onClose() {
      this.$emit('close')
    },
    onClickOption(e: MouseEvent) {
      const index = getDataset(e, 'index')

      if (!index) return

      const data = this.data[index]
      this.$emit('change', data)
    },
    renderPanelHeader() {
      return (
        <div class={['relative']}>
          <img class={style['icon--2']} src={CloseImg} onClick={this.onClose} />
          <div class="font--t7 text-black">{this.title}</div>
          <div
            class={[
              'inline-flex items-center justify-center',
              style['label--1']
            ]}
          >
            <img class={style['icon--3']} src={LocationImg} alt="" />
            <div class="font--t5 text-blue">{this.currentPosition}</div>
          </div>
        </div>
      )
    },
    renderPanelBody() {
      return (
        <div
          onClick={this.onClickOption}
          class={['flex-1 overflow-y-scroll scroll__bar--clear', style.list]}
        >
          {this.data.map((item, index) => this.rennderPanelItem(item, index))}
        </div>
      )
    },
    rennderPanelItem(item: StreetColdNum, index: number) {
      return (
        <div
          data-index={index}
          class={['font--t5 text-black', style.list__item]}
        >
          {item.streetName}·<span class=" text-grey">{item.num}个</span>
        </div>
      )
    },

    renderPanelContent() {
      return (
        <div class="flex--col justify-between">
          {this.renderPanelHeader()}
          {this.renderPanelBody()}
        </div>
      )
    },
    renderPanel() {
      return (
        <Popup
          class={style.panel}
          onClose={this.onClose}
          position={'bottom'}
          closeable={false}
          v-model:show={this.show}
        >
          <div>{this.renderPanelContent()}</div>
        </Popup>
      )
    }
  },
  render() {
    return (
      <div class={style['select-street']}>
        <div
          onClick={this.onClickSelect}
          class={['flex--center--v font--t9 text-black inline-flex']}
        >
          <div>{this.currentPosition}</div>
          <img class={style['icon--1']} src={ArrowBlackImg}></img>
        </div>
        {this.renderPanel()}
      </div>
    )
  }
})
