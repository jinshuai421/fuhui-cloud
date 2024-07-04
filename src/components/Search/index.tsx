import { defineComponent, ref } from "vue";
import style from "./index.module.less";
import closeIcon from "./assets/close.png";

export default defineComponent({
  props: {
    type: {
      type: String,
      default: "1",
    },
    placeholder: {
      type: String,
      default: "搜索",
    },
    isScrub: {
      type: Boolean,
      default: false,
    },
  },
  data: () => {
    return {
      value: "",
    };
  },
  emits: ["search"],
  created() {},
  methods: {
    toSearch() {
      this.$emit("search", this.value);
    },
    handleCancel() {
      this.value = "";
      this.$emit("search", this.value);
    },
    renderStandardSearch() {
      return (
        <div class={[style["standard"]]}>
          <div class={style.search}>
            <input
              class="font--t5"
              type="text"
              v-model={this.value}
              placeholder={this.placeholder}
            />
          </div>
          <div class={["font--t5 search_btn"]} onClick={this.toSearch}>
            搜索
          </div>
        </div>
      );
    },
    renderStickySearch() {
      return (
        <div class={[style["sticky"]]}>
          <div class={style.search}>
            <input
              class="font--t5"
              type="text"
              v-model={this.value}
              placeholder={this.placeholder}
              onKeyup={(e: any) => {
                const { keyCode } = e;
                if (parseInt(keyCode) !== 13) return;
                this.toSearch();
              }}
            />
            {!!this.value && (
              <img
                src={closeIcon}
                class={[style.closeIcon]}
                onClick={this.handleCancel}
              />
            )}
          </div>
          {/* {this.isScrub && (
            <div class={["font--t5", style.cancel]} onClick={this.handleCancel}>
              取消
            </div>
          )} */}
        </div>
      );
    },
    renderSearch() {
      switch (this.type) {
        case "1":
          return this.renderStandardSearch();
        case "2":
          return this.renderStickySearch();
      }
    },
  },
  render() {
    return this.renderSearch();
  },
});
