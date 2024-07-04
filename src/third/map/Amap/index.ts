declare let AMap: any;

/**
 * @description 地图经纬度数组格式
 */
type LatLng = [number, number];

/**
 * @description 设置地图上显示的元素种类, 支持'bg'（地图背景）、'point'（POI点）、'road'（道路）、'building'（建筑物）
 */
type Features = "bg" | "point" | "road" | "building";

interface InitMapOptions {
    /**
     * @description 初始中心经纬度
     */
    center?: LatLng;
    /**
     * @description 地图显示的缩放级别，可以设置为浮点数；若center与level未赋值，地图初始化默认显示用户所在城市范围。
     */
    zoom?: number;
    /**
     * @description 地图顺时针旋转角度，取值范围 [0-360] ，默认值：0
     */
    rotation?: number;
    /**
     * @description 地图视图模式, 默认为‘2D’，可选’3D’，选择‘3D’会显示 3D 地图效果。
     */
    viewMode?: "2D" | "3D";
    /**
     * @description 设置地图上显示的元素种类
     */
    features?: Array<Features>;

    /**
     * @description 地图显示的缩放级别范围, 默认为 [2, 20] ，取值范围 [2 ~ 30]
     */
    zooms?: [number, number];

    /**
     * @description 地图是否可通过鼠标拖拽平移, 默认为 true。此属性可被 setStatus/getStatus 方法控制
     */
    dragEnable?: boolean;

    /**
     * @description 图是否可缩放，默认值为 true。此属性可被 setStatus/getStatus 方法控制
     */
    zoomEnable?: boolean;

    /**
     * @description 地图在移动终端上是否可通过多点触控缩放浏览地图，默认为true。关闭手势缩放地图，请设置为false。
     */
    touchZoom?: boolean;
    /**
     * @description 是否展示地图文字和 POI 信息。
     */
    showLabel?: boolean;
    /**
     * @description 设置地图的显示样式
     */
    mapStyle?: string;
}

/**
 * @description 地图初始化
 */

export const init = (selector: string | HTMLDivElement, options: InitMapOptions = {}) => {
    return new AMap.Map(selector, options);
};

interface MarkerOptions {
    /**
     * @description 要显示该marker的地图对象
     */
    map: any;
    position?: any;
    /**
     * @description 点标记显示内容。可以是HTML要素字符串或者HTML DOM对象。content有效时，icon属性将被覆盖。
     */
    content?: string | HTMLElement;

    /**
     * @description 点标记是否可见，默认值：true
     */
    visible?: boolean;
    /**
     * @description 点标记的叠加顺序。地图上存在多个点标记叠加时，通过该属性使级别较高的点标记在上层显示，默认zIndex：12
     */
    zIndex?: number;
    /**
     * @description 点标记是否可点击，默认值: true
     */
    clickable?: boolean;
    /**
     * @description 设置点标记是否可拖拽移动，默认值：false
     */
    draggable?: boolean;
    /**
     * @description 事件是否冒泡，默认为 false
     */
    bubble?: boolean;
}

/**
 * @description 地图标点添加
 */
export const addMarker = (options: MarkerOptions) => {
    return new AMap.Marker(options);
};

/**
 * @param lat
 * @param lng
 * @returns
 */
export const createLatLng = (lat: number, lng: number): LatLng => {
    return new AMap.LngLat(lng, lat);
};

export type ClusterDataOptionsItem = {
    /**
     * @description 点标记的权重信息，以权重高的点为中心进行聚合
     */
    weight?: number;
    /**
     * @description 点标记的经纬度信息
     */
    lnglat: LatLng;
};

export type MarkerClusterOptions = {
    /**
     * @description 聚合计算时网格的像素大小，默认60
     *
     * @type {number}
     */
    gridSize?: number;

    /**
     * @description 最大的聚合级别，大于该级别就不进行相应的聚合。默认值为 18，即小于 18 级的级别均进行聚合，18 及以上级别不进行聚合
     *
     * @type {number}
     */
    maxZoom?: number;
    /**
     * @description 聚合点的图标位置是否是所有聚合内点的中心点。默认为 true。数据中如果含有权重值，以权重高的点为中心进行聚合
     */
    averageCenter?: boolean;
    /**
     * @description 地图缩放过程中是否聚合。默认值 false。
     */
    clusterByZoomChange?: boolean;
    /**
     * @description 该方法用来实现聚合点的自定义绘制，由开发者自己实现，API 将在绘制每个聚合点的时候调用这个方法，可以实现聚合点样式的灵活设定，指定了 renderClusterMarker 后 styles 无效。
     *              该函数的入参为一个Object，包含如下属性：
     *               1. count: 当前聚合点下聚合的 Marker 的数量
     *               2. marker: 当前聚合点显示的 Marker
     */
    renderClusterMarker?: (markers: any[]) => any;
    /**
     * @description 该方法用来实现非聚合点的自定义绘制，由开发者自己实现，API 将在绘制每个非聚合点的时候调用这个方法
     *               该函数的入参为一个Object，包含如下属性：
     *               marker: 非聚合点 Marker 对象
     */
    renderMarker?: (marker: any) => any;
};

/**
 * @description 添加聚合点
 */
export const addCluster = (
    map: any,
    dataOptions: ClusterDataOptionsItem[],
    MarkerClusterOptions: MarkerClusterOptions,
) => {
    return new AMap.MarkerCluster(map, dataOptions, MarkerClusterOptions);
    //   map.plugin(["AMap.MarkerCluster"],function(){
    //         var cluster = new AMap.MarkerCluster(map, dataOptions, MarkerClusterOptions);
    //        });
};

type GeolocationOptionsType = {
    /**
     * @description 是否使用高精度 默认值：true
     */
    enableHighAccuracy?: boolean;
    /**
     * @description 超时毫秒数，若在指定时间内未定位成功，返回超时错误信息“TIMEOUT”
     *   默认值：无穷大
     */
    timeout?: number;

    /**
     * @description 是否禁止使用IP定位，默认值为0，可选值0-3
     *   0: 可以使用IP定位
     * 1: 手机设备禁止使用IP定位
     * 2: PC上禁止使用IP定位
     * 3: 所有终端禁止使用IP定位
     */
    noIpLocate?: number;
    /**
     * @description 默认为false，设置为true的时候可以调整PC端为优先使用浏览器定位，失败后使用IP定位
     */
    GeoLocationFirst?: boolean;
    /**
     * @description 缓存毫秒数。定位成功后，定位结果的保留时间
     *  默认值：0
     */
    maximumAge?: number;
    /**
     * @description 是否使用坐标偏移，取值true:为高德地图坐标，取值false:为浏览器定位坐标
     *  默认值：true
     */
    convert?: boolean;
};

type LocationData = {
    lat: number;
    lng: number;
    [key: string]: any;
};

let geo: any;

// 获取当前定位
export const getLocation = (): Promise<LocationData> => {

    if (!geo) {
        // AMap.plugin("AMap.Geolocation", function() {
        const params: GeolocationOptionsType = {
            enableHighAccuracy: !true,
            timeout: 10000,
            // GeoLocationFirst: true,
            maximumAge: 0,
        };
        geo = new AMap.Geolocation(params);
        // });
    }
    const local = getLastLocation();
    console.log('local', local);

    return new Promise((resolve, reject) => {
        if (local) resolve(local);
        geo.getCurrentPosition(function (status: any, result: any) {
            console.log("==========getCurrentPosition", status, result);
            if (status === "complete") {
                const { lng, lat } = result.position;
                console.log('getCurrentPosition', JSON.stringify({ lng, lat }));

                localStorage.setItem("lastLocation", JSON.stringify({ lng, lat }));
                if (!local) location.reload();
                resolve(result.position);
            } else {
                console.log("高德地图定位失败", result);
                if (local) {
                    resolve(local);
                } else {
                    reject(result);
                }
            }
        });
    });
};

/**
 * @description 获取上次定位
 */
export const getLastLocation = (): LocationData => {

    const lastLocation = JSON.parse(localStorage.getItem("lastLocation") || "null");
    return lastLocation;
};



/**
 * @description 经纬度转换
 */
export const convertFrom = (lnglat: LngLatObj, type: string = 'gps'):Promise<LngLatObj> => {
    return new Promise((resolve,reject)=>{
        AMap.convertFrom([lnglat.lng, lnglat.lat], type, function (status: any, result: any) {
            console.log(status, result);
            if (result.info === 'ok') {
                var lnglats = result.locations; // Array.<LngLat>
                const point = lnglats[0]
                resolve({lat:point.lat,lng:point.lng})
            } else {
                reject({lat:0,lng:0})
            }
        });
    })


}
