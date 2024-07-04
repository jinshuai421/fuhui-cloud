import { PropType } from "vue";

export const PlayerProps = {
  playURL: {
    type: String,
    default: ''
  },
  oStyle: {
    type: Object,
    default: {}
  }
};

export type PlayerProps = PropType<typeof PlayerProps>;
