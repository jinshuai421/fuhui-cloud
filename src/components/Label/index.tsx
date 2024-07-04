import { defineComponent } from "vue";
import style from "./index.module.less";

export default defineComponent({
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {},
  render() {
    return (
      <div class={style.label}>
        {this.list.map((item, index) => (
          <div key={index} class="font--t3">{item}</div>
        ))}
      </div>
    );
  },
});
