import { defineComponent } from "vue";
import style from "./index.module.less";
import { Empty } from "vant";
import img from "./images/empyt.png";
export default defineComponent({
  name: "empyt",
  props: {
    isHome: {
      type: Boolean,
      default: false,
    },
    empytText: {
      type: String,
      default: "暂无数据",
    },
    homeBtnText: {
      type: String,
      default: "返回首页",
    },
    image: {
      type: String,
      default: img,
    },
  },
  methods: {
    toHome() {
      this.$router.push("/");
    },
  },
  render() {
    return (
      <div class={style.empyt}>
        <div class={style["empyt_content"]}>
          <img src={this.image}></img>
          <div class={[style["empyt_text"], "font--t5"]}>{this.empytText}</div>
        </div>
        {this.isHome && (
          <div class={["font--t6", style["empyt_home"]]} onClick={this.toHome}>
            {this.homeBtnText}
          </div>
        )}
      </div>
    );
  },
});
