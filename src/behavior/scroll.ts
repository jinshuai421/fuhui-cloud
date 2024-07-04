
import { defineComponent, ExtractPropTypes, } from "vue"


const scrollProps = {
    /**
     * @description 监听元素的选择器
     */
    selector: {
        type: String,
        default: ''
    },
    /**
     * @description 距离底部多少像素触发scrollBottom
     */
    offsetBottom: {
        type: Number,
        default: 0
    },
    /**
     * @description 启用滚动监听
     */
    enableScroll: {
        type: Boolean,
        default: false
    }
}

type scrollProps = ExtractPropTypes<typeof scrollProps>

export const scrollBehavior = defineComponent({
    props: scrollProps,
    emits: ['scroll', 'scrollBottom'],
    mounted() {

        if (!this.enableScroll) return;
        this.addEventListener();


    },
    deactivated() {
        this.removeEventListener();
    },
    methods: {
        addEventListener() {
            const el = this.getScrollElement();
            if (!el) return;
            el.addEventListener('scroll', this.scrollHandler);
        },
        removeEventListener() {
            const el = this.getScrollElement();
            if (!el) return;
            el.removeEventListener('scroll', this.scrollHandler);
        },

        /**
         * @description 获取需要监听的滚动元素
         */
        getScrollElement(): HTMLElement | null {
            let el: HTMLElement | null;
            if (this.selector) {
                el = document.querySelector(this.selector);
            } else {
                el = this.$refs?.scrollElement as HTMLElement;
            }
            return el;

        },
        scrollHandler() {
            const el = this.getScrollElement();
            if (!el) return;
            const { scrollHeight, scrollTop, clientHeight } = el;

            if (scrollHeight - scrollTop - clientHeight - this.offsetBottom <= 0) {
                this.$emit('scrollBottom');
            }

            this.$emit('scroll', {
                scrollTop,
                scrollHeight,
                clientHeight,
            });
        }
    }
})