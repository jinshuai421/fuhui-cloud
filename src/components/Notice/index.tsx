import { defineComponent, onMounted, PropType, ref } from "vue";
import style from "./index.module.less";
import VueRouter from "@/router";
import { NoticeBar, Swipe, SwipeItem } from "vant";
import { getDiffTimeStr } from "@/utils/utils";

/**
 * @description 推送消息List State
 */
export interface NoticeListState {
  name: string;
  img: string;
  url: string;
}

export default defineComponent({
  props: {
    list: {
      type: Array<NoticeListState>,
      default: () => [],
    },
  },
  emits: ["clickItem"],
  setup(props, { emit, slots }) {
    const onClick = (data: any) => {
      emit("clickItem", data);
    };

    return () => (
      <div class={style["noticeBar"]}>
        <NoticeBar class={style["bar"]} scrollable={false}>
          <div class={style["content"]}>
            <div class={style["left"]}></div>
            <div class={style["hr_3"]}></div>
            <Swipe
              vertical
              class={style["notice-swipe"]}
              autoplay={3000}
              show-indicators={false}
            >
              {props.list.map((item: any) => {
                return (
                  <SwipeItem
                    class={style["swipe_item"]}
                    onClick={() => onClick(item)}
                  >
                    <div class={style["swipe_text"]}>
                      <div>{item.text}</div>
                      <div>{getDiffTimeStr(item.time)}</div>
                    </div>
                    <div class={style["icon"]}></div>
                  </SwipeItem>
                );
              })}
            </Swipe>
          </div>
        </NoticeBar>
      </div>
    );
  },
});
