import { defineComponent, onMounted, PropType, ref } from "vue";
import style from "./index.module.less";
import VueRouter from "@/router";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
  },
  setup(props, { emit, slots }) {
    return () => (
      <div class={style["card"]}>
        {props.title && <div class={style["title"]}>{props.title}</div>}
        {slots.default && slots.default()}
      </div>
    );
  },
});
