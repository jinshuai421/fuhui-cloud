import { createApp } from 'vue'
import 'virtual:svg-icons-register';
// import { Form } from 'ant-design-vue'
import App from './app'
import router from './router'
import { initTheme } from './theme/index'
import { decorateRouter } from './utils/zlb';
import { getAction } from "@/command/netTool";
import { toLogin } from './utils/navigation';
import { listenerUnload } from './utils/h5';
import { reportJumpOut } from './utils/aegis';
import { setPageEnterTime } from './state';
import { initTitle } from './utils/business';
import { init as initBuried, useManualExpose } from './utils/buried'
// import vconsole from 'vconsole'

// new vconsole()

const init = () => {
    initTitle()
    initBuried()
}

listenerUnload(() => {
    reportJumpOut()
}); 



(async () => {
        init()
        setPageEnterTime(0)
        // const res = await getAction("/gxlkApi/token/time").catch(err => err)
        // if (res) {
        //     decorateRouter(router)
        //     initTheme();
        //     const app = createApp(App)
        //     app.use(router).mount('#app')
        // } else {
        //     toLogin()
        // }
        // decorateRouter(router)
        initTheme();
        const app = createApp(App)
        app.use(router).mount('#app')
})()

