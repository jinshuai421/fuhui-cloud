import { defineComponent } from "vue";

import Uploader from "@/components/Uploader";
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
      footer = () => {},
      maxCount = 1,
      multiple,
      accept,
      readonly,
    } = this.item;
    return (
      <div class={style.upload}>
        <Uploader
          class={style.uploadItem}
          maxCount={maxCount}
          v-model={this.data}
          multiple={multiple}
          accept={accept}
          readonly={readonly}
        />
        {footer && footer()}
      </div>
    );
  },
});
