import HomeImg from "./assets/home.png";
import SelectHomeImg from "./assets/home-select.png";
import ConsultImg from "./assets/mapimg.png";
import SelectConsultImg from "./assets/mapSelect.png";
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
  url: string;
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
}

let config: TarItemData[];

/**
 * @description 设置底部配置数据
 */
export const setConfig = (data: TarItemData[]) => {
  config = data;
};

export const setTabBarRedDot = (index: number, isShow: boolean) => {
  if (index >= 0 && index < config.length) {
    config[index].isShowRedDot = isShow;
  }
};

export { config };

export interface Data {
  /**
   * @description 当前选中链接
   */
  activeUrl: string;
  config: TarItemData[];
}

export const getState = () => {
  const config = [
    {
      icon: HomeImg,
      selectIcon: SelectHomeImg,
      url: "/lmIndex",
      text: "首页",
      isShowRedDot: false,
    },
    {
      icon: ConsultImg,
      selectIcon: SelectConsultImg,
      url: "/lmConsult",
      text: "咨询",
      isShowRedDot: false,
    },
  ];

  if (import.meta.env.VITE_ZLB || isZLB || isAlipayMiniProgram) {
    config.splice(2, 1);
  }

  return {
    activeUrl: "",
    config,
  };
};
