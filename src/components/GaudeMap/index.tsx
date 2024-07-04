//经营信息
import { defineComponent } from 'vue'
import style from './index.module.less'
import { Search } from 'vant'
import { dataObj, init } from './typs'
import rightImg from './assets/right.png'
import posstionbackImg from './assets/posstionback.png'
import mobelImg from './assets/mobel.png'
import initImg from './assets/init.png'
declare let AMap: any
export default defineComponent({
  name: 'GaudeMap',
  data() {
    return {
      ...dataObj(),
      timerOut: null as any,
      timer: null as any
    }
  },
  emits: ['change'],
  props: ['nowPostion', 'newPostion'],
  async mounted() {
    //打开地图
    this.openMapPostion()
  },
  methods: {
    //打开地图
    openMapPostion() {
      let container = this.$refs.container as HTMLDivElement
      this.poisIndex = 0
      let center = [
        Number(this.nowPostion.lng),
        Number(this.nowPostion.lat)
      ] as any
      let bl = false
      let newCenter = []
      let newCenterData: any
      if (this.newPostion) {
        if (this.newPostion.lng && this.newPostion.lat) {
          newCenter = [
            Number(this.newPostion.lng),
            Number(this.newPostion.lat)
          ] as any
          newCenterData = new AMap.LngLat(...newCenter)
          bl = true
        }
      }
      const centerData = new AMap.LngLat(...center)
      this.center = centerData
      if (!this.timerOut) {
        console.log('无值')
        this.timerOut = setTimeout(() => {
          this.mapObj = init(container, {
            zoom: 15,
            center: bl ? newCenterData : centerData
          })
          let imgIcon = new AMap.Icon({
            imageSize: new AMap.Size(32, 32),
            image: initImg
          })
          const marker1 = new AMap.Marker({
            icon: imgIcon,
            position: centerData
          })
          this.mapObj.add(marker1)
          this.mapObj.on('touchmove', this.onMapMove)
          this.mapObj.on('click', (e: any) => {
            console.log(e, '点击事件')
            //中心点跟着点击位置移动
            this.mapObj.setCenter(e.lnglat)
            this.mapObj.plugin('AMap.PlaceSearch', () => {
              this.placeSearch = new AMap.PlaceSearch({
                pageSize: 20,
                // 单页显示结果条数
                pageIndex: 1,
                // 页码
                extensions: 'all',
                city: '宁波'
              })
              this.placeSearch.searchNearBy(
                '',
                e.lnglat,
                50000,
                (status: string, result: any) => {
                  if (status == 'complete') {
                    this.poisIndex = 0
                    this.poiList = result.poiList.pois
                    this.nowData = result.poiList.pois[0]
                    console.log(result, '搜索结果2')
                  }
                }
              )
            })
          })
          this.initPostion(bl ? newCenterData : centerData)
        }, 100)
      } else {
        console.log('有值')
        this.initPostion(centerData)
      }
    },
    //移动地图获取中心点
    onMapMove() {
      if (this.timer) {
        clearTimeout(this.timer)
        this.timer = setTimeout(this.getCenterPostioin, 300)
        return
      }
      this.timer = setTimeout(this.getCenterPostioin, 300)
    },
    //初始化定位
    initPostion(centerData: any) {
      this.mapObj.plugin('AMap.PlaceSearch', () => {
        this.placeSearch = new AMap.PlaceSearch({
          pageSize: 20,
          // 单页显示结果条数
          pageIndex: 1,
          // 页码
          extensions: 'all',
          city: '宁波',
          jogEnable: false
        })
        this.placeSearch.searchNearBy(
          '',
          centerData,
          50000,
          (status: string, result: any) => {
            if (status == 'complete') {
              this.poiList = result.poiList.pois
              this.nowData = result.poiList.pois[0]
              console.log(result, '搜索结果1')
            }
          }
        )
      })
    },
    //中心点坐标
    getCenterPostioin() {
      const centerData = this.mapObj.getCenter()
      this.mapObj.plugin('AMap.PlaceSearch', () => {
        this.placeSearch = new AMap.PlaceSearch({
          pageSize: 20,
          // 单页显示结果条数
          pageIndex: 1,
          // 页码
          extensions: 'all',
          city: '宁波'
        })
        this.placeSearch.searchNearBy(
          '',
          centerData,
          50000,
          (status: string, result: any) => {
            if (status == 'complete') {
              let odiv = this.$refs.datalist as HTMLElement
              odiv.scrollTop = 0
              this.isShowZdy = false
              this.poisIndex = 0
              this.poiList = result.poiList.pois
              this.nowData = result.poiList.pois[0]
              console.log(result, '搜索结果2')
            }
          }
        )
      })
    }
  },
  render() {
    return (
      <div class={style['map-container-item']}>
        <div class={style['map-top-content']} ref="container">
          <div ref="container" class={style['container-item']}>
            <span
              class={style['qx-item-btn']}
              onClick={() => {
                this.$emit('change', { showMap: '取消' })
              }}
            >
              取消
            </span>
            <span
              class={style['qd-item-btn']}
              onClick={() => {
                if (this.poisIndex == -1) {
                  this.$emit('change', { showMap: '自定义', ...this.nowData })
                } else {
                  this.$emit('change', { showMap: '确定', ...this.nowData })
                }
              }}
            >
              确定
            </span>
            <img
              class={style['img-item-mark']}
              src={mobelImg}
              style={{ height: '34px', width: '34px' }}
              alt=""
            />
            <div
              class={style['posstionback-img']}
              onClick={() => {
                //回到起点
                let center = [
                  Number(this.nowPostion.lng),
                  Number(this.nowPostion.lat)
                ] as any
                let backPostion = new AMap.LngLat(...center)
                this.mapObj.setCenter(backPostion, true)
                this.initPostion(this.center)
              }}
            >
              <img
                src={posstionbackImg}
                style={{ width: '25px', height: '25px' }}
                alt=""
              />
            </div>
          </div>
        </div>
        <div class={style['map-data-list']} ref="footer">
          <Search
            v-model={this.searchModel}
            placeholder="搜索地点"
            onUpdate:modelValue={() => {
              console.log(this.searchModel, '搜索关键字')
              this.mapObj.plugin('AMap.PlaceSearch', () => {
                this.placeSearch = new AMap.PlaceSearch({
                  pageSize: 20,
                  // 单页显示结果条数
                  pageIndex: 1,
                  // 页码
                  extensions: 'all',
                  city: '宁波'
                })
                this.placeSearch.search(
                  this.searchModel,
                  (status: string, result: any) => {
                    if (status == 'complete') {
                      this.poisIndex = -1
                      this.poiList = result.poiList.pois
                      this.nowData = this.poiList[0]
                      this.mapObj.setCenter(
                        result.poiList.pois[0].location,
                        true
                      )
                    }
                  }
                )
              })
            }}
            onClick-right-icon={() => {
              console.log('quxiao')
            }}
          />
          <div class={style['poiList-pois']} ref="datalist">
            <div
              onClick={() => {
                this.poisIndex = -1
                this.isShowZdy = !this.isShowZdy
                this.nowData = this.poiList[0]
              }}
            >
              <div class={style['pois-letf']}>
                <div class={style['letf-title']}>自定义</div>
                <div class={style['distent-item']}>当前定位</div>
              </div>
              <div class={style['right-img']}>
                {this.isShowZdy && (
                  <img
                    src={rightImg}
                    style={{ width: '20px', height: '20px' }}
                    alt=""
                  />
                )}
              </div>
            </div>
            {this.poiList.map((item: any, i: number) => {
              return (
                <div
                  onClick={() => {
                    this.poisIndex = i
                    this.nowData = item
                    this.mapObj.setCenter(item.location, true)
                    this.isShowZdy = false
                  }}
                >
                  <div class={style['pois-letf']}>
                    <div class={style['letf-title']}>{item.name}</div>
                    <div class={style['distent-item']}>
                      {item.adname + '' + item.address}
                    </div>
                  </div>
                  <div class={style['right-img']}>
                    {this.poisIndex == i && (
                      <img
                        src={rightImg}
                        style={{ width: '20px', height: '20px' }}
                        alt=""
                      />
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      </div>
    )
  }
})
