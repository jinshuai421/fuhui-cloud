import { defineComponent } from "vue";
import style from "./index.module.less";
export default defineComponent({
  name: "BottomFix",
  props: {
    list: {
      type: Array,
      default: () => [],
    },
    bgStyle: {
      type: Object,
      default: {},
    },
  },
  render() {
    return (
      <div
        class={[style.foot]}
        style={{
          ...this.bgStyle,
        }}
      >
        {this.list.map((item: any, index: number) =>
          [
            index !== 0 && <div class={"ml-12"}></div>,
            <div
              class={["font--t5", style[item.class || 'primary']]}
              key={index}
              onClick={item.onClick}
            >
              {item.name}
            </div>,
          ].filter((e) => e)
        )}
        {this.$slots.default && this.$slots.default()}
      </div>
    );
  },
});
