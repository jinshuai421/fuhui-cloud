import Page from "@/components/Page";

import style from "./index.module.less";
import QRCode from "qrcode";

import { defineComponent, reactive, onMounted, ref, computed } from "vue";
import { getScreenInfoApi } from "@/api";
import { Swipe, SwipeItem } from "vant";
import ImgBg1 from "./assets/img.png";
import ImgBg2 from "./assets/img2.jpg";
import ImgBg3 from "./assets/img3.jpg";
import { headSvg } from "./types";

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
      
      });
    };



    const generateQRCode = (data: string) => {
      QRCode.toDataURL(data, { errorCorrectionLevel: "H" }, (err, url) => {
        if (err) console.error(err);
        qrUrl.value = url;
      });
    };


    return () => (
      <Page padding={0} class={style.bgImg} isHead={false}>
        {headSvg()}
      </Page>
    );
  },
});
