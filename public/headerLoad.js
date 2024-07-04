var userAgent = navigator.userAgent



var AlipayMiniProgram = /Alipay/i


if(AlipayMiniProgram.test(userAgent)){
  document.write(`
    <script src="https://gw.alipayobjects.com/as/g/h5-lib/alipayjsapi/3.1.1/alipayjsapi.min.js"></script>
  `)
}