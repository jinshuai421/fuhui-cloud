
import { defineComponent, KeepAlive } from "vue";

import "./app.less";
import { wxAuth } from "./utils/wx";


export default defineComponent({

  created() {
    // if (location.href.includes('zlb')) {
    //   localStorage.setItem('zlb', '1');
    // }
    // alert('31')
    wxAuth()
  },
  // template: `
  // <div class="app">
  // <router-view /> 
  // <router-view name="footer" />
  // </div>
  // `
  render() {
    return (
      <div class={'app'}>
        <router-view
          v-slots={{
            default: (routerData: any) => {
              const { Component, route } = routerData

              if (route.meta.keepAlive) {

                return (
                  <KeepAlive>
                    <Component
                      key={route.name}
                    >
                    </Component>
                  </KeepAlive>
                )
              }
              return (
                <Component
                  key={route.name}
                >
                </Component>

              )
            }
          }}>

        </router-view>





        <router-view name="footer" />
      </div>
    )
  }
})
