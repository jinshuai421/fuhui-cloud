import Page from "@/components/Page";

import style from "./index.module.less";

import { defineComponent, reactive, onMounted, ref, computed } from "vue";

export default defineComponent({
  setup(props, {}) {
    const buddhistYear = ref(0);
    const buddhistMonth = ref(0);
    const buddhistDay = ref(0);

    const isScroll = ref(false);

    const list = ref(
      Array(20).fill({
        name: "匿名施主",
      })
    );

    const scrollH = ref(0);
    const scrollItemH = ref(0);

    onMounted(() => {
      convertDate();
      scrollH.value = (document.querySelector(".scroll") as any).offsetHeight;
      scrollItemH.value = (
        document.querySelector(".scroll-item") as any
      ).offsetHeight;

      if (scrollH.value < scrollItemH.value) {
        isScroll.value = true;
      }
    });

    const convertDate = () => {
      const date: any = new Date();
      const months = [
        4, 5, 6, 7, 8, 9, 10, 11, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
      ]; // 对应佛历月份

      let Year = date.getFullYear() + 543 + 1; // 佛历计算的方法：将佛陀涅槃年数543年加上今的年数(例：543年+2009年+1年=2553年)，新年过后增加一年计算，如此类推。
      let Month = months[date.getMonth()];
      let Day = date.getDate();

      console.log(Year, "Year");
      buddhistYear.value = Year;
      buddhistMonth.value = Month;
      buddhistDay.value = Day;
    };
    const renderHead = () => {
      return (
        <div class={[style.head]}>
          <div class={[style.head_t]}>华陵云</div>
          <div class={[style.head_r]}>
            <p>
              佛历：{buddhistYear.value}年{moment().format("MM月DD日")}
            </p>
            <p>农历：甲辰年庚午月癸丑日属龙</p>
          </div>
        </div>
      );
    };

    const optionSetting = computed(() => {
      return {
        step: 0.15, // 数值越大速度滚动越快
        limitMoveNum: 2, // 开始无缝滚动的数据量 this.dataList.length
        hoverStop: true, // 是否开启鼠标悬停stop
        direction: 1, // 0向下 1向上 2向左 3向右
        openWatch: true, // 开启数据实时监控刷新dom
        singleHeight: 0, // 单步运动停止的高度(默认值0是无缝不停止的滚动) direction => 0/1
        singleWidth: 0, // 单步运动停止的宽度(默认值0是无缝不停止的滚动) direction => 2/3
        waitTime: 1000, // 单步运动停止的时间(默认值1000ms)
      };
    });

    const renderContent = () => {
      return (
        <div class={[style.content]}>
          {/* <div class={[style.content]}></div> */}
          <div class={[style.content_bg]}>
            <div class={[style.content_t]}>
              <div class={[style.content_t_ewm]}>
                <img src=""></img>
                <p>扫码捐功德</p>
              </div>
              <div class={[style.content_t_num]}>
                <div>
                  <span>666</span>
                  <p>位</p>
                </div>
                <p>已捐赠</p>
              </div>
              <div class={[style.content_t_ewm]}>
                <img src=""></img>
                <p>扫码捐功德</p>
              </div>
            </div>
            <div class={[style.content_list]}>
              <div class={["scroll"]}>
                <div
                  class={[style.scrollItem, "scroll-item"]}
                  style={
                    isScroll.value
                      ? {
                          height: `${scrollItemH.value}px`,
                          animationDuration: `${
                            (scrollItemH.value / scrollH.value) * 5
                          }s`,
                        }
                      : {}
                  }
                >
                  {list.value.map((item, i) => {
                    return (
                      <div class={[style.li]}>
                        <div>{item.name}</div>
                        <div>{i}</div>
                        <div>{item.name}</div>
                      </div>
                    );
                  })}
                  {isScroll.value &&
                    list.value.map((item, i) => {
                      return (
                        <div class={[style.li]}>
                          <div>{item.name}</div>
                          <div>{i}</div>
                          <div>{item.name}</div>
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    return () => (
      <Page padding={0} class={style.bgImg} isHead={false}>
        {renderHead()}
        {renderContent()}
      </Page>
    );
  },
});
