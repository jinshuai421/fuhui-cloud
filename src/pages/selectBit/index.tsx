import Page from "@/components/Page";
import Card from "@/components/Card";
import Notice, { NoticeListState } from "@/components/Notice";
import Title from "@/components/Title";
import HelpItem from "@/components/HelpItem";

import style from "./index.module.less";

import VueRouter from "@/router";
import Router, { getCurrentRouter } from "@/router/index";

import { Col, Row, Icon, Popup, Toast, Field } from "vant";
import {
  computed,
  defineComponent,
  handleError,
  onMounted,
  reactive,
  ref,
} from "vue";
import { selectConfig, svgClose, svgIcon, svgSelectOn } from "./types";
import { useRoute } from "vue-router";
import {
  getPriceApi,
  getSecondApi,
  getTypeApi,
  setCreateOrderApi,
} from "@/api";
import { getDoLoginWxApi } from "@/api/login";

export default defineComponent({
  setup(props, {}) {
    const route = useRoute();
    const { type }: any = route.params;
    const { isEwm }: any = route.query;
    const lightingTypeData = reactive<any>({});
    const priceTypeList = ref<any>([]);
    const seatList = ref<any>([]);

    const selectData = ref<any>([]);

    const isDen = ref(true);

    const xMax = computed(() => {
      let i = 0;
      for (let index in seatList.value) {
        if (seatList.value[index].col > i) {
          i = seatList.value[index].col;
        }
      }
      return i;
    });

    const yMax = computed(() => {
      let i = 0;
      for (let index in seatList.value) {
        if (seatList.value[index].row > i) {
          i = seatList.value[index].row;
        }
      }
      console.log(i, "yMax");
      return i;
    });

    onMounted(() => {
      if (isEwm) {
        localStorage.setItem(
          "fuhui",
          JSON.stringify({
            type,
            href: location.href,
          })
        );
      }
      getSecondApi(type).then((res) => {
        Object.assign(lightingTypeData, res);
        if (res.fillType == "1") {
          isDen.value = false;
        }
      });
      getPriceApi(type).then((res) => {
        priceTypeList.value = res;
      });
      getTypeApi(type).then((res) => {
        seatList.value = res;
      });
    });

    const handleSelect = (data: any) => {
      if (data.inUse == 0) {
        const i = selectData.value.findIndex((e: any) => e.id == data.id);
        if (i > -1) {
          selectData.value.splice(i, 1);
        } else {
          selectData.value.push(data);
        }
      }
    };

    const renderBit = () => {
      return (
        <div class={[style.bit]}>
          <div class={[style.bit_t]}>
            {selectConfig.map((item) => {
              return (
                <div class={[style.bit_t_l]}>
                  <div
                    class={[style.bit_t_l_k]}
                    style={{ backgroundColor: `${item.color}` }}
                  ></div>
                  <div>{item.label}</div>
                </div>
              );
            })}
          </div>

          <div class={[style.bit_s]}>
            {Array(yMax.value)
              .fill({})
              .map((r, i) => {
                return (
                  <Row justify="space-around">
                    {Array(xMax.value)
                      .fill({})
                      .map((c, z) => {
                        const obj =
                          seatList.value.find(
                            (e: any) => e.row == i + 1 && e.col == z + 1
                          ) || null;

                        const is = JSON.stringify(selectData.value).includes(
                          (obj || {}).id
                        );
                        if (!obj) {
                          console.log(i, z, "位置");
                        }
                        return (
                          <Col span={24 / xMax.value} style={{ flex: 1 }}>
                            {obj && (
                              <div
                                class={[style.bit_i]}
                                onClick={() => handleSelect(obj)}
                              >
                                {svgIcon(
                                  is
                                    ? "#BC1919"
                                    : obj.inUse == 0
                                    ? "#D0A17D"
                                    : "#ccc",
                                  351 / xMax.value > 24 ? 24 : 351 / xMax.value,
                                  lightingTypeData.icon
                                )}
                              </div>
                            )}
                          </Col>
                        );
                      })}
                  </Row>
                );
              })}
          </div>
        </div>
      );
    };

    const renderMain = () => {
      return (
        <div class={[style["main"]]}>
          {!!selectData.value.length && (
            <div class={[style["main_h"]]}>
              {lightingTypeData.icon == "1" ? "已选供灯" : "已选牌位"}
            </div>
          )}
          <div class={[style["main_on"]]}>
            {selectData.value.map((item: any, i: number) => {
              return (
                <div>
                  {item.row}排{item.col}列
                  <Icon
                    name="cross"
                    color="#D0A17D"
                    size={13}
                    onClick={() => {
                      selectData.value.splice(i, 1);
                    }}
                  />
                </div>
              );
            })}
          </div>
          {!!selectData.value.length && (
            <div class={[style["main_h"]]}>
              {isDen.value ? "供奉时长与心愿" : "供奉时长与逝者姓名"}
            </div>
          )}
          <div class={[style["main_ul"]]}>
            {selectData.value.map((item: any, i: number) => {
              return (
                <div
                  class={[style["main_ul_li"]]}
                  onClick={() => handleSet(item)}
                >
                  <div class={[style["main_ul_li_l"]]}>
                    <div>
                      {item.row}排{item.col}列
                    </div>
                    <div>{item.blessing}</div>
                  </div>
                  <div class={[style["main_ul_li_r"]]}>
                    {item.paymentCategoryName
                      ? `${
                          ["半年", "永久"].includes(item.paymentCategoryName)
                            ? ""
                            : 1
                        }${item.paymentCategoryName}`
                      : "请选择"}
                    <Icon name="arrow" color="#999999" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    };

    const popupData = ref<any>({
      blessing: "",
      col: null,
      deviceNumber: "",
      paymentCategoryCode: "",
      paymentCategoryName: "",
      price: "",
      row: null,
    });

    const handleSet = (data: any) => {
      show.value = true;
      popupData.value = data;
    };

    const show = ref(false);

    const message = ref("");

    const renderPopup = () => {
      return (
        <Popup
          v-model:show={show.value}
          round
          position="bottom"
          style={{ height: "83%" }}
          class={[style.popup]}
        >
          <div class={[style["popup_t"]]}>
            {popupData.value.row}排{popupData.value.col}列
            <div
              class={[style["popup_close"]]}
              onClick={() => (show.value = false)}
            >
              {svgClose()}
            </div>
          </div>
          <div class={[style["popup_b"]]}>
            <div class={[style["popup_s"]]}>
              <div class={[style["popup_s_t"]]}>供奉时长</div>
              <div class={[style["popup_s_l"]]}>
                {priceTypeList.value.map((item: any) => {
                  return (
                    <div
                      class={[
                        item.code == popupData.value.paymentCategoryCode &&
                          style.on,
                      ]}
                      onClick={() => {
                        popupData.value = {
                          ...popupData.value,
                          paymentCategoryCode: item.code,
                          paymentCategoryName: item.name,
                          price: item.price,
                        };
                      }}
                    >
                      <p>{item.name}</p>
                      <p>￥{item.price}</p>
                      {item.code == popupData.value.paymentCategoryCode && (
                        <div>{svgSelectOn()}</div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
            {isDen.value && (
              <div class={[style["popup_c"]]}>
                <Field
                  v-model={popupData.value.blessing}
                  rows="8"
                  autosize
                  type="textarea"
                  maxlength="200"
                  placeholder="请输入您的心愿不超过200个字"
                  // show-word-limit
                />
              </div>
            )}
            {!isDen.value && (
              <div class={[style["popup_input"]]}>
                <div class={[style["popup_input_t"]]}>逝者姓名</div>
                <Field
                  v-model={popupData.value.blessing}
                  maxlength="4"
                  placeholder="请输入逝者姓名"
                />
              </div>
            )}
          </div>
          <div class={[style["popup_f"]]}>
            <div onClick={() => (show.value = false)}>取消</div>
            <div
              onClick={() => {
                const i = selectData.value.findIndex(
                  (e: any) => e.id == popupData.value.id
                );

                selectData.value[i] = popupData.value;
                show.value = false;
              }}
            >
              确定
            </div>
          </div>
        </Popup>
      );
    };

    const handleConfirm = () => {
      const params = {
        code: type,
        orderDetailList: selectData.value,
      };
      setCreateOrderApi(params).then((res) => {
        VueRouter.push(`/confirmInfo?orderId=${res.id}&type=${type}`);
      });
    };

    const renderFoot = () => {
      return (
        <div class={[style["foot"]]}>
          <div onClick={handleConfirm}>恭请明灯</div>
        </div>
      );
    };

    return () => (
      <Page
        padding={0}
        class={style.bgImg}
        title={lightingTypeData.name}
        isBack={!isEwm}
      >
        {renderBit()}
        {renderMain()}
        {renderFoot()}

        {renderPopup()}
      </Page>
    );
  },
});
