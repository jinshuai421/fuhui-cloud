import { defineComponent } from "vue";


export const listCacheBehavior = defineComponent({
    data() {
        return {
            cacheList: null as any,
            scrollTop: 0,
        }
    },
    activated() {
        console.log('activated', ...arguments)
        const list = this.getListElement()
        list.scrollTop = this.scrollTop

    },
    mounted() {

        const list = this.getListElement()
        list.addEventListener('scroll', this.onScrollList)

    },
    beforeUnmount() {
        const list = this.getListElement()
        list.removeEventListener('scroll', this.onScrollList)
    },
    methods: {
        getListElement() {
            return this.$refs.cacheList as Element;
        },
        onScrollList(e: Event) {
            const list = this.getListElement()
            this.scrollTop = list.scrollTop

        },
    }

})