import Page from "@/components/Page";
import Card from "@/components/Card";
import Notice, { NoticeListState } from "@/components/Notice";
import Title from "@/components/Title";
import HelpItem from "@/components/HelpItem";

import style from "./index.module.less";

import IMGURL from "./assets/Group 18.png";

import VueRouter from "@/router";
import Router, { getCurrentRouter } from "@/router/index";

import { Col, Row, Icon, Popup, Toast, Field, Checkbox } from "vant";
import { defineComponent, reactive, onMounted, ref } from "vue";
import { selectConfig, svgClose, svgIcon, svgSelectOn } from "./types";
import { getConfigApi, getOrderInfoApi, getSecondApi } from "@/api";
import { useRoute } from "vue-router";

export default defineComponent({
  setup(props, {}) {
    const infoData = reactive<any>({});
    const typeData = reactive<any>({});
    const infoTypeData = reactive<any>({});
    const route = useRoute();
    const { orderId, type } = route.query;

    onMounted(() => {
      getSecondApi(type).then((res) => {
        Object.assign(infoTypeData, res);
        getConfigApi(res.typeCode || type).then((e) => {
          Object.assign(typeData, e);
        });
      });

      getOrderInfoApi(orderId).then((res) => {
        Object.assign(infoData, res);
      });
    });

    const renderTop = () => {
      return (
        <div class={[style.top]}>
          <div>恭喜您</div>
          <div>支付成功</div>
        </div>
      );
    };

    const renderList = () => {
      return (
        <div class={[style.info, style["card"]]} style={{ marginTop: "-25px" }}>
          <div class={[style["h3"], style["border_b"]]}>订单信息</div>
          {(infoData.orderDetailList || []).map((item: any) => {
            return (
              <div class={[style["info-li"]]}>
                <div>
                  <span>祈福内容</span>
                  <span class={[style.bold]}>{infoTypeData.name}</span>
                </div>
                <div>
                  <span>供奉时长</span>
                  <span>{`${
                    ["半年", "永久"].includes(item.paymentCategoryName) ? "" : 1
                  }${item.paymentCategoryName}`}</span>
                </div>
                <div>
                  <span>合计金额</span>
                  <span>￥{item.price.toFixed(2)}</span>
                </div>
                <div>
                  <span>祈福心愿</span>
                  <span>{item.blessing}</span>
                </div>
              </div>
            );
          })}
          {infoData.code === "GDX" && (
            <div class={[style["info-li"]]}>
              <div>
                <span>祈福内容</span>
                <span class={[style.bold]}>{typeData.name}</span>
              </div>
              <div>
                <span>合计金额</span>
                <span>￥{infoData.orderPrice.toFixed(2)}</span>
              </div>
              <div>
                <span>祈福心愿</span>
                <span>{infoData.blessing}</span>
              </div>
            </div>
          )}
          <div class={style.price}>
            合计:
            <span>￥{(infoData.orderPrice || 0).toFixed(2)}</span>
          </div>
        </div>
      );
    };

    const renderNotes = () => {
      return (
        <div class={[style["info"], style["card"]]}>
          <div class={[style["h3"], style["border_b"]]}>支付信息</div>
          <div class={[style["info-c"]]}>
            <p>支付时间：{infoData.payTime} </p>
            <p>支付号：{infoData.payNo} </p>
            <p>支付金额：{infoData.orderPrice} </p>
          </div>
        </div>
      );
    };

    const toHome = () => {
      VueRouter.push("/?type=" + (infoTypeData.typeCode || infoData.code));
    };

    const toOn = () => {
      if (infoData.code === "GDX") {
        toHome();
        return;
      }
      VueRouter.push(`/selectBit?type=${infoTypeData.code}`);
    };

    const renderFoot = () => {
      return (
        <div class={[style["foot"]]}>
          <div onClick={toHome}>返回首页</div>
          <div onClick={toOn}>继续祈福</div>
        </div>
      );
    };

    const show = ref(true);

    const renderSharingPopup = () => {
      return (
        <Popup
          v-model:show={show.value}
          position="bottom"
          style={{ height: "30%" }}
          round
          duration={0}
        >
          <div class={style["p-img"]}>
            <img
              src={
                location.origin +
                (infoTypeData.shareImage || typeData.shareImage)
              }
            ></img>
          </div>
          <div class={style["p-close"]} onClick={() => (show.value = false)}>
            关闭
          </div>
        </Popup>
      );
    };

    return () => (
      <Page padding={0} class={style.bgImg} title="支付成功" headColor={"#fff"}>
        {renderTop()}
        {renderList()}
        {renderNotes()}
        {renderFoot()}
        {renderSharingPopup()}
      </Page>
    );
  },
});
