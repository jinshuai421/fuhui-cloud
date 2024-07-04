import { defineComponent } from 'vue'
import style from './index.module.less'
import CloseImg from './assets/close.png'
import DeleteImg from './assets/delete.png'
import Prompt from './assets/prompt-img.png'

import { getDataset } from '@/utils/helper'
import { getState } from './types'
const Key = 'searchHistory'

export default defineComponent({
  props: {
    text: {
      type: String,
      default: ''
    }
  },
  data() {
    return getState()
  },
  created() {
    this.getData()
  },
  emits: ['click'],
  watch: {
    text(val) {
      val = val.trim()
      if (val) {
        this.add(val)
      }
    }
  },
  methods: {
    getData() {
      const storage = localStorage.getItem(Key) || ''
      this.storage = storage
      if (!storage) return
      const data = storage.split(',').filter((item) => item)
      this.data = data
    },
    add(val: string) {
      const { data } = this
      this.prompt=true
      if (data.includes(val)) return
      data.unshift(val)
      this.save()
    },
    delete(index: number) {
      this.data.splice(index, 1)
      this.save()
    },
    clear() {
      this.data = []
      this.save()
    },
    save() {
      const { data } = this
      this.storage = data.toString()

      localStorage.setItem(Key, this.storage)
    },
    onClick(e: MouseEvent) {
      const index = getDataset(e, 'index')
      if (!index) return
      this.delete(index)
    },
    /**
     * @description 点击开启编辑模式
     *
     */
    onClickOperateDelete() {
      this.editable = true
    },
    onClickOperateComplete() {
      this.editable = false
    },
    onClickOperateDeleteAll() {
      this.clear()
    },
    /**
     * @description 删除选项
     *
     */
    onClickOptions(e: MouseEvent) {
      const index = getDataset(e, 'index')
      if (!index) return
      if (this.editable) {
        this.delete(index)
      } else {
        this.emitClick(index)
      }
    },
    emitClick(index: number) {
      const { data } = this
      const item = data[index]
      this.$emit('click', item)
    },
    renderLabel() {
      return (
        <div
          class={['flex--center--v flex-wrap']}
          onClick={this.onClickOptions}
        >
          {this.data.map((item, index) => this.renderLabelItem(item, index))}
        </div>
      )
    },
    renderLabelItem(label: string, index: number) {
      let closeVnode: null | JSX.Element = null
      if (this.editable) {
        closeVnode = (
          <div class={['flex--center', style['label__close']]}>
            <img class={style['icon--close']} src={CloseImg} alt="" />
          </div>
        )
      }
      return (
        <div
          data-index={index}
          class={['relative', style['label__item'], 'font--t5 text-black']}
        >
          {label}
          {closeVnode}
        </div>
      )
    },

    renderTitle() {
      return <div class={['flex-1 font--t5', style['title']]}>搜索历史</div>
    },
    renderOperate() {
      if (this.editable) {
        return (
          <div class={['font--t3']}>
            <span class={['text-grey']} onClick={this.onClickOperateDeleteAll}>
              全部删除
            </span>
            <span class={['mx-10']}>|</span>
            <span onClick={this.onClickOperateComplete} class={['text-blue']}>
              完成
            </span>
          </div>
        )
      }

      return (
        <img
          src={DeleteImg}
          onClick={this.onClickOperateDelete}
          class={[style['icon--delete']]}
        />
      )
    },
    renderPrompt() {
      return (
        <div v-show={this.prompt} class={['font--t5',style['prompt-box']]}>
          <img src={Prompt} alt=""/>
          <div>抱歉,未找到该冷库~</div>
        </div>
      )
    },
  },
  render() {
    return (
      <div>
        <div class={['flex--center--v']}>
          {this.renderTitle()}
          {this.renderOperate()}
        </div>
        <div>{this.renderLabel()}</div>
        <div>{this.renderPrompt()}</div>
      </div>
    )
  }
})
