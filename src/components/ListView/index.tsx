import { defineComponent, KeepAlive } from "vue";
import style from "./index.module.less";

// import Empty from "@/components/emptyPage";

import { Empty, List } from "vant";

import { getDataset } from "@/utils/helper";
import { toColdDetail } from "@/utils/navigation";
import { getState, getPage, ListProps } from "./types";
import { listCacheBehavior } from "@/behavior/listCache";
export default defineComponent({
  props: ListProps,
  name: "list-page",
  data() {
    return getState.call(this);
  },
  mixins: [listCacheBehavior],
  emits: ["count", "otherData"],
  created() {
    this.params = {
      ...this.params,
      ...this.paramsVal,
    };
    getPage.call(this, this.params, this.url);
  },

  deactivated() {},

  watch: {},

  methods: {
    onInit() {
      this.params.pageNo = 0;
      this.finished = false;
      this.loading = false;
      this.data = [];
      this.params = {
        ...this.params,
        ...this.paramsVal,
      };

      getPage.call(this, this.params, this.url);
    },

    onComplete() {},
    /**
     * @description 加载事件
     */
    onLoad() {
      if (this.loading) return;
      this.loading = true;

      getPage.call(this, this.params, this.url);
    },

    onClickListItem(e: MouseEvent) {
      const id = getDataset(e, "id");
      if (!id) return;

      // toColdDetail(id);
    },
  },
  render() {
    return (
      <div
        onClick={this.onClickListItem}
        ref="cacheList"
        class={["list__selector", style["list"], "scroll__bar--clear"]}
      >
        {!!this.data.length && (
          <List
            v-model={this.loading}
            finished-text={this.finishedText}
            onLoad={this.onLoad}
            finished={this.finished}
          >
            {this.data.map((item: any, index: any) =>
              this.renderItem(item, index)
            )}
          </List>
        )}
        {!this.data.length && this.isEmpty && (
          // <Empty isHome={this.isHome}></Empty>
          <Empty image-size="160px" description="暂无数据" />
        )}
      </div>
    );
  },
});
