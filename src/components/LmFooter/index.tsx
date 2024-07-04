import { defineComponent } from "vue";
import style from "./index.module.less";
import { Tabbar, TabbarItem } from "vant";
import { setConfig, getState } from "./types";
import { isSimulator } from "@/utils/simulator";

export default defineComponent({
  data() {
    return getState();
  },
  created() {
    setConfig(this.config);
    for (let item of this.config) {
      if (this.getIsSelect(item.url)) {
        if (item.url.startsWith("/")) {
          this.activeUrl = item.url;
        }
      }
    }
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
      const item = this.config.find((item) => item.text === name);
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
            dot={item.isShowRedDot}
            to={item.url}
            name={item.text}
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
        class={[style["tabbar"], isSimulator() && style["tabbar--simulator"]]}
        fixed
        border={false}
        route
        placeholder
        beforeChange={this.onChangeBefore}
        v-model={this.activeUrl}
        style="background-color: transparent;"
      >
        {this.renderTarItem()}
      </Tabbar>
    );
  },
});
