import { defineComponent, PropType } from "vue";
import style from "./index.module.less";
import { Slider } from "vant";
import { renderLab } from "../utils/util";
import { RenderLabel } from "../types";

export default defineComponent({
  name: "Slider",
  props: {
    laeel: {
      type: String,
      default: "",
    },
    min: {
      type: Number,
      default: 0,
    },
    max: {
      type: Number,
      default: 1000,
    },
    step: {
      type: Number,
      default: 1,
    },
    value: {
      type: Array as () => number[],
      default: () => [],
    },
    className: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    maxText: {
      type: String,
      default: "上限",
    },
    money: {
      type: String,
      default: "¥ ",
    },
    km: {
      type: String,
      default: " ",
    },

    renderLabel: {
      type: Function as PropType<RenderLabel>,
    },
  },
  data() {
    return {
      range: [],
    };
  },
  emits: ["change"],
  watch: {
    value(val) {
      console.log(this.min, "www");
      let [start, end] = val || [],
        { min, max } = this;

      if (["", undefined].includes(start)) {
        start = min;
      }

      if (["", undefined].includes(end)) {
        end = max;
      }

      // console.log('==========',val);

      this.range = [start, end] as any;
    },
  },
  methods: {
    onChange() {
      console.log("this.range", this.range);

      this.$emit("change", this.range);
    },
    renderLab,
    onTouchstart() {
      console.log("onTouchstart");
    },
    renderSlider() {
      const { range, max, min } = this;
      console.log("range", min, max, range);
      let maxText;
      if (parseFloat(range[1]) === max) {
        maxText = this.maxText;
      } else {
        maxText = range[1];
      }
      return (
        <div>
          <div class={["text-center text-blue font--t7"]}>
            {this.money}
            {range[0]}
            {this.km} -{maxText}
          </div>
          <div class={["mt-15 px-15 "]}>
            <Slider
              onChange={this.onChange}
              v-model={this.range}
              max={max}
              min={min}
              range
              v-slots={{
                button: () => {
                  return (
                    <div
                      onTouchstart={this.onTouchstart}
                      class={[style["slider__btn"]]}
                    ></div>
                  );
                },
              }}
            />
          </div>
        </div>
      );
    },
  },
  render() {
    return (
      <div class={[this.className]}>
        {this.renderLab()}
        {this.renderSlider()}
      </div>
    );
  },
});
