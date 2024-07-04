



export const openLocation = (lngLat: LngLatObj, name: string = '', address = '') => {
    const { lng, lat } = lngLat
    ap.openLocation({
        longitude: lng,
        latitude: lat,
        name,
        address
    });
}