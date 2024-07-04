import { ColdItemData, ButtonItem } from "@/components/ColdListItem/types";
import { getCurrentLocation } from "@/utils/helper";
import { getAction } from "@/command/netTool";
import { ButtonType } from "@/components/Button/types";
import { ComponentCustomProperties, ExtractPropTypes, PropType } from "vue";

export const ListProps = {
  top: {
    type: Boolean,
    default: false,
  },
  url: {
    type: String,
    default: "",
  },
  renderItem: {
    type: Function,
    default: () => {},
  },
  finishedText: {
    type: String,
    default: "",
  },
  overflow: {
    type: String as PropType<"scroll" | "visible">,
    default: "scroll",
  },
  isHome: {
    type: Boolean,
    default: false,
  },
  paramsVal: {
    type: Object,
    default: () => {},
  },
  location: {
    type: Boolean,
    default: true,
  },
  isPosition: {
    type: Boolean,
    default: false,
  },
  isEmpty: {
    type: Boolean,
    default: true,
  },
};

export type ListProps = ExtractPropTypes<typeof ListProps>;

/**
 * @description 列表页数据
 *
 * @export
 * @interface Params
 */
export interface ListData {
  data: Array<any>;
  params: Params;
  listItemButton: Array<ButtonItem>;
  /**
   * @description 加载中
   *
   * @type {boolean}
   * @memberof ListData
   */
  loading: boolean;
  /**
   * @description 数据全部加载
   *
   * @type {boolean}
   * @memberof ListData
   */
  finished: boolean;
  // scrollTop: number

  $emit?: any;
}

export const getState = function (this: ComponentCustomProperties): ListData {
  return {
    data: [],
    listItemButton: [
      {
        type: ButtonType.phone,
      },
    ],
    params: {
      pageNo: 0,
      pageSize: 10,
    },
    loading: false,
    finished: false,
  };
};

interface Params {
  pageNo: number;
  pageSize: number;

  __ajax?: string;
}

/**
 * @description 分页查询
 *
 * @param {boolean} [isWxConfig=false] 微信jsssdk是否可用
 */
export const getPage = async function (
  this: ListData & ListProps,
  params: Params,
  url: string
) {
  params.__ajax = "json";

  if (this.finished) return;
  this.params.pageNo++;

  const newParams: any = {};

  const keys = Object.keys(params) as any;
  for (let key of keys) {
    const item = (params as any)[key];
    if (!["", null, undefined].includes(item)) {
      newParams[key] = item;
    }
  }

  const resData: any = await getAction(url, newParams);

  resData.records = resData.records || resData.list ;


  // 列表情况
  if (!resData.records) {
    this.data.push(...(resData || []));
    this.finished = true;
    this.loading = false;
    return;
  }

  // 分页情况
  if (resData.records.length === 0) {
    console.log("全部加载");

    this.finished = true;
    this.loading = false;
    return;
  }

  const listdData = (resData.records || []).map((item: any) => item);

  this.$emit("count", resData.count);
  this.$emit("otherData", resData.otherData);
  this.data.push(...listdData);
  this.loading = false;
};
