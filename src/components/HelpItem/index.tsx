import Card from "@/components/Card";

import style from "./index.module.less";
import { Dialog } from "vant";
import { defineComponent, onMounted, ref } from "vue";
import { HelpItemProps, helpTypeConfig, operateStateConfig } from "./types";
import VueRouter from "@/router";

export default defineComponent({
  props: {
    ...HelpItemProps,
  },
  emits: ["click"],
  setup(props, { emit }) {
    const isGrid = sessionStorage.getItem("hntUserType") === "2";
    const {
      createDate,
      questionDescription,
      type,
      operateState,
      id,
      subjectNum = 0,
    } = props.data;
    const helpType = helpTypeConfig.find((e) => e.value == type);
    const state = operateStateConfig.find((e) => e.value == operateState);

    const renderContent = () => {
      return (
        <div class={[style.centent]}>
          {helpType && (
            <img class={[style.centent_icon]} src={helpType.icon}></img>
          )}
          <div class={[style.centent_name]}>
            {questionDescription || (type == "4" && "预警处理")}
          </div>
          <div class={[style.centent_time]}>
            {moment(createDate).format("YYYY/MM/DD")}
          </div>
        </div>
      );
    };

    const footBtnConfig = () => {
      return [
        {
          show: !isGrid && props.data.operateState == "0",
          name: "撤销",
          onClick: () => {
            Dialog.confirm({
              title: "提示",
              message: `确认撤销${helpType?.text}申请？`,
              confirmButtonColor: "#0DBDA8",
            })
              .then(() => {
                emit("click", {
                  ...props.data,
                  isUndo: true,
                });
              })
              .catch(() => {
                // on cancel
              });
          },
        },
        {
          show: type !== "4",
          name: "查看",
          onClick: () => {
            emit("click", props.data);
          },
        },
        {
          show: type == "4",
          name: "处理",
          class: "processing",
          onClick: () => {
            VueRouter.push("/warningsubjectList?id=" + id);
          },
        },
      ].filter((e) => e.show);
    };

    const renderFoot = () => {
      return (
        <div class={style.foot}>
          {isGrid && helpType && (
            <div
              class={style.foot_type}
              style={{
                backgroundColor: helpType.bgColor,
                color: helpType.color,
              }}
            >
              {type === "4" ? `预计影响主体${subjectNum}家` : helpType.text}
            </div>
          )}
          {!isGrid && state && (
            <div
              class={style.foot_type}
              style={{
                backgroundColor: state.bgColor,
                color: state.color,
              }}
            >
              {state.text}
            </div>
          )}
          <div class={style.btns}>
            {footBtnConfig().map((item: any) => (
              <div onClick={item.onClick} class={[style[item.class]]}>
                {item.name}
              </div>
            ))}
          </div>
        </div>
      );
    };

    return () => (
      <Card style={{ paddingBottom: "0" }} class={[type == "4" && style.bg]}>
        {renderContent()}
        {renderFoot()}
      </Card>
    );
  },
});
