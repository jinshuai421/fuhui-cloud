import { PropType } from "vue";
import type { UploaderFileListItem } from "vant";

export type FileType = "image" | "video" | "audio" | "file";

export const UploaderProps = {
  multiple: {
    type: Boolean,
    default: false,
  },
  /**
   * @description 最大上传数量
   */
  maxCount: {
    type: [Number, String],
    default: 9,
  },
  /**
   * @description 上传类型
   */
  accept: {
    type: String,
    default: "image/*",
  },
  /**
   * @description 上传大小限制
   * 单位：字节
   * 默认：2MB
   */
  size: {
    type: Number,
    default: 1024 * 1024 * 2,
  },

  modelValue: {
    type: Array as () => string[],
    default: () => [],
  },
  /**
   * @description 文件类型
   */
  fileType: {
    type: String as PropType<FileType>,
    default: "image",
  },

  example: {
    type: Array as () => string[],
    default: () => [],
  },
  appendix: {
    type: Array as () => string[],
    default: () => [],
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  renderLabel: {
    type: Function as PropType<(label: string) => JSX.Element>,
  },
  label: {
    type: String,
    default: "",
  },
  required: {
    type: Boolean,
    default: false,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  labelClassName: {
    type: String,
    default: "",
  },
  format: {
    type: Function as PropType<(url: string) => any[]>,
  },
  isUploadText: {
    type: Boolean,
    default: false,
  },
  deletable: {
    type: Boolean,
    default: true,
  },
  previewSize: {
    type: String,
    default: "74px",
  },
};

export type UploaderProps = PropType<typeof UploaderProps>;

export interface UploaderState {
  /**
   * @description 文件列表
   */
  fileList: UploaderFileListItem[];
  /**
   * @description
   */
  // urlList: string[];

  /**
   * @description 显示预览
   */
  previewVisible?: boolean;
}

export interface FileUplaoderFn {
  (file: File[]): Promise<string[]>;
}
