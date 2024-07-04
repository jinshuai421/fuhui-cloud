import { getDataset } from "@/utils/helper";
import { openPage } from "@/utils/navigation";
import { isExternalLinks, openUrl } from "@/utils/util";
import { Swipe, SwipeItem, Toast } from "vant";
import { defineComponent, onMounted, PropType, ref, watch } from "vue";
import style from "./index.module.less";

export default defineComponent({
  props: {
    data: {
      type: Array,
      default: () => [],
    },
  },
  setup(props) {
    const swipeRefs = ref<any>(null);

    const index = ref(0);

    let time: any = null;

    watch(
      () => props.data,
      () => {
        if (props.data.length) {
          setTimeNext((props.data as any)[0].staySecond);
        }
      }
    );

    /**
     * ：0不跳转，1跳转
     */
    const isJump = (type: "0" | "1") => {
      return type === "1";
    };

    const onClickSwipe = (e: any) => {
      // 链接类型 0暂未开发 1外链地址 2内链地址 3内链数据字典
      if (e.linkType === 0) {
        Toast("暂未开发");
      } else if ([1, 2].includes(e.linkType)) {
        openUrl(e.linkUrl);
      }
    };

    const setTimeNext = (s: number) => {
      clearTimeout(time);
      time = setTimeout(() => {
        swipeRefs.value.next();
      }, s * 1000);
    };

    return () => {
      if (props.data.length === 0) return null;
      return (
        <div class={[style["advertise"]]}>
          <Swipe
            ref={swipeRefs}
            class={[style["swipe"]]}
            indicator-color="#323233"
            onChange={(i) => {
              setTimeNext((props.data as any)[i].staySecond);
            }}
          >
            {props.data.map((item: any, index) => {
              return (
                <SwipeItem
                  data-index={index}
                  onClick={() => onClickSwipe(item)}
                >
                  <img class={["w-full h-full "]} src={item.img}></img>
                </SwipeItem>
              );
            })}
          </Swipe>
        </div>
      );
    };
  },
});
