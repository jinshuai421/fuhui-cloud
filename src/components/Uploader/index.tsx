import { Popup, Uploader } from "vant";
import type { UploaderFileListItem } from "vant";
import { defineComponent, nextTick, ref, watch } from "vue";
import style from "./index.module.less";
import { UploaderProps } from "./types";
import {
  isAlipayMiniProgram,
  isMiniProgram,
  isWeChat,
  isZLB,
  isZLBWeChatMiniProgram,
} from "@/utils/env";

import {
  getMessage,
  postMessage,
  uploadBase64API,
  uploadImgAPI as uploadImgAPIH5,
} from "@/utils/h5";
import { uploadImg as uploadImgWx } from "@/utils/wx";
import closeIcon from "./images/close.png";
import upIcon from "./images/upIcon.png";
import Video from "../Video";
export default defineComponent({
  props: UploaderProps,
  emits: ["update:modelValue"],
  setup(props, { emit, expose }) {
    const list = ref<UploaderFileListItem[]>(urlToFile(props.modelValue));

    expose({
      list,
    });
    watch(
      () => props.modelValue,
      (newValue) => {
        const fileList = urlToFile(newValue);
        const urlArr = fileList.map((item) => item.url);
        const oldUrlArr = list.value.map((item) => item.url);

        let isUpdate = false;

        for (let item of urlArr) {
          if (!oldUrlArr.includes(item)) {
            isUpdate = true;
            break;
          }
        }

        if (isUpdate) {
          list.value = fileList;
        }
      }
    );

    const updateValue = () => {
      const file = list.value;
      let urlArrr: any[] = file
        .map((item: UploaderFileListItem) => {
          return item.url;
        })
        .filter((item) => item);
      const format = props.format;
      if (format) {
        urlArrr = urlArrr.map((item: string) => {
          return format(item);
        });
      }
      emit("update:modelValue", urlArrr);
    };

    /**
     * @description 将url转换为file对象
     */
    function urlToFile(url: string | string[]) {
      if (!Array.isArray(url)) {
        url = [url];
      }

      return url
        .filter((e) => e)
        .map((item) => {
          if (typeof item === "string") {
            return {
              url: item,
            };
          }

          return item;
        });
    }

    const uploadImg = (
      file: UploaderFileListItem[],
      type: "h5" | "wx" | "zlb" = "h5"
    ) => {
      const offset = list.value.length - file.length;

      const strategy: Record<typeof type, () => any> = {
        h5: () => {
          file.map((item) => {
            item.status = "uploading";
            return item.file!;
          });
          file.map((item) => {
            item.status = "uploading";
            return uploadImgAPIH5(item.file!).then((url) => {
              item.status = "done";
              // debugger
              item.url = url;
              updateValue();
            });
          });
        },
        wx: () => {
          let file = [] as UploaderFileListItem[];
          let count = parseFloat(props.maxCount as string) - list.value.length;

          if (isMiniProgram) {
            count = count >= 10 ? 9 : count;
          }

          uploadImgWx({
            count: count,
            choose: (localIds) => {
              console.log("localIds", localIds);
              file = localIds.map((item) => {
                return {
                  status: "uploading",
                };
              });
              list.value.push(...file);
            },
          }).then((urlArr) => {
            console.log("urlArr", urlArr, file);
            urlArr.map((url, index) => {
              // debugger
              const currentFile = list.value[index + offset];
              currentFile.status = "done";
              currentFile.url = url;
            });
            console.log("urlArr", urlArr, file);
            uploaderRefs.value.upload();
            updateValue();
          });
        },
        zlb: () => {
          // postMessage({
          //     type: "upload"
          // })

          // getMessage('upload', (data: any) => {
          //     console.log('uploaduploadupload', data)
          //     const { pic = [] } = data
          //     let file: UploaderFileListItem[] = pic.map((item: any): UploaderFileListItem => {
          //         return {
          //             status: 'uploading',
          //             content: item,
          //         }
          //     })

          //     list.value.push(...file)
          //     setTimeout(() => {
          //         file.map((item, index) => {

          //             return uploadBase64API(item.content!).then(data => {
          //                 const currentFile = list.value[index + offset]
          //                 currentFile.status = 'done'
          //                 currentFile.url = data.fileUrl
          //                 updateValue()
          //             })
          //         })
          //     }, 300)

          // })

          file.map((item) => {
            item.status = "uploading";
            return item.file!;
          });
          setTimeout(() => {
            file.map((item) => {
              item.status = "uploading";
              return uploadBase64API(item.content!).then((data) => {
                item.status = "done";
                item.url = data.fileUrl;
                updateValue();
              });
            });
          }, 200);
        },
      };

      // strategy[type]();
      strategy["h5"]();
    };

    const onClickUpload = (e: MouseEvent) => {
      if (isWeChat) {
        // e.preventDefault();
        // e.stopPropagation();
        // uploadImg([], "wx");

        uploaderRefs.value.upload();
        return;
      }
      // if (isZLB || isAlipayMiniProgram) {
      //   e.preventDefault();
      //   e.stopPropagation();
      //   uploadImg([], "zlb");
      //   return;
      // }
    };

    const onAfterRead = (
      fileData: UploaderFileListItem | UploaderFileListItem[]
    ) => {
      console.log("file", fileData);
      if (!Array.isArray(fileData)) {
        fileData = [fileData];
      }

      if (isZLB || isAlipayMiniProgram) {
        // uploadImg(fileData, 'zlb')
        uploadImg(fileData);
      } else {
        uploadImg(fileData);
      }
    };
    const delFile = (event: any, keyObj: any) => {
      console.log(list.value, "----");
      let newList: any = [];
      list.value.map((item, index) => {
        if (keyObj.index != index) {
          newList.push(item);
        }
      });
      list.value = newList;
      updateValue();
      //return false
    };

    const getUploadText = () => {
      if (!props.isUploadText) return;
      return `${list.value.length}/${props.maxCount}`;
    };

    const uploaderRefs = ref<any>(null);

    const showVideo = ref(false);
    const videoUrl = ref("");

    const renderVideo = () => {
      return (
        <Popup
          v-model:show={showVideo.value}
          onClose={() => {
            videoUrl.value = "";
          }}
          style={{ width: "100%" }}
        >
          {videoUrl.value && <Video url={videoUrl.value} type="mp4" />}
        </Popup>
      );
    };

    return () => (
      <div>
        <Uploader
          ref={uploaderRefs}
          class={style.uploader}
          v-model={list.value}
          accept={props.accept}
          onClick-upload={onClickUpload}
          after-read={onAfterRead}
          multiple={props.multiple}
          maxCount={props.maxCount}
          preview-size={props.previewSize}
          readonly={props.readonly}
          show-upload={!props.readonly}
          uploadText={getUploadText()}
          before-delete={delFile}
          deletable={props.deletable}
          v-slots={{
            "preview-delete": () => {
              return (
                !props.readonly && (
                  <img class={style.closeIcon} src={closeIcon} />
                )
              );
            },
            "preview-cover": (item: any) => {
              const url = item.url;
              if (!url) return;

              const isVideo =
                url.includes(".mp4") ||
                url.includes(".3gp") ||
                url.includes(".avi") ||
                url.includes(".wmv") ||
                url.includes(".mov");
              if (isVideo) {
                return (
                  <div
                    style={{ width: "100%", height: "100%" }}
                    onClick={() => {
                      showVideo.value = true;
                      videoUrl.value = url;
                    }}
                  >
                    <Video play={false} url={url} type="mp4" disable={true} />
                  </div>
                );
              }
              return (
                <img style={{ width: "100%", height: "100%" }} src={url} />
              );
            },
            // default: () => {
            //   return (
            //     <div
            //       class={["flex--center", style.uploadBox]}
            //       style={{
            //         width: props.previewSize,
            //         height: props.previewSize,
            //       }}
            //     >
            //       <img src={upIcon} />
            //     </div>
            //   );
            // },
          }}
        />
        {renderVideo()}
      </div>
    );
  },
});
