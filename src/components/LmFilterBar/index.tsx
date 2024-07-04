import { defineComponent } from "vue";
import style from "./index.module.less";
import * as Types from "./types";
import { SortData } from "./components/FilterItemSort/types";
import FilterItemSort from "./components/FilterItemSort";
import { FilterProps } from "@/components/Filter/types";

import FilterItemFilter from "./components/FilterItemFilter";
import { reportFilter } from "@/utils/aegis";

export default defineComponent({
  name: "Sort",
  props: {
    // 筛选配置
    config: {
      type: Array as () => Types.FilterBarConfig,
      default: () => [],
    },
    /**
     * 筛选是否置顶
     */
    top: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return Types.getState();
  },
  emits: ["change", "comfirm", "reset"],
  methods: {
    onClicktem(type: Types.FilterEffectType, index: number) {
      const { refs } = this;
      const { filterData } = this;
      if (type === Types.FilterEffectType.sort) {
        const { sort } = refs;
        for (let i = 0; i < sort.length; i++) {
          const item = sort[i];
          if (i === index) continue;
          item.hookClear();
          delete filterData[item.field];
        }

        console.log("onClicktem", this.filterData);
      } else if (type === Types.FilterEffectType.filter) {
        const { filter } = refs;
        for (let i = 0; i < filter.length; i++) {
          const item = filter[i];
          if (i === index) continue;

          item?.hookHidden?.();
        }
      }
    },
    onComfirm(data: any) {
      console.log("筛选条确认", data);
      reportFilter(data);
      this.$emit("comfirm", data);
    },
    /**
     * @description 清除条件
     *
     * @param {Types.FilterEffectType} type
     * @param {Types.EventValue} data
     */
    onClearItem(type: Types.FilterEffectType, data: Types.EventValue) {
      const { filterData } = this;

      const { field, value } = data;
      filterData[field] = value;
    },
    onChangeItem(type: Types.FilterEffectType, data: Types.EventValue) {
      const { filterData } = this;

      const { field, value } = data;
      filterData[field] = value;

      this.$emit("change", {
        type: Types.FilterEffectType.sort,
        data: filterData,
      });
    },
    onFilterChange(data: any) {
      console.log("FilterBar onFilterChange", data);
      this.$emit("change", { type: Types.FilterEffectType.filter, data });
    },
    onReset(data: any) {
      this.$emit("reset", { type: Types.FilterEffectType.filter, data });
    },

    renderItem(item: Types.FilterBarConfigItem, index: number) {
      if (item.type === Types.FilterEffectType.sort) {
        return (
          <FilterItemSort
            onChange={(value) =>
              this.onChangeItem(Types.FilterEffectType.sort, value)
            }
            onClear={(value) =>
              this.onClearItem(Types.FilterEffectType.sort, value)
            }
            onClick={(e: MouseEvent) =>
              this.onClicktem(Types.FilterEffectType.sort, index)
            }
            ref={($el: any) => (this.refs.sort[index] = $el)}
            title={item.title}
            data={item.data as SortData}
          />
        );
      } else if (item.type === Types.FilterEffectType.filter) {
        return (
          <FilterItemFilter
            onClick={(e: MouseEvent) =>
              this.onClicktem(Types.FilterEffectType.filter, index)
            }
            title={item.title}
            top={this.top}
            onChange={this.onFilterChange}
            onConfirm={this.onComfirm}
            onReset={this.onReset}
            config={item.data as FilterProps}
            ref={($el: any) => (this.refs.filter[index] = $el)}
          />
        );
      }
    },

    // 根据配置生成筛选选项
    // renderOptions() {
    //   return this.config.map((item, index) => {
    //     return (
    //       <div class={['flex--center--v']}>{this.renderItem(item, index)}</div>
    //     )
    //   })
    // }
  },
  render() {
    return (
      <div class={["flex--sa py-10", style["filter"]]}>
        {/* {this.renderOptions()} */}
      </div>
    );
  },
});
