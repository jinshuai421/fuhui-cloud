// function CustomOverlay(position, el,onClick) {
//     this.el = el;
//     this.position = position;
//     this.onClick = onClick;
// }
// CustomOverlay.prototype = new qq.maps.Overlay();
//  //定义construct,实现这个接口来初始化自定义的Dom元素
// CustomOverlay.prototype.construct = function() {
//     var div = this.div = document.createElement("div");
//     var divStyle = this.div.style;
//     divStyle.position = "absolute";
//     // divStyle.width = "auto";
//     // divStyle.height = "auto";
//     divStyle.cursor = "pointer";
//     this.div.innerHTML = this.el;
//     //将dom添加到覆盖物层
//     var panes = this.getPanes();
//     //设置panes的层级，overlayMouseTarget可接收点击事件
//     panes.overlayMouseTarget.appendChild(div);

//     var self = this;
//     this.div.onclick = self.onClick
// }
//  //实现draw接口来绘制和更新自定义的dom元素
// CustomOverlay.prototype.draw = function() {
//     var overlayProjection = this.getProjection();
//     //返回覆盖物容器的相对像素坐标
//     var pixel = overlayProjection.fromLatLngToDivPixel(this.position);
//     var divStyle = this.div.style;
//     divStyle.left = pixel.x+'px';
//     divStyle.top = pixel.y+'px';
//     divStyle.transform = 'translate(-50%,-100%)';
// }
//  //实现destroy接口来删除自定义的Dom元素，此方法会在setMap(null)后被调用
// CustomOverlay.prototype.destroy = function() {
//     this.div.onclick = null;
//     this.div.parentNode.removeChild(this.div);
//     this.div = null
// }

// export default CustomOverlay;
