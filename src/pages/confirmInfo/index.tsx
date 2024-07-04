import Page from "@/components/Page";
import Card from "@/components/Card";
import Notice, { NoticeListState } from "@/components/Notice";
import Title from "@/components/Title";
import HelpItem from "@/components/HelpItem";

import style from "./index.module.less";

import BG from "./assets/bg.png";

import VueRouter from "@/router";
import Router, { getCurrentRouter } from "@/router/index";

import { Col, Row, Icon, Popup, Toast, Field, Checkbox, CountDown } from "vant";
import { defineComponent, reactive, onMounted, ref } from "vue";
import { selectConfig, svgClose, svgIcon, svgSelectOn } from "./types";
import { useRoute } from "vue-router";
import { getOrderInfoApi, getSecondApi, setPayOrderApi } from "@/api";

export default defineComponent({
  setup(props, {}) {
    const formData = reactive<any>({
      name: "",
      phone: "",
    });
    const infoData = reactive<any>({});
    const checked = ref(false);

    const route = useRoute();
    const { orderId, type } = route.query;

    onMounted(() => {
      getOrderInfoApi(orderId).then((res) => {
        Object.assign(formData, res);
      });
      getSecondApi(type).then((res) => {
        Object.assign(infoData, res);
      });
    });

    const handlePay = () => {
      const params = {
        ...formData,
        anonymity: +checked.value,
      };
      setPayOrderApi(params).then((res) => {
        VueRouter.push(`/successPayment?orderId=${orderId}&type=${type}`);
      });
    };

    const renderTop = () => {
      const time =
        moment(formData.createTime).subtract(-30, "minute").valueOf() -
        moment().valueOf();
      return (
        <div class={[style.top]}>
          <div class={[style["top-l"]]}>
            <p>剩余支付时间</p>
            <div>
              <CountDown
                time={time}
                format="mm:ss"
                onFinish={() => {
                  VueRouter.push(`/selectBit/${infoData.code}`);
                }}
              />
            </div>
          </div>
          <div class={[style["top-r"]]}>
            为避免长期占用名额
            <br />
            会为您保留30分钟还请谅解
          </div>
        </div>
      );
    };

    const renderList = () => {
      return (
        <div class={[style.blessing]}>
          {(formData.orderDetailList || []).map((item: any) => {
            return (
              <div class={[style["blessing-li"]]}>
                <div class={[style["blessing-li-t"]]}>
                  <div>{infoData.name}</div>
                  <div>
                    {item.row}排{item.col}列
                  </div>
                </div>
                <div class={[style["blessing-li-b"]]}>
                  <p>
                    供奉时长：
                    {`${
                      ["半年", "永久"].includes(item.paymentCategoryName)
                        ? ""
                        : 1
                    }${item.paymentCategoryName}`}
                  </p>
                  <p>合计{item.price.toFixed(2)}</p>
                </div>
                <div class={[style["blessing-li-b"]]}>
                  <p>祈福心愿</p>
                  <p>{item.blessing}</p>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const renderForm = () => {
      return (
        <div class={[style["form"], style["card"]]}>
          <div class={style["h3"]}>功德主联系人</div>
          <div class={style["input"]}>
            <div>姓名</div>
            <Field
              v-model={formData.name}
              label-width="50px"
              placeholder="请输入您的姓名"
            />
          </div>
          <div class={style["input"]}>
            <div>手机</div>
            <Field
              v-model={formData.phone}
              label-width="50px"
              maxlength={11}
              type="number"
              placeholder="用于寺院与您联系"
            />
          </div>

          <div class={style["form_check"]}>
            <Checkbox
              v-model={checked.value}
              shape="square"
              checked-color="#d0a17d"
              icon-size="18px"
            >
              匿名
            </Checkbox>
          </div>
        </div>
      );
    };

    const renderNotes = () => {
      return (
        infoData.guide && (
          <div class={[style["notes"], style["card"]]}>
            <div class={[style["h3"], style["border_b"]]}>祈福须知</div>
            <div class={[style["notes-c"]]} v-html={infoData.guide}></div>
          </div>
        )
      );
    };

    const renderFoot = () => {
      return (
        <div class={[style["foot"]]}>
          <div>
            合计：<span>￥{(formData.orderPrice || 0).toFixed(2)}</span>
          </div>
          <div onClick={handlePay}>确认支付</div>
        </div>
      );
    };

    return () => (
      <Page padding={0} class={style.bgImg} title="确认信息" headColor={"#fff"}>
        {renderTop()}
        {renderList()}
        {renderForm()}
        {renderNotes()}
        {renderFoot()}
      </Page>
    );
  },
});
