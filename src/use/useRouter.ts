import { setPageEnterTime } from "@/state";
import { getZLBUserInfo } from "@/state/user";
import { getPageStayTime, reportPageJump } from "@/utils/aegis";
import { pickUserName, sendPV } from "@/utils/buried";
import { ref } from "vue";
import { Router } from "vue-router";


export const cacheRoute = ref<string[]>([
    // '首页',
    // '文章列表',
    // '文章详情',
    // '党员详情',
])


export const initRouter = (router: Router) => {
    router.beforeEach((to, from, next) => {

        const zlbUserInfo = getZLBUserInfo()
        if (zlbUserInfo) {
            pickUserName(zlbUserInfo)
            sendPV({})
        }

        reportPageJump(from?.name as string || '', to.name as string);
        setPageEnterTime()

        //从cacheList中的任何一个页面返回，当前页面缓存
        const cacheList = cacheRoute.value
        const fromName = from.name as string
        // 需要清除缓存的页面
        const clearRouter = to.meta.clearRouter as string[] || [] as string[]

        if (clearRouter.includes(fromName)) {
            to.meta.keepAlive = false
        } else
            if (cacheList.indexOf(from.name as string) > -1) {
                to.meta.keepAlive = true
                console.log('缓存')
            } else {
                //解决第一次不缓存问题
                if (from.name) {
                    to.meta.keepAlive = false
                } else {
                    to.meta.keepAlive = true
                }
            }

        next()
    })
}


