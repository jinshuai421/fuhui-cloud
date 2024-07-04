import { defineComponent } from "vue";
import style from "./index.module.less";

import Page from "@/components/Page";
import Search from "@/components/Search";
import ListView from "@/components/ListView";
import { Toast } from "vant";

export default defineComponent({
  data() {
    return {
      isList: false,
      historyList: Array(1).fill("搜索热搜"),
    };
  },
  created() {},
  watch: {},
  methods: {
    onSearch(value: string) {
      // 搜索有内容显示列表
      if (value) {
        this.isList = true;
        this.$nextTick(() => {
          (this.$refs.ListView as any).params.name = value;
          (this.$refs.ListView as any).onInit();
        });
      } else {
        this.isList = false;
      }
    },
    handleHistory(item: any) {
      (this.$refs as any).search.value = item;
      this.onSearch(item);
    },
    renderSearch() {
      return (
        <Search
          ref="search"
          onSearch={this.onSearch}
          type="2"
          isScrub={true}
        ></Search>
      );
    },
    handleDelHistor() {
      Toast("暂无接口");
    },
    renderHistory() {
      if (this.isList) return;
      return (
        <div class={["my-20 mx-15", style.histor]}>
          <div class={style["histor_top"]}>
            <div class={["font--t6"]}>搜索历史</div>
            <div class={style.del} onClick={this.handleDelHistor}></div>
          </div>
          <div class={style.list}>
            {this.historyList.map((item, index) => (
              <span
                class={["font--t5 mt-10 mr-8"]}
                key={index}
                onClick={() => this.handleHistory(item)}
              >
                {item}
              </span>
            ))}
          </div>
        </div>
      );
    },
    renderList() {
      return (
        <ListView
          v-show={this.isList}
          ref="ListView"
          url="/api/h5/hospital/getHospitalList"
          class={"px-15"}
          // renderItem={(item: any, index: number) => (
         
          // )}
        ></ListView>
      );
    },
  },
  render() {
    return (
      <Page padding={"0 0 20px"}>
        {this.renderSearch()}
        {/* {this.renderHistory()} */}
        {this.renderList()}
      </Page>
    );
  },
});
