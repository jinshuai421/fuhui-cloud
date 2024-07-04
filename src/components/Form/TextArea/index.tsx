import { defineComponent } from 'vue'
import style from './index.module.less'
import { Field } from 'vant'
export default defineComponent({
  props: {
    label: {
      type: String,
      default: ''
    },
    labelClassName: {
      type: String,
      default: ''
    },
    className: {
      type: String,
      default: ''
    },
    placholder: {
      type: String,
      default: ''
    },
    value: {
      type: String,
      default: ''
    },
    required: {
      type: Boolean,
      default: false
    },
    maxLength: {
      type: Number,
      default: 200
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
  methods: {},
  render() {
    return (
      <div class={this.className || [style['default'], 'flex--center--v']}>
        <Field
          type="textarea"
          show-word-limit={true}
          maxlength={this.maxLength}
          required={this.required}
          label={this.label}
          v-model={this.text}
        />
      </div>
    )
  }
})
