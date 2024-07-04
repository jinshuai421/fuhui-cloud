import { PropType } from "vue";

import IconB from "./assets/icon_b.png";
import IconJ from "./assets/icon_j.png";
import IconW from "./assets/icon_w.png";
import IconY from "./assets/icon_y.png";

export const HelpItemProps = {
  data: {
    type: Object,
    default: () => {},
  },
};

export type HelpItemProps = PropType<typeof HelpItemProps>;

export interface HelpConfigState {
  value: string;
  icon?: string;
  text: string;
  bgColor: string;
  color: string;
}

/**
 * @description 帮扶类型
 */
export const helpTypeConfig: Array<HelpConfigState> = [
  {
    value: "1",
    icon: IconJ,
    text: "灾害救援",
    bgColor: "rgba(223,82,56,0.1)",
    color: "#DF5238",
  },
  {
    value: "2",
    icon: IconB,
    text: "帮扶申请",
    bgColor: "rgba(255,138,0,0.1)",
    color: "#FF8A00",
  },
  {
    value: "3",
    icon: IconW,
    text: "线上收储",
    bgColor: "rgba(13,189,168,0.1)",
    color: "#0DBDA8",
  },
  {
    value: "4",
    icon: IconY,
    text: "预警处理",
    bgColor: "rgba(231,26,25,0.1)",
    color: "#E71A19",
  },
];

/**
 * @description 状态
 */
export const operateStateConfig: Array<HelpConfigState> = [
  {
    value: "0",
    text: "提交申请",
    bgColor: "rgba(255,138,0,0.1)",
    color: "#FF8A00",
  },
  {
    value: "1",
    text: "确认灾情",
    bgColor: "rgba(255,138,0,0.1)",
    color: "#FF8A00",
  },
  {
    value: "2",
    text: "已解决",
    bgColor: "rgba(13,189,168,0.1)",
    color: "#0DBDA8",
  },
  {
    value: "3",
    text: "已驳回",
    bgColor: "rgba(223,82,56,0.1)",
    color: "#DF5238",
  },
  {
    value: "4",
    text: "已撤销",
    bgColor: "rgba(153, 153, 153,0.1)",
    color: "#999999",
  },
];
