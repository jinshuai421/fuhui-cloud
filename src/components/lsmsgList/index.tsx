import { defineComponent } from "vue";
import style from "./index.module.less";
import { Picker, Popup, Toast, Field, Icon } from "vant";
import Button from "../Button";
export default defineComponent({
  props: {
    dataObj: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      itemObj: {},
    };
  },
  emits: ["refreshFn"],
  watch: {
    dataObj: {
      deep: true,
      immediate: true,
      handler(nVal) {
        this.itemObj = nVal;
      },
    },
  },
  methods: {
    refresh() {
      this.$emit("refreshFn");
    },
    onClickList(urlPrams: string) {
      this.$router.push("/lmMyJoinDetailQy?" + urlPrams);
    },
    RenderLists() {
      let item: any = this.itemObj;

      let urlPrams = `id=${item.id}&recordId=${item.recordId}`;
      if (item.identify) {
        urlPrams += `&identify=${item.identify}`;
      }
      return (
        <div class={style.card}>
          <div class={style.row1}>
            <div>申报通知</div>
            <div>
              <span>{item.startDate}</span>
            </div>
          </div>

          <div class={style.row2}>
            <div class={style.l_item}>
              <span class={style.label}>申请店铺</span>
              <span class={style.val}>宁波市腾强制冷有限公司</span>
            </div>
            <div class={style.l_item}>
              <span class={style.label}>冷库类型</span>
              <span class={style.val}>维修</span>
            </div>
            <div class={style.l_item}>
              <span class={style.label}>冷库容积·</span>
              <span class={style.val}>{item.rentArea}m³</span>
            </div>
          </div>
          <div class={style.row3}>
            <div class={style.col1} onClick={() => this.onClickList(urlPrams)}>
              查看申报详请 <Icon name="arrow" color="#5B6775" />
            </div>
            <div class={style.col2}>
              <Button class={style.lbtn}>拒绝</Button>
              <Button class={style.rbtn}>同意</Button>
            </div>
          </div>
        </div>
      );
    },
  },
  render() {
    return <div>{this.RenderLists()}</div>;
  },
});
