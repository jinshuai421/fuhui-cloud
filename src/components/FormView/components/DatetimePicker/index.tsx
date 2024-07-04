import { defineComponent } from "vue";
import style from "./index.module.less";

import { Toast, Field, Popup, DatetimePicker } from "vant";

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
      showPicker: false,
      currentDate: new Date(),
    };
  },
  emits: ["update:value", "change"],
  watch: {
    data() {
      if (this.data !== this.value) {
        this.$emit("update:value", this.data);
      }
    },
    value() {
      if (this.value !== this.data) {
        this.data = this.value;
        this.currentDate = new Date(this.value);
      }
    },
  },
  created() {},
  methods: {
    onClick() {
      if(this.item.readonly) return
      this.showPicker = true;
    },
    formatter(type: string, val: string) {
      if (type === "year") {
        return `${val}年`;
      } else if (type === "month") {
        return `${val}月`;
      } else if (type === "day") {
        return `${val}日`;
      }
      return val;
    },
    renderPicker() {
      const { minDate, maxDate, format } = this.item;
      return (
        <Popup v-model:show={this.showPicker} position="bottom" round>
          <DatetimePicker
            v-model={this.currentDate}
            type="date"
            title="选择年月日"
            formatter={this.formatter}
            onCancel={() => (this.showPicker = false)}
            min-date={minDate}
            max-date={maxDate}
            onConfirm={(value: string) => {
              this.data = moment(value).format(format || "YYYY-MM-DD");
              this.showPicker = false;
            }}
          />
        </Popup>
      );
    },
  },
  render() {
    const { placeholder, label, required, isLink = true } = this.item;
    return (
      <div>
        <Field
          label={label}
          v-model={this.data}
          placeholder={placeholder || `请选择`}
          required={required}
          readonly={true}
          isLink={isLink}
          onClick={this.onClick}
        />
        {this.renderPicker()}
      </div>
    );
  },
});
