import { defineComponent, onMounted, PropType, ref } from "vue";
import style from "./index.module.less";
import VueRouter from "@/router";
import { Toast } from "vant";

export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    onMounted(() => {});

    const onClick = (e: any) => {
      if (e.linkType == 0) {
        Toast("暂未开发");
        return;
      }
      if (e.linkDictValue === "cgmy") {
        VueRouter.push("/articleDetail?dict=cgmy");
      } else if (e.linkDictValue === "bzcy") {
        VueRouter.push("/articleDetail?dict=bzcy");
      } else {
        VueRouter.push(`/articleList?dict=${e.linkDictValue}`);
      }
    };

    return () => {
      if (props.data.length === 0) return null;
      return (
        <div class={[style["kong"]]}>
          {props.data.map((item: any, index) => (
            <div class={[style["kong_li"]]} onClick={() => onClick(item)}>
              <div class={[style["kong_li_img"]]}>
                <img src={item.bannerIconUrl} alt="" />
              </div>
              <span>{item.title}</span>
            </div>
          ))}
        </div>
      );
    };
  },
});
