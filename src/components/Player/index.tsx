import {
  defineComponent,
  onMounted,
  ref,
  onDeactivated,
  getCurrentInstance,
} from "vue";
import { PlayerProps } from "./types";
import style from "./index.module.less";
import Hls from 'hls.js'

export default defineComponent({
  props: PlayerProps,
  emits: ["update:show", "click"],
  setup(props, { expose }) {
    let player: any = null;
    const { proxy } = getCurrentInstance() as any;
    const newHls = ref<any>(null);

    onMounted(() => {
      init();
      createPlayer();
    });

    onDeactivated(() => {
      stopPlay();
    });

    const init = () => {
      // 设置播放容器的宽高并监听窗口大小变化
      window.addEventListener("resize", () => {
        player.JS_Resize();
      });
    };
    const createPlayer = () => {
      player = new (window as any).JSPlugin({
        szId: "player",
        szBasePath: "./h5player",
        iMaxSplit: 4,
        iCurrentSplit: 1,
        openDebug: true,
        oStyle: {
          // borderSelect: '#000',
          ...props.oStyle,
        },
      });

      player.JS_SetWindowControlCallback({
        windowEventSelect: function (iWndIndex: any) {
          //插件选中窗口回调
          console.log("windowSelect callback: ", iWndIndex);
        },
        pluginErrorHandler: function (
          iWndIndex: any,
          iErrorCode: any,
          oError: any
        ) {
          //插件错误回调
          console.log("pluginError callback: ", iWndIndex, iErrorCode, oError);
        },
        windowEventOver: function (iWndIndex: any) {
          //鼠标移过回调
          //console.log(iWndIndex);
        },
        windowEventOut: function (iWndIndex: any) {
          //鼠标移出回调
          //console.log(iWndIndex);
        },
        windowEventUp: function (iWndIndex: any) {
          //鼠标mouseup事件回调
          //console.log(iWndIndex);
        },
        windowFullCcreenChange: function (bFull: any) {
          //全屏切换回调
          console.log("fullScreen callback: ", bFull);
        },
        firstFrameDisplay: function (
          iWndIndex: any,
          iWidth: any,
          iHeight: any
        ) {
          //首帧显示回调
          console.log(
            "firstFrame loaded callback: ",
            iWndIndex,
            iWidth,
            iHeight
          );
        },
        performanceLack: function () {
          //性能不足回调
          console.log("performanceLack callback: ");
        },
      });
    };

    const realplay = () => {
      if (props.playURL.includes(".m3u8")) {
        handlerZbVideo();
      } else {
        const index = player.currentWindowIndex;
        const mode = 1;
        // const playURL = urls.realplay
        const playURL = props.playURL;
        player.JS_Play(playURL, { playURL, mode }, index).then(
          () => {
            openSound();
          },
          (e: any) => {
            console.error(e);
          }
        );
        player;
      }
    };

    // m3u8暂停
    const cancelVideo = () => {
      if (newHls.value) {
        proxy.$refs["jkVideo"].pause();
        newHls.value.destroy();
        newHls.value = null;
      }
    };
    const handlerZbVideo = () => {
      let datas = props.playURL;
      const jkVideos = "jkVideo";
      let oVideo = proxy.$refs[jkVideos] as HTMLVideoElement;

      if (oVideo && datas) {
        if (Hls.isSupported()) {
          let hls = new Hls();
          newHls.value = hls;
          newHls.value.loadSource(datas);
          newHls.value.attachMedia(oVideo as any);
          newHls.value.on(Hls.Events.MANIFEST_PARSED, function () {
            oVideo.play();
          });
        } else if (oVideo.canPlayType("application/vnd.apple.mpegurl")) {
          // canPlayType() 方法浏览器是否能播放指定的音频/视频类型。
          oVideo.src = datas;
          oVideo.addEventListener("canplay", function () {
            oVideo.play();
          });
        }

        // // IOS微信端视频自动播放
        // function handlerDoPlay() {
        //     WeixinJSBridge.invoke('getNetworkType', {}, function () {
        //         oVideo.play()
        //     })
        // }
        // if (window.WeixinJSBridge) {
        //     handlerDoPlay()
        // } else {
        //     document.addEventListener(
        //         'WeixinJSBridgeReady',
        //         function () {
        //             handlerDoPlay()
        //         },
        //         false
        //     )
        // }
      }
    };

    const stopPlay = () => {
      if (props.playURL.includes(".m3u8")) {
        cancelVideo();
      } else {
        player.JS_Stop().then(
          () => {
            console.log("stop realplay success");
          },
          (e: any) => {
            console.error(e);
          }
        );
      }
    };

    const openSound = () => {
      player.JS_OpenSound().then(
        () => {
          console.log("openSound success");
        },
        (e: any) => {
          console.error(e);
        }
      );
    };

    expose({
      realplay,
      stopPlay,
    });

    return () => (
      <div style={{ width: "100%", height: "100%" }}>
        {!props.playURL.includes(".m3u8") && (
          <div id="player" class={[style["player"]]}></div>
        )}
        {props.playURL.includes(".m3u8") && (
          <video
            ref={`jkVideo`}
            id="player"
            controls
            autoplay={true}
            playsinline={true}
            webkit-playsinline="true"
            x5-playsinline="true"
            class={[style["player"]]}
            style={{ width: "100%", height: "100%", background: "#000" }}
          ></video>
        )}
      </div>
    );
  },
});
