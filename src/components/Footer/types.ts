import Icon1On from "./assets/icon1_on.png";
import Icon1 from "./assets/icon1.png";
import Icon2On from "./assets/icon2_on.png";
import Icon2 from "./assets/icon2.png";
import Icon3On from "./assets/icon3_on.png";
import Icon3 from "./assets/icon3.png";
import { isAlipayMiniProgram, isZLB } from "@/utils/env";

export interface TarItemData {
  /**
   * @description 默认图标
   *
   * @type {string}
   * @memberof TarItemData
   */
  icon: string;

  /**
   * @description 选中图标
   *
   * @type {string}
   * @memberof TarItemData
   */
  selectIcon: string;

  /**
   * @description 跳转路由
   *
   * @type {string}
   * @memberof TarItemData
   */
  // url: string;
  /**
   * @description 文字
   *
   * @type {string}
   * @memberof TarItemData
   */
  text: string;

  /**
   * @description 是否显示红点
   */
  isShowRedDot: boolean;
  badge: string;
}

let config: TarItemData[];

/**
 * @description 设置底部配置数据
 */
export const setConfig = (data: TarItemData[]) => {
  config = data;
};

export const setTabBarRedDot = (
  index: number,
  badge: string,
  isShow: boolean
) => {
  if (index >= 0 && index < config.length) {
    config[index].isShowRedDot = isShow;
    config[index].badge = badge;
  }
};

export { config };

export interface Data {
  /**
   * @description 当前选中
   */
  active: string;
  config: TarItemData[];
}

export const getState = () => {
  const config = [
    {
      icon: Icon1,
      selectIcon: Icon1On,
      text: "提交申请",
      id: "0",
      isShowRedDot: false,
      badge: "",
    },
    {
      icon: Icon2,
      selectIcon: Icon2On,
      text: "确认灾情",
      id: "1",
      isShowRedDot: false,
      badge: "",
    },
    {
      icon: Icon3,
      selectIcon: Icon3On,
      text: "已解决",
      id: "2",
      isShowRedDot: false,
      badge: "",
    },
  ];

  // if (import.meta.env.VITE_ZLB || isZLB || isAlipayMiniProgram) {
  //     config.splice(2, 1)
  // }

  return {
    active: "0",
    config,
  };
};
