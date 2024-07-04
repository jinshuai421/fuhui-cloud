import { defineComponent } from "vue";

import Header from "@/components/Header";
import style from "./index.module.less";
import { scrollBehavior } from "@/behavior/scroll";

export default defineComponent({
  name: "Page",
  mixins: [scrollBehavior],
  props: {
    padding: {
      type: [Number, String],
    },
    bgColor: {
      type: String,
    },
    title: {
      type: String,
    },
    isHead: {
      type: Boolean,
      default: true,
    },
    isBack: {
      type: Boolean,
      default: true,
    },
    isTran: {
      type: Boolean,
      default: true,
    },
    headColor: {
      type: String,
      default: "#000",
    },
  },
  data() {
    return {
      isTransparent: false,
    };
  },
  mounted() {
    this.isTransparent = this.isTran;
  },
  methods: {},
  render() {
    return (
      <div
        ref={"page"}
        id={"page"}
        class={[style.page]}
        style={{ padding: this.padding, backgroundColor: this.bgColor }}
      >
        {this.isHead && (
          <Header
            title={this.title}
            isBack={this.isBack}
            v-model:isTransparent={this.isTransparent}
            color={this.headColor}
          ></Header>
        )}
        {this.$slots.default?.()}
        {/* {this.tabbar&&<div class={style['tabbar--placeholder']}></div>} */}
      </div>
    );
  },
});
