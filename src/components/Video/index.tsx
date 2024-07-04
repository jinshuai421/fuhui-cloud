import { defineComponent, ref, watch } from "vue";
import style from "./index.module.less";
import Hls from "hls.js";
import { VideoProps, VideoState, VideoType } from "./types";
import moment from "moment";

export default defineComponent({
  props: VideoProps,
  emits: ["update:play", "end"],
  data(): VideoState {
    return {
      instance: null,
      showVideo: true,
      time: "",
      video: null,
      // 暂停
      isPause: !this.play,
    };
  },
  watch: {
    url(newValue) {
      const strategy: any = {
        m3u8: () => {
          if (Hls.isSupported()) {
            if (this.instance) {
              let hls = this.instance;
              hls.destroy();
            }

            this.initHls();
          }
        },
        mp4: () => {
          if (!this.video) return;
          this.video.src = newValue;
        },
        img: null,
      };

      strategy[this.type]();
    },
    play(val: boolean) {
      this.isPause = !val;

      const strategy = {
        m3u8: {
          play: () => {
            if (!this.video || !this.instance) return;
            this.instance.startLoad();
            this.video.play();
          },
          stop: () => {
            if (!this.video || !this.instance) return;

            this.instance.stopLoad();
            this.video.pause();
          },
        },
        mp4: {
          play: () => {
            (this.video as any).play();
          },
          stop: () => {
            (this.video as any).pause();
          },
        },
        img: {
          play: () => {},
          stop: () => {},
        },
      };

      const current = strategy[this.type];
      if (val) {
        current.play();
      } else {
        current.stop();
      }
    },
    poster(newValue: string) {
      if (!this.video) return;

      this.video.poster = newValue;
    },
  },
  mounted() {
    const strategy: Record<VideoType, any> = {
      img: this.initImg,
      mp4: this.initMp4,
      m3u8: this.initHls,
    };

    let type = this.type;

    if (this.mockTime) {
      type = "img";
    }

    strategy[type]();
  },
  deactivated() {
    if (this.instance) {
      this.instance.destroy();
    }
  },
  methods: {
    initImg() {
      this.showVideo = false;
      // const setTime = () => {
      //   this.time = moment(Date.now() - 5000).format("YYYY-MM-DD HH:mm:ss");
      // };

      // setInterval(setTime, 1000);
    },
    initMp4() {
      let video = this.$refs.video as any;
      let videoSrc = this.url;
      this.video = video;
      video.loop = true;

      const source = document.createElement("source");
      source.src = videoSrc;
      video.poster = this.poster;

      source.type = "video/mp4";
      video.append(source);
      if (this.play) {
        video.muted = false;
        video.autoplay = true;

        video.play();
      }
    },
    initHls() {
      let video = this.$refs.video as any;
      let videoSrc = this.url;
      if (!videoSrc) return;
      try {
        if (Hls.isSupported()) {
          let hls = new Hls();
          this.instance = hls;
          if (videoSrc) {
            this.load();
          }

          hls.on(Hls.Events.MANIFEST_PARSED, () => {
            console.log("加载成功");
            this.video = video;

            video.muted = true;
            if (this.play) {
              // debugger
              console.log("开始播放");
              video.play();
            }
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            console.log("加载失败", data);
          });

          hls.on(Hls.Events.BUFFER_EOS, () => {
            console.log("buffer即将清空");
            this.$emit("end");
          });
        }
      } catch (e) {
        console.log("video error", e);
      }
    },
    load() {
      if (!this.instance) return;
      let video = this.$refs.video;
      const hls = this.instance;
      hls.loadSource(this.url);
      hls.attachMedia(video);
    },
    onClickPlay() {
      if (this.disable) return;
      const video = this.$refs.video as any;

      if (this.type !== "img") {
        if (this.isPause) {
          video!.play();
          this.isPause = false;
        } else {
          video!.pause();
          this.isPause = true;
        }
      }

      this.$emit("update:play", !this.play);
    },
    onClickVideo() {
      this.onClickPlay();
    },
    renderTime() {
      return (
        <div class={["font--t5 text-white", style["time"]]}>{this.time}</div>
      );
    },
    renderImage() {
      return [
        this.renderTime(),
        <img class={[style["video"]]} src={this.url} />,
      ];
    },
    renderVideo() {
      return (
        <video
          onClick={this.onClickVideo}
          ref="video"
          class={[this.videoClassName, style["video"]]}
          style={{ objectFit: "contain" }}
        />
      );
    },

    renderPlayBtn() {
      // if (this.play) return;
      if (!this.isPause) return;
      return (
        <div class={[style["play"], "flex items-center justify-center"]}>
          <div
            onClick={this.onClickPlay}
            class={[this.playClassName || style["play__btn"]]}
          ></div>
        </div>
      );
    },
  },
  render() {
    return (
      <div class={[" relative", style["video"]]}>
        {this.renderTime()}
        {this.renderPlayBtn()}
        {this.showVideo ? this.renderVideo() : this.renderImage()}
      </div>
    );
  },
});
