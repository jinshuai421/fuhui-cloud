import { defineComponent } from "vue";
import style from "./index.module.less";
import { getState, getProps } from "./types";

import FormInput from "./components/Input";
import FormInputPicker from "./components/InputPicker";
import FormDatetimePicker from "./components/DatetimePicker";
import FormUploader from "./components/Uploader";

import { Toast, Form } from "vant";
import Card from "../Card";

export default defineComponent({
  props: getProps(),
  data() {
    return getState();
  },
  emits: ["update:data"],
  watch: {
    data: {
      handler() {
        if (this.formValidate !== this.data) {
          this.formValidate = this.data;
        }
      },
      deep: true,
      immediate: true,
    },
    formValidate: {
      handler() {
        if (this.formValidate !== this.data) {
          this.$emit("update:data", this.formValidate);
        }
      },
      deep: true,
      immediate: true,
    },
  },
  created() {
    this.formValidate = this.data;
  },
  methods: {
    renderComponent(item: any, index: number) {
      return (Component: any) => (
        <Component
          key={index}
          item={item}
          v-model:value={this.formValidate[item.key]}
          onChange={(data: any) => item.onChange && item.onChange(data)}
        />
      );
    },
    renderModule(form: any) {
      return form.map((e: any, index: number) => {
        switch (e.type) {
          case "input":
            return this.renderComponent(e, index)(FormInput);
          case "picker":
            return this.renderComponent(e, index)(FormInputPicker);
          case "datetimePicker":
            return this.renderComponent(e, index)(FormDatetimePicker);
          case "uploader":
            return this.renderComponent(e, index)(FormUploader);
        }
      });
    },
  },
  render() {
    return (
      <Form class={[style.form]} label-width={this.labelWidth}>
        {this.columns.map((item: any, i) => (
          <div class={[style.card, item.cardStyle]} key={i}>
            {item.title && <div class={[style.card_title]} v-html={item.title}></div>}
            {this.renderModule(item.form)}
          </div>
        ))}
      </Form>
    );
  },
});
