import { defineComponent } from "vue";
import style from "./index.module.less";
import { Tabbar, TabbarItem } from "vant";
import { setConfig, getState } from "./types";
import { isSimulator } from "@/utils/simulator";

export default defineComponent({
  data() {
    return getState();
  },
  emits: ["active"],
  created() {
    setConfig(this.config);
    // for (let item of this.config) {
    //   if (this.getIsSelect(item.url)) {
    //     if (item.url.startsWith("/")) {
    //       this.activeUrl = item.url;
    //     }
    //   }
    // }
    this.active = sessionStorage.getItem("active") || "0";
  },

  methods: {
    /**
     * @description 判断是否选中
     *
     */
    getIsSelect(path: string) {
      const { hash } = location;
      const url = hash.match(/#(.*)\?/)?.[0] || "/";
      return url === path;
    },
    onChangeBefore(name: string) {
      this.$emit("active", name);

      const item: any = this.config.find((item) => item.text === name);

      if (item?.click) {
        item.click();
        return false;
      }

      return true;
    },
    renderTarItem() {
      return this.config.map((item) => {
        return (
          <TabbarItem
            v-slots={{
              icon: ({ active }: { active: boolean }) => {
                return <img src={active ? item.selectIcon : item.icon} />;
              },
            }}
            badge={item.badge || ""}
            // to={item.url}
            name={item.id}
          >
            {item.text}
          </TabbarItem>
        );
      });
    },
  },
  render() {
    return (
      <Tabbar
        v-model={this.active}
        class={[style["tabbar"], style["tabbar--simulator"]]}
        fixed
        border={false}
        // route
        placeholder
        active-color="#0DBDA8"
        inactive-color="#323232"
        beforeChange={this.onChangeBefore}
        style="background-color: transparent;"
      >
        {this.renderTarItem()}
      </Tabbar>
    );
  },
});
