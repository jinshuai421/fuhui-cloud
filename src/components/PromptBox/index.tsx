import { defineComponent } from "vue";
import style from "./index.module.less";

import { Popup } from "vant";

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object,
      default: () => {},
    },
  },
  emits: ["update:show"],
  methods: {},
  render() {
    const {
      title,
      content,
      confirmText = "确认",
      onConfirm = () => {},
    } = this.data;
    return (
      <Popup
        v-model:show={this.show}
        position="bottom"
        round
        class={[style.box]}
      >
        <div class={["font--t6 mt-30", style.box_title]}>{title}</div>
        <div class={["font--t5 mt-16", style.box_content]}>{content}</div>
        <div
          class={["font--t5 mt-40 mb-20", style.box_btn]}
          onClick={onConfirm}
        >
          {confirmText}
        </div>
      </Popup>
    );
  },
});
