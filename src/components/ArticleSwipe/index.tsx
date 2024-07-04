// import { defineComponent, PropType } from 'vue'
// import style from './index.module.less'
// import IconImg from './assets/icon.png'
// import ArrowRightImg from './assets/arrow-right.png'
// import { Swipe, SwipeItem } from 'vant'
// import { getSize } from '@/command/apiTool'
// // import Item from "../FilterBar/components/Item";
// import { ArticleSwipeProps } from './types'
// import { getMessageByTypeAPIParamsLinkType } from '@/api/index'
// import { getMessageDateText } from '@/utils/util'

// export default defineComponent({
//   name: 'ArticleSwipe',
//   props: {
//     data: {
//       type: Array as PropType<ArticleSwipeProps[]>,
//       default: () => []
//     },
//     autoplay: {
//       type: [Number, String],
//       default: 3000
//     }
//   },
//   methods: {
//     onClick(
//       type: any,
//       msgId: string,
//       linkUrl: string
//     ) {
//       if (type === getMessageByTypeAPIParamsLinkType.outer) {
//         window.location.href = linkUrl
//       } else if (type === getMessageByTypeAPIParamsLinkType.inter) {
//         this.$router.push(`/homeDetails?id=${msgId}&type=0`)
//       }
//     },
//     renderSwipeItem(item: ArticleSwipeProps) {
//       return (
//         <SwipeItem
//           onClick={() => this.onClick(item.linkType, item.msgId, item.linkUrl)}
//         >
//           <div class={['flex--center--v']}>
//             <img class={[style['icon--1']]} src={IconImg} alt="" />
//             <div class={['flex-1 font--t5 text-black text text--ellipsis--1']}>
//               {item.title}
//             </div>
//             <div class={['flex--center--v']}>
//               <div class={['font--t3 text-grey', style['text--1']]}>
//                 {getMessageDateText(item?.createTime || '')}
//               </div>
//               <div class={['bg-red']}></div>
//               <img class={[style['icon--2']]} src={ArrowRightImg} alt="" />
//             </div>
//           </div>
//         </SwipeItem>
//       )
//     }
//   },
//   render() {
//     return (
//       <div class={[style['article'], ' overflow-hidden']}>
//         <Swipe
//           style={{ height: getSize(45) }}
//           autoplay={this.autoplay}
//           vertical
//           loop
//           show-indicators={false}
//         >
//           {this.data.map((item) => this.renderSwipeItem(item))}
//         </Swipe>
//       </div>
//     )
//   }
// })
