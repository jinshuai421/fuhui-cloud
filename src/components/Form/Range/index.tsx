import { defineComponent, PropType } from "vue";
import style from "./index.module.less";
import { Field } from "vant";
import { RenderLabel } from "../types";
import { isFalse } from "@/utils/util";

export default defineComponent({
  props: {
    min: {
      type: Number,
    },
    max: {
      type: Number,
    },
    value: {
      type: Array as () => Array<number | string>,
      default: () => [],
    },
    minPlaceholder: {
      type: String,
      default: "需要量",
    },
    maxPlaceholder: {
      type: String,
      default: "请输入最多需要量",
    },
    className: {
      type: String,
      default: "",
    },
    label: {
      type: String,
      default: "",
    },
    renderLabel: {
      type: Function as PropType<RenderLabel>,
    },
  },
  data() {
    const value = this.value as any;

    return {
      start: this.normalizeRange(value?.[0]),
      end: this.normalizeRange(value?.[1]),
    };
  },
  emits: ["change"],
  watch: {
    value(val) {
      let start = this.normalizeRange(val?.[0]);
      let end = this.normalizeRange(val?.[1]);

      this.start = start;
      this.end = end;
    },
    start(val) {
      this.onChange("start");
    },
    end(val) {
      this.onChange("end");
    },
  },
  methods: {
    onChange(type: "start" | "end") {
      const [oldStart, oldEnd] = this.value || [];
      const { start, end } = this;

      // debugger
      if (type === "start" && start == oldStart) {
        return;
      }

      if (type === "end" && end == oldEnd) {
        return;
      }
      this.$emit("change", [this.start, this.end]);
    },
    onBlur() {
      const { start, end } = this;

      if (!(isFalse(start) || isFalse(end))) {
        if (parseFloat(start) > parseFloat(end)) {
          this.start = end;
          this.end = start;
        }
      }
    },
    // 标准化范围数据
    normalizeRange(val: any) {
      if ([undefined, null].includes(val)) {
        val = "";
      } else {
        val = String(val);
      }

      return val;
    },
    formatterMin(val: string): string {
      const { min } = this;
      if (typeof min !== "undefined") {
        if (parseInt(val) <= min) {
          return min + "";
        }
      }
      const num = parseFloat(val);

      return (num || num === 0 ? num : "") + "";
    },
    formatterMax(val: string) {
      const { max } = this;
      if (typeof max !== "undefined") {
        if (parseInt(val) >= max) {
          return max + "";
        }
      }

      const num = parseFloat(val);

      return (num || num === 0 ? num : "") + "";
    },
    renderLab() {
      if (this.renderLabel) {
        return this.renderLabel(this.label);
      }
      if (!this.label) return "";
      return <div class={["font--t9 text-black"]}>{this.label}</div>;
    },
  },
  render() {
    return (
      <div class={[style.range, this.className || style["defalut"]]}>
        {this.renderLab()}
        <div class={["flex--center--v"]}>
          <Field
            formatter={this.formatterMin}
            onBlur={this.onBlur}
            class={[style["range__input"], "text-blue"]}
            placeholder={this.minPlaceholder}
            type="number"
            v-model={this.start}
          ></Field>
          <div class={["mx-4"]}>-</div>
          <Field
            formatter={this.formatterMax}
            onBlur={this.onBlur}
            type="number"
            v-model={this.end}
            placeholder={this.maxPlaceholder}
          ></Field>
        </div>
      </div>
    );
  },
});
