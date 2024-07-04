import { PropType, VideoHTMLAttributes } from "vue";

export type VideoType = 'mp4' | 'm3u8' | 'img'

export const VideoProps = {
    url: {
        type: String,
        default: ''
    },
    type: {
        type: String as PropType<VideoType>,
        default: 'm3u8'
    },
    mockTime: {
        type: Boolean,
        default: false
    },

    play: {
        type: Boolean,
        default: true
    },
    videoClassName: {
        type: String,
        default: ''
    },
    /**
     * @description 禁止点击
     */
    disable: {
        type: Boolean,
        default: false
    },
    playClassName: {
        type: String,
        default: ''
    },
    poster: {
        type: String,
        default: ''
    }
}

export type VideoProps = PropType<typeof VideoProps>;

export interface VideoState {
    instance: any;
    showVideo: boolean;
    time: string;
    video: null | HTMLVideoElement;
    isPause: boolean
}