import { defineComponent } from "vue";
import style from "./index.module.less";
export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  render() {
    return (
      <div class={style["title-assembly"]}>
        <span>{this.title}</span>
        {this.$slots.right && this.$slots.right()}
      </div>
    );
  },
});
