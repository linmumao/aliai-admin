// 设置 rem 函数
function setRem () {
  //  PC端
  // 基准大小
  baseSize = 38;
  let basePc = baseSize / 1920; // 表示1920的设计图,使用100PX的默认值
  let vW = window.innerWidth; // 当前窗口的宽度
  let vH = window.innerHeight; // 当前窗口的高度
  // 非正常屏幕下的尺寸换算
  let dueH = vW * 1080 / 1920
  // if(vW<=1600 || vH<=789) {
  // 	vW = 1600
  // 	vH = 789
  // }if(vW<= 1440 || vH<=837) {
  // 	vW = 1440
  // 	// vH = 837
  // }else if(vW>1920 || vH>1080) {
  // 	// vW = 1920
  // 	vH = 1080
  // }else if(vH < dueH){
  // 	vW = vH * 1920 /1080
  // }

  // if(vW<=1440 || vH<=789) {
  // 	vW = 1600
  // }else if(vW<= 1600 || vH<=837) {
  // 	vW = 1600
  // }else if(vW>1920 || vH>1080) {
  // 	vW = 1920
  // 	vH = 1080
  // }else if(vH < dueH){
  // 	vW = vH * 1920 /1080
  // }

  // if(vW<=1440) {
  // 	alert('1')
  // 	vW = 1600
  // }else if(vW<= 1600) {
  // 	alert('2')
  // 	alert(vW)
  // 	vW = 1600
  // }else if(vW>1920 || vH>1080) {
  // 	alert('3')
  // 	vW = 1920
  // 	vH = 1080
  // }else if(vH < dueH){
  // 	alert('4')
  // 	vW = vH * 1920 /1080
  // }
  if (vW <= 1440) {
    // alert('1')
    vW = 1600
  } else if (vW > 1920 || vH > 1080) {
    // alert('3')
    vW = 1920
    vH = 1080
  } else if (vH < dueH) {
    // alert('4')
    vW = vH * 1920 / 1080
  }
  // if (vH < dueH) { // 当前屏幕高度小于应有的屏幕高度，就需要根据当前屏幕高度重新计算屏幕宽度
  //   vW = vH * 1920 /1080
  // }
  let rem = vW * basePc; // 以默认比例值乘以当前窗口宽度,得到该宽度下的相应font-size值
  document.documentElement.style.fontSize = rem + "px";
}
// 初始化
setRem();
// 改变窗口大小时重新设置 rem
window.onresize = function () {
  setRem()
};