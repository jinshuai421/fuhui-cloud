import { defineComponent } from "vue";
import style from "./index.module.less";

import { Toast, Field } from "vant";

export default defineComponent({
  props: {
    item: {
      type: Object,
      default: () => {},
    },
    value: {
      type: [String, Number],
      default: "",
    },
  },
  data() {
    return {
      data: this.value as any,
    };
  },
  emits: ["update:value"],
  watch: {
    data() {
      if (this.data !== this.value) {
        this.$emit("update:value", this.data);
      }
    },
    value() {
      if (this.value !== this.data) {
        this.data = this.value;
      }
    },
  },
  created() {},
  methods: {},
  render() {
    const {
      placeholder,
      label,
      required,
      readonly,
      isLink,
      maxlength = 40,
      mode,
      showWordLimit = false,
      onClick = () => {},
    } = this.item;
    return (
      <div>
        <Field
          label={label}
          v-model={this.data}
          type={mode}
          placeholder={placeholder || `请输入`}
          required={required}
          readonly={readonly}
          isLink={isLink}
          onClick={onClick}
          maxlength={maxlength}
          show-word-limit={showWordLimit}
        />
      </div>
    );
  },
});
