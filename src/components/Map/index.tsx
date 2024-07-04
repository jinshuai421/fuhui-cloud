import { defineComponent } from 'vue'
import style from './index.module.less'
import {
  init,
  getLocation,
  createLatLng,
  createMarkerDecoration,
  addMarker,
  addCluster,
  // createMarker,
  createMVCArray,
  addListener
} from '@/third/map/Tencent/index'
import { getSize } from '@/command/apiTool'
// import FullScreenImg from './assets/full-screen.png'
import FullScreenOldImg from './assets/full-screen-old.png'
import HomeOrangeImg from './assets/home-orange.png'
import HomeGreenImg from './assets/home-green.png'
import HomeRedImg from './assets/home-red.png'
import HomeGreyImg from './assets/home-grey.png'
import { getState, MapPointerInfo } from './types'

import { ColdStatus } from '@/components/ColdListItem/types'

declare let qq: any

export default defineComponent({
  props: {
    width: {
      type: String,
      default: '100%'
    },
    height: {
      type: Number as () => number,
      default: 200
    },
    // 显示全屏按钮
    showFullScreen: {
      type: Boolean,
      default: true
    },
    fullScreenClassName: {
      type: String,
      default: ''
    },
    // 显示重定位按钮
    showReset: {
      type: Boolean,
      default: false
    },
    // 重定位按钮样式
    resetClassName: {
      type: String,
      default: ''
    },
    /**
     * @description 地图缩放级别
     */
    zoom: {
      type: Number,
      default: 8
    },
    /**
     * @description 地图标点数据
     *
     * @export
     * @interface MapPointerInfo
     */
    data: {
      type: Array as () => MapPointerInfo[],
      default: () => []
    },

    /**
     * @description 可拖动
     *
     */
    draggable: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return getState()
  },

  emits: ['init', 'fullScreen', 'change', 'clickMarker'],

  mounted() {
    this.init()
    this.addListener()
  },
  watch: {
    // 聚合点数量监听
    'cluster.data.clusterView': {
      handler(newVal: any) {
        const { cluster } = this,
          { num: oldNum, first } = cluster
        // console.log(this.cluster.data);

        const num = this?.cluster?.data?.clusterView?.clusters?.length || 0
        if (num > 0) {
          if (num === oldNum) return
          cluster.num = num

          if (first) {
            this.$nextTick(() => {
              this.updateCluster()
            })
            cluster.first = false
          } else {
            this.updateCluster()
          }
        }
      },
      deep: true
    },
    data() {
      this.clearMarker()
      this.renderMarker()

      this.renderCluster()
    }
  },
  methods: {
    init() {
      const map = init(this.$refs._map as Element, {
        mapTypeControl: false,
        zoomControl: false,
        mapStyleId: 'style1',
        // draggable:true,
        zoom: this.zoom,
        draggable: this.draggable
      })
      this.$emit('init', map)

      this.onReset()

      this.map = map

      this.renderMarker()

      this.renderCluster()
    },

    addListener() {
      const { map } = this

      addListener(map, 'zoom_changed', () => {
        // const zoomLevel = map.getZoom();
        this.renderCluster()
      })
    },
    // 添加标记点
    addMarker(options: {
      lat: number
      lng: number
      // 自定义数据
      custom: MapPointerInfo
    }) {
      const { map } = this
      const { lat, lng, custom } = options
      const decoration = this.getMarkerDecoration(custom)
      const marker = addMarker({
        map,
        decoration,
        position: createLatLng(lat, lng),
        custom,
        icon: false
      })

      addListener(marker, 'click', (e: any) => {
        this.$emit('clickMarker', e.target.custom)
      })

      return marker
    },

    async onReset() {
      const data: any = await getLocation()
      const { lat, lng }: { lat: number; lng: number } = data
      ;(this.map as any).setCenter(createLatLng(lat, lng))
    },
    // 获取聚合点装饰
    getClusterDecoration(name: string, num: string | number) {
      let el: string
      el = `
            <div class=" w-max text-center" >
                <div class="font--t3  border-base-radius overflow-hidden">
                    <div class="text-blue bg-white px-base-5">冷库</div>
                    <div class="text-white bg-blue px-base-5">{num}个</div>
                </div>
                <div class="${style.map__triangle}"></div>
            </div>
            `
      return createMarkerDecoration(el)
    },

    /**
     * @desc 获取标点装饰
     *
     * @param {number} num 冷库存储量
     * @param {string} type 冷库类型
     * @param {boolean} shared 可共享
     * @returns
     */
    getMarkerDecoration(point: MapPointerInfo) {
      let el: string

      // 未共享冷库
      if (point.status === ColdStatus.NOT_SHARE) {
        el = `
                <div class=" w-max text-center">
                <div class=" px-base-10 overflow-hidden  border-base-radius bg-neutral-3 text-white font--t3">未共享</div>
                    <div class="${style['map__triangle--n3']}"></div>
                    <img class="mx-auto ${style['map__icon--1']}" src=${HomeGreyImg} />
                </div>
                `

        return createMarkerDecoration(el)
      }

      const margin = point.margin

      // 库存已满
      if (margin <= 0) {
        el = `
                <div class=" w-max text-center">
                    <div class=" px-base-10 overflow-hidden  border-base-radius bg-neutral-3 text-white font--t3">已满</div>
                    <div class="${style['map__triangle--n3']}"></div>
                    <img class="mx-auto ${style['map__icon--1']}" src=${HomeRedImg} />
                </div>
                `
        return createMarkerDecoration(el)
      }

      let color: string = '',
        icon: string = ''
      if (margin > 1000) {
        color = 'text-green'
        icon = HomeGreenImg
      } else if (margin > 500) {
        color = 'text-orange'
        icon = HomeOrangeImg
      } else if (margin > 0) {
        color = 'text-red'
        icon = HomeRedImg
      }

      el = `
            <div class=" w-max text-center cursor-pointer" >
                <div class="font--t3  border-base-radius overflow-hidden">
                    <div class="${color} bg-white px-base-5">余${margin}m³</div>
                    <div class="text-white bg-neutral-3 px-base-5">${point.coldType}</div>
                </div>
                <div class="${style['map__triangle--n3']}"></div>
                <img class="mx-auto ${style['map__icon--1']}" src=${icon} />
            </div>
            `

      return createMarkerDecoration(el)
    },

    // 标记点
    renderMarker() {
      const { data, marker } = this

      // marker.data = data.map(item=>this.addMarker({ lat: item.lat, lng: item.lng, custom: item }))
      const mvcArray = createMVCArray()
      for (let item of data) {
        mvcArray.push(
          this.addMarker({ lat: item.lat, lng: item.lng, custom: item })
        )
      }

      marker.data = mvcArray

      console.log('renderMarker', marker.data)
    },
    updateCluster() {
      const { cluster } = this,
        markers = cluster.data

      const { styles = [] } = markers

      // console.log('cluster',markers);

      for (let item of styles) {
        item.icon.url = ''
        item.text = this.getClusterDecoration('周三真', '8个')
      }
      markers.set('styles', styles)
    },

    /**
     * @description 清空所有标点
     *
     */
    clearMarker() {
      const { cluster } = this

      if (cluster.data?.markers?.length) {
        cluster?.data?.clearMarkers?.()
      }
    },

    // 聚合点
    renderCluster() {
      const { map, marker, cluster } = this

      const mark = addCluster({
        map,
        markers: marker.data,
        gridSize: 15
      })

      cluster.data = mark
    },

    // 按钮
    renderButton(icon: string, className: string, text: string, onClick: any) {
      return (
        <div
          class={['flex--col items-center', className, style['button']]}
          onClick={onClick}
        >
          <img class={style['button__icon']} src={icon} />
          <div class={['font--t2 text-blue', style['button__text']]}>
            {text}
          </div>
        </div>
      )
    },

    // 全屏按钮
    renderFullScreen() {
      if (!this.showFullScreen) return ''
      const onFullScreen = () => {
        // (this.$refs as any)._map.requestFullscreen()
        // this.renderMarker()
        this.$emit('fullScreen')
      }

      return (
        <img
          class={[style['fullscreen'], style['icon--1']]}
          onClick={onFullScreen}
          src={FullScreenOldImg}
        />
      )

      // return this.renderButton(FullScreenImg, style['fullscreen'], '全屏', onFullScreen)
    },
    // 重定位按钮
    renderReset() {
      if (!this.showReset) return ''
      return (
        <div onClick={this.onReset} class={this.resetClassName}>
          重定位测试
        </div>
      )
    }
  },
  render() {
    return (
      <div
        style={{ width: this.width, height: getSize(this.height) }}
        class={style.map__clear}
        ref="_map"
      >
        {this.renderReset()}
        {this.renderFullScreen()}
      </div>
    )
  }
})
