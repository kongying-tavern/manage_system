//地图初始化
import * as L from 'leaflet'
import "leaflet/dist/leaflet.css";
function initmap(map) {
  //初始化地图参数
  let t = L.latLngBounds([0, 0], [-66.5, 90]);
  let mapdata = L.map("map", {
    center: [-35, 45],
    zoomDelta: 0.5,
    zoomSnap: 0.5,
    maxZoom: 8,
    minZoom: 4,
    zoom: 4,
    maxBounds: t,
    attributionControl: false,
    zoomControl: false
  });
  //挂载至VUE对象
  map = mapdata;
  //添加地图切片
  L.TileLayer.T = L.TileLayer.extend({
    getTileUrl: function (coords) {
      let x = coords.x
      let y = coords.y
      let normal_map_url = `https://yuanshen.site/tiles_test/${coords.z}/ppp${x}_${y}.jpg`;
      return normal_map_url;
    },
    reuseTiles: true
  });
  L.tileLayer.t = function () {
    return new L.TileLayer.T();
  }
  map.addLayer(L.tileLayer.t());
  return map;
}
export { initmap }