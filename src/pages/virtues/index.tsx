import Page from "@/components/Page";

import style from "./index.module.less";
import QRCode from "qrcode";

import { defineComponent, reactive, onMounted, ref, computed } from "vue";
import { getScreenInfoApi } from "@/api";
import { Swipe, SwipeItem } from "vant";
import ImgBg1 from "./assets/img.png";
import ImgBg2 from "./assets/img2.jpg";
import ImgBg3 from "./assets/img3.jpg";

export default defineComponent({
  setup(props, {}) {
    const buddhistYear = ref(0);
    const buddhistMonth = ref(0);
    const buddhistDay = ref(0);

    const isScroll = ref(false);

    const list = ref([]);
    const data = ref<any>({});
    const qrUrl = ref("");

    const scrollH = ref(0);
    const scrollItemH = ref(0);

    onMounted(() => {
      // convertDate();
      initData();
      setInterval(() => {
        initData();
      }, 2000);
    });

    const initData = () => {
      getScreenInfoApi({}).then((res) => {
        list.value = res.donationScreenVOList;
        data.value = res;
        generateQRCode(res.donationUrl);
        scrollH.value = (document.querySelector(".scroll") as any).offsetHeight;
        scrollItemH.value = (
          document.querySelector(".scroll-item") as any
        )?.offsetHeight;

        if (scrollH.value < scrollItemH.value) {
          isScroll.value = true;
        }
      });
    };

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
          <Swipe
            autoplay={5000}
            showIndicators={false}
            class={[style.swipe]}
          >
            <SwipeItem class={[style.swipeItem]}>
              <img src={ImgBg1} alt="" />
            </SwipeItem>
            <SwipeItem class={[style.swipeItem]}>
              <img src={ImgBg2} alt="" />
            </SwipeItem>
            <SwipeItem class={[style.swipeItem]}>
              <img src={ImgBg3} alt="" />
            </SwipeItem>
          </Swipe>
          <div class={[style.head_t]}>华陵云</div>
          <div class={[style.head_r]}>
            <p>佛历：{data.value.buddhistCalendar}</p>
            <p>农历：{data.value.chineseCalendar}</p>
          </div>
        </div>
      );
    };

    const generateQRCode = (data: string) => {
      QRCode.toDataURL(data, { errorCorrectionLevel: "H" }, (err, url) => {
        if (err) console.error(err);
        qrUrl.value = url;
      });
    };

    const renderContent = () => {
      return (
        <div class={[style.content]}>
          {/* <div class={[style.content]}></div> */}
          <div class={[style.content_bg]}>
            <div class={[style.content_t]}>
              <div class={[style.content_t_ewm]}>
                <img src={qrUrl.value}></img>
                <p>扫码捐功德</p>
              </div>
              <div class={[style.content_t_num]}>
                <div>
                  <span>{data.value.donatedCount}</span>
                  <p>位</p>
                </div>
                <p>已捐赠</p>
              </div>
              <div class={[style.content_t_ewm]}>
                <img src={qrUrl.value}></img>
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
                  {list.value.map((item: any, i) => {
                    return (
                      <div class={[style.li]}>
                        <div>{item.name}</div>
                        <div>{item.payerTotal}元</div>
                        <div>{item.blessing}</div>
                      </div>
                    );
                  })}
                  {isScroll.value &&
                    list.value.map((item: any, i) => {
                      return (
                        <div class={[style.li]}>
                          <div>{item.name}</div>
                          <div>{item.payerTotal}元</div>
                          <div>{item.blessing}</div>
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
