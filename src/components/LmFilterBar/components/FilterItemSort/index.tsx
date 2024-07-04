import { defineComponent } from 'vue'
// import style  from "./index.module.less";
import { SortState, SortData, stateSwitch } from './types'
import Item from '../Item'

export default defineComponent({
  name: 'FilterItemSort',
  props: {
    title: {
      type: String,
      default: ''
    },
    data: {
      type: Object as () => SortData,
      default: () => ({})
    }
  },
  emits: ['click', 'change', 'clear'],
  data() {
    return {
      field: this.data.field,
      state: this.data.sort || 'normal',
      selectTab: false
    }
  },
  methods: {
    hookClear() {
      this.state = SortState.Normal
      this.selectTab = false
      // this.emitChange()
      this.emitClear()
    },
    onClick() {
      const state = stateSwitch(this.state)
      this.state = state
      if (state === SortState.Normal) {
        this.selectTab = false
      } else {
        this.selectTab = true
      }
      this.emitClick()
      this.emitChange()
    },
    emitClear() {
      const { field } = this
      this.$emit('clear', { value: this.state, field })
    },
    emitChange() {
      const { field } = this
      this.$emit('change', { value: this.state, field })
    },
    emitClick() {
      this.$emit('click')
    }
  },
  render() {
    return (
      <Item select={this.selectTab} title={this.title} onClick={this.onClick} />
    )
  }
})
