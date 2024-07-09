import Page from "@/components/Page";

import style from "./index.module.less";

import VueRouter from "@/router";
import { Field, Tab, Tabs, Checkbox, Toast, Popup, NumberKeyboard } from "vant";
import {
  computed,
  defineComponent,
  handleError,
  onMounted,
  reactive,
  ref,
  nextTick,
} from "vue";
import {
  busxConfig,
  svgArrowR,
  svgDenIcon,
  svgLhIcon,
  svgTabtive,
  tabsConfig,
  typeConfig,
  typeConfigState,
} from "./type";
import { svgClose } from "../selectBit/types";
import { getConfigApi, setCreateOrderApi, setPayOrderApi } from "@/api";
import { useRoute } from "vue-router";
import { getDoLoginWxApi, getLoginWxApi } from "@/api/login";
import { setToken } from "@/state/user";
import { getAmountChinese } from "@/utils/utils";

export default defineComponent({
  setup(props, {}) {
    const route = useRoute();
    // const type = "5";
    // const typeData: typeConfigState =
    //   typeConfig.find((e) => e.type == type) || ({} as any);
    const typeData = reactive<any>({});

    const formData = reactive({
      name: "",
      phone: "",
      blessing: "",
      orderPrice: "50",
    });
    const checked = ref(false);
    const itemWidth = ref<any>("100%");

    const showPopup = ref(false);

    const { type }: any = route.query;
    const { search } = window.location;
    const params: any = new URLSearchParams(search);
    const state = params.get("state") || "";
    const code = params.get("code") || "";

    onMounted(async () => {
      if (state && code) {
        await getLoginWxApi({ state, code }).then((res) => {
          setToken(res.tokenValue);
          const reorderUrl: any = localStorage.getItem("reorderUrl");
          location.replace(reorderUrl);
        });
      } else {
        getConfigApi(type).then((res) => {
          // localStorage.setItem(
          //   "fuhui",
          //   JSON.stringify({
          //     type,
          //     href: location.href,
          //   })
          // );
          Object.assign(typeData, res);
          console.log(typeData, "typeData");
          if (res.code === "GDX") {
            nextTick(() => {
              itemWidth.value =
                (document.querySelector(".scroll-item") as any).offsetWidth -
                (document.querySelector(".scroll") as any).offsetWidth;
            });
          }
        });
      }
    });

    const renderTopContent = () => {
      return (
        <div class={[style.top]}>
          <img
            class={[style.top_img]}
            src={location.origin + typeData.backgroundImage}
          ></img>
          <div class={[style.txt]}>
            <div class={[style.txt_l]}>
              <div>{typeData.name}</div>
              <div class={style.txt_b}>
                <div>{typeData.introduce}</div>
                <div
                  class={[style.txt_a]}
                  onClick={() => (showIntroduce.value = true)}
                >
                  <span>查看介绍</span>
                  {svgArrowR()}
                </div>
              </div>
            </div>
          </div>
        </div>
      );
    };

    const handleSelect = (data: any) => {
      VueRouter.push(`/selectBit?type=${data.code}`);
    };

    const renderSelectType = () => {
      return (
        <div class={[style.select_box]}>
          <div class={[style.h3]}>选择类型</div>
          {(typeData.lightingTypeList || []).map((item: any) => {
            return (
              <div class={[style.select_li]} onClick={() => handleSelect(item)}>
                <div class={[style.select_li_l]}>
                  <div>{item.name}</div>
                  {item.lightingUsableNum !== undefined && (
                    <div>剩余数量{item.lightingUsableNum}</div>
                  )}
                </div>
                <div class={[style.select_li_r]}>{item.buttonName}</div>
              </div>
            );
          })}
          <div class={[style.zf]}>
            {svgDenIcon()}
            <span>{typeData.phrase}</span>
          </div>
        </div>
      );
    };

    const active = ref("1");

    const renderTabs = () => {
      return (
        <div class={[style.tabs_box]}>
          <div class={[style.tabs]}>
            {tabsConfig.map((tab) => {
              return (
                <div
                  class={[style.tab, active.value == tab.value && style.on]}
                  onClick={() => {
                    active.value = tab.value;
                  }}
                >
                  <div class={[style["tive"]]}>{svgTabtive()}</div>
                  <div class={[style["tab_name"]]}>{tab.label}</div>
                </div>
              );
            })}
          </div>
          {active.value === "1" && renderDynamic()}
          {active.value === "2" && renderListOfMerit()}
        </div>
      );
    };

    const renderDynamic = () => {
      return (
        <div class={style["dynamic"]}>
          {(typeData.partDynamicList || []).map((item: any) => {
            return (
              <div class={style["item"]}>
                <div class={style["item_info"]}>
                  <div class={style["item_info_left"]}>
                    <div class={style["item_info_img"]}>
                      {item.headimgurl && <img src={item.headimgurl} alt="" />}
                    </div>
                    <div class={style["item_info_i"]}>
                      <div class={style["item_info_i_n"]}>
                        <p>{item.nickname}</p>
                        <span>居士</span>
                      </div>
                      <div class={style["item_info_i_t"]}>
                        {moment(item.createDate).format("YYYY-MM-DD")}
                      </div>
                    </div>
                  </div>
                  <div class={style["item_info_r"]}>
                    {svgLhIcon()}
                    <span>{item.price}元</span>
                  </div>
                </div>
                <div class={style["item_txt"]}>{item.blessing}</div>
              </div>
            );
          })}
        </div>
      );
    };

    const renderListOfMerit = () => {
      return (
        <div class={[style.merit]}>
          {(typeData.meritList || []).map((item: any) => {
            return (
              <div class={style["item"]}>
                <div class={style["item_l"]}>
                  <div class={style["item_img"]}>
                    <img src={item.headimgurl} alt="" />
                  </div>
                  <div class={style["item_i"]}>
                    <div class={style["item_i_n"]}>
                      <p>{item.nickname}</p>
                      <span>居士</span>
                    </div>
                  </div>
                </div>
                <div class={style["item_r"]}>
                  {svgLhIcon()}
                  <span>{item.price}元</span>
                </div>
              </div>
            );
          })}
        </div>
      );
    };

    const renderGongdb = () => {
      return (
        <div class={[style["gongdb"]]}>
          <div class={[style["gongdb_h3"]]}>
            <span>功</span>
            <span>德</span>
            <span>簿</span>
          </div>
          <div class={[style["gongdb_r_box"], "scroll"]}>
            <div
              class={[style["gongdb_r"], "scroll-item"]}
              style={
                (typeData.meritList || []).length > 15
                  ? {
                      width: `${itemWidth.value}px`,
                      animationDuration: `${itemWidth.value / 38}s`,
                    }
                  : {}
              }
            >
              {(typeData.meritList || []).map((item: any) => {
                return (
                  <div>
                    <div>{item.nickname}</div>
                    <div>{getAmountChinese(item.price)}</div>
                  </div>
                );
              })}
              {(typeData.meritList || []).length > 15 &&
                (typeData.meritList || []).slice(0, 15).map((item: any) => {
                  return (
                    <div>
                      <div>{item.nickname}</div>
                      <div>{getAmountChinese(item.price)}</div>
                    </div>
                  );
                })}
            </div>
          </div>
        </div>
      );
    };

    const busxActive = ref("1");

    const renderBusx = () => {
      return (
        <div class={[style["card"], style["busx"]]}>
          <div class={style["h3"]}>布施箱</div>
          <div class={[style.ul]}>
            {busxConfig.map((e: any) => {
              return (
                <div
                  class={[style.li, e.id === busxActive.value && style.on]}
                  onClick={() => {
                    formData.orderPrice = e.value;
                    busxActive.value = e.id;
                  }}
                >
                  {e.label}
                </div>
              );
            })}
          </div>
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
          <div class={[style["input"], style["content"]]}>
            <div>祈福语</div>
            <Field
              v-model={formData.blessing}
              label-width="50px"
              maxlength={200}
              rows={6}
              type="textarea"
              placeholder="请输入您的心愿不超过200个字"
            />
          </div>
        </div>
      );
    };

    const handleSubmit = (type = false) => {
      if (busxActive.value === "4") {
        if (!formData.orderPrice && type) {
          Toast("请先填入随缘乐捐");
          return;
        } else if (type) {
          createOrder();
        } else {
          showPopup.value = true;
        }
        return;
      }
      createOrder();
    };

    const createOrder = () => {
      const params = {
        code: type,
        anonymity: +checked.value,
        ...formData,
      };
      setCreateOrderApi(params).then((res) => {
        setTimeout(() => {
          setPayOrderApi({
            ...params,
            orderId: res.id,
            orderCode: res.orderCode,
          }).then((e) => {
            function onBridgeReady() {
              WeixinJSBridge.invoke(
                "getBrandWCPayRequest",
                {
                  ...e,
                },
                function (res: any) {
                  if (res.err_msg == "get_brand_wcpay_request:ok") {
                    // 使用以上方式判断前端返回,微信团队郑重提示：
                    //res.err_msg将在用户支付成功后返回ok，但并不保证它绝对可靠。
                    showPopup.value = false;
                    VueRouter.push(
                      `/successPayment?orderId=${res.id}&type=${type}`
                    );
                  }
                  if (res.err_msg == "get_brand_wcpay_request:fail") {
                    Toast("支付失败");
                  }
                }
              );
            }
            if (typeof WeixinJSBridge == "undefined") {
              if ((document as any).addEventListener) {
                (document as any).addEventListener(
                  "WeixinJSBridgeReady",
                  onBridgeReady,
                  false
                );
              } else if ((document as any).attachEvent) {
                (document as any).attachEvent(
                  "WeixinJSBridgeReady",
                  onBridgeReady
                );
                (document as any).attachEvent(
                  "onWeixinJSBridgeReady",
                  onBridgeReady
                );
              }
            } else {
              onBridgeReady();
            }
          });
        }, 500);
      });
    };

    const renderBtn = () => {
      return (
        <div class={style["btn"]} onClick={() => handleSubmit(false)}>
          布施功德
        </div>
      );
    };

    const renderSYPopup = () => {
      return (
        <Popup
          v-model:show={showPopup.value}
          round
          position="bottom"
          style={{ height: "450px" }}
          class={[style.popup]}
        >
          <div class={[style["popup_t"]]}>
            随缘乐捐
            <div
              class={[style["popup_close"]]}
              onClick={() => (showPopup.value = false)}
            >
              {svgClose()}
            </div>
          </div>
          <div class={[style.border_b, style.input]}>
            {/* <Field v-model={formData.num} type="digit" /> */}
            <div>{formData.orderPrice}</div>
          </div>
          <NumberKeyboard
            show={true}
            extra-key="⌫"
            theme="custom"
            close-button-text="完成"
            onInput={(val) => {
              console.log(val);
              if (val === "⌫" && formData.orderPrice) {
                formData.orderPrice = formData.orderPrice.slice(
                  0,
                  formData.orderPrice.length - 1
                );
              } else if (val !== "⌫") {
                formData.orderPrice = formData.orderPrice + val;
                if (+formData.orderPrice > 9999999) {
                  formData.orderPrice = "9999999";
                }
              }
            }}
            // onDelete="onDelete"
          />
          <div class={[style["popup_f"]]}>
            <div onClick={() => (showPopup.value = false)}>取消</div>
            <div onClick={() => handleSubmit(true)}>确定</div>
          </div>
        </Popup>
      );
    };

    const showIntroduce = ref(false);

    const renderIntroducePopup = () => {
      return (
        <Popup
          v-model:show={showIntroduce.value}
          position="bottom"
          round
          duration={0}
          class={[style.popup]}
        >
          <div class={[style["popup_t"]]}>
            介绍
            <div
              class={[style["popup_close"]]}
              onClick={() => (showIntroduce.value = false)}
            >
              {svgClose()}
            </div>
          </div>
          <div class={[style.introduce]}>{typeData.introduce}</div>
        </Popup>
      );
    };

    const renderContent = () => {
      switch (typeData.code) {
        case "GDX":
          return (
            <div>
              <div class={[style.zf1]}>
                {svgDenIcon()}
                <span>鎏金莲花灯 - 祝家里的人幸福健康</span>
              </div>
              {renderGongdb()}
              {renderBusx()}
              {renderForm()}
              {renderBtn()}
              {renderSYPopup()}
            </div>
          );
        default:
          return (
            <div>
              {renderSelectType()}
              {renderTabs()}
            </div>
          );
      }
    };

    return () => (
      <Page
        padding={0}
        class={style.bgImg}
        isHead={false}
        isBack={false}
        isTran={true}
        bgColor="rgb(250, 250, 250)"
      >
        {renderTopContent()}
        {renderContent()}
        {renderIntroducePopup()}
      </Page>
    );
  },
});
