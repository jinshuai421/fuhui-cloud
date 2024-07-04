import { defineComponent, onMounted, PropType, ref } from "vue";
import style from "./index.module.less";
import { Icon } from "vant";
import VueRouter from "@/router";

export default defineComponent({
  props: {
    title: {
      type: String,
      default: "",
    },
    // 返回
    isBack: {
      type: Boolean,
      default: true,
    },
    // 透明
    isTransparent: {
      type: Boolean,
      default: false,
    },
    // 背景颜色
    bgColor: {
      type: String,
      default: "#fff",
    },
    color: {
      type: String,
      default: "#000",
    },
  },
  emits: ["update:isTransparent"],
  setup(props, { emit }) {
    onMounted(() => {
      const el: any = document.querySelector("#page");
      el.addEventListener("scroll", () => {
        const { scrollTop } = el;
        if (scrollTop > 3) {
          emit("update:isTransparent", false);
        } else {
          emit("update:isTransparent", true);
        }
      });
    });

    const onClick = (e: MouseEvent) => {
      if (props.isBack) {
        VueRouter.back();
      }
    };

    return () => (
      <div
        class={style["hea_sticky"]}
        style={{
          backgroundColor: props.isTransparent ? "transparent" : props.bgColor,
        }}
      >
        <div class={style["header"]}>
          <div style={"margin-left: 15px;width:12px;"} onClick={onClick}>
            {props.isBack && (
              <svg
                width="12"
                height="24"
                viewBox="0 0 12 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  clip-rule="evenodd"
                  d="M10 19.4375L8.95453 20.5L1.28092 12.7014C0.89798 12.3122 0.897981 11.6878 1.28092 11.2986L8.95453 3.5L10 4.5625L2.68173 12L10 19.4375Z"
                  fill={props.isTransparent ? props.color : "#000"}
                />
              </svg>
            )}
          </div>
          <div
            class={style["title"]}
            style={{ color: props.isTransparent ? props.color : "#000" }}
          >
            {props.title}
          </div>
        </div>
      </div>
    );
  },
});
