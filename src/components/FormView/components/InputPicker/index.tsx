import { defineComponent } from "vue";
import style from "./index.module.less";

import { Toast, Field, Popup, Picker } from "vant";

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
      }
    },
  },
  created() {},
  methods: {
    onClick() {
      if(this.item.readonly) return
      this.showPicker = true;
    },
    renderPicker() {
      const { label, option } = this.item;
      return (
        <Popup v-model:show={this.showPicker} position="bottom" round>
          <Picker
            title={`选择${label}`}
            columns={option}
            onConfirm={(data) => {
              this.data = data.text;
              this.$emit("change", data);
              this.showPicker = false;
            }}
            onCancel={() => {
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
