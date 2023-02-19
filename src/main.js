import Vue from "vue";
import App from "./App.vue";
import router from "../src/router/index.js";
// import ElementUI from "element-ui";
import {Message} from 'element-ui'
import "element-ui/lib/theme-chalk/index.css";
import './plugins/element.js'
import BaiduMap from "vue-baidu-map";
import JSEncrypt from "jsencrypt";
import './utils/rem'
import AntDesignVue from 'ant-design-vue';
Vue.use(AntDesignVue);
import 'ant-design-vue/dist/antd.css'
import * as echarts from 'echarts';
Vue.prototype.$echarts = echarts
import './theme/index.css'
// import 'lib-flexible'
// import './utils/flexible'

Vue.prototype.$getRsaCode = (str) => {
  // 注册方法
  const PUBLIC_KEY =
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDf4b8hL5buIHBDuZAo3CcShneMBONOB+ZD1rW3k+bOQJ3BJlrlNGluF1SxcUx95ktFHIVPkQizb6pCbuQDsc8l3UNssAZ65gpi0GQUovSTH/2D+bUNsSGXa9y9lW1LNPyHBYDEpq71bRfW+MoBV2SHXkMtUpBNwGM9SeNUXD6acQIDAQAB";
  let pubKey = `-----BEGIN PUBLIC KEY-----${PUBLIC_KEY}-----END PUBLIC KEY-----`; // ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt();

  encryptStr.setPublicKey(PUBLIC_KEY); // 设置 加密公钥
  let data = encryptStr.encrypt(str.toString()); // 进行加密
  return data;
};

Vue.prototype.$getRsaCode2 = (str) => {
  // 注册方法
  const PUBLIC_KEY =
    "MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDf4b8hL5buIHBDuZAo3CcShneMBONOB+ZD1rW3k+bOQJ3BJlrlNGluF1SxcUx95ktFHIVPkQizb6pCbuQDsc8l3UNssAZ65gpi0GQUovSTH/2D+bUNsSGXa9y9lW1LNPyHBYDEpq71bRfW+MoBV2SHXkMtUpBNwGM9SeNUXD6acQIDAQAB";
  let pubKey = `-----BEGIN PUBLIC KEY-----${PUBLIC_KEY}-----END PUBLIC KEY-----`; // ES6 模板字符串 引用 rsa 公钥
  let encryptStr = new JSEncrypt();

  encryptStr.setPublicKey(PUBLIC_KEY); // 设置 加密公钥
  let data = encryptStr.encrypt(str.toString()); // 进行加密
  return data;
};

Vue.prototype.validForbid = function (value) {
  value = value.replace(/[`~!@#$%^&*()_\-+=<>?:"{}|,./;'\\[\]·~！@#￥%……&*（）——\-+={}|《》？：“”【】、；‘’，。、]/g, '').replace(/\s/g, "");
  return value;
}

Vue.prototype.konggeForbid = function (value) {
  value = value.replace(/\s+/g, "");
  return value;
}

Vue.use(BaiduMap, {
  ak: "", //  在此输入你自己的百度地图ak
});

//注意：这里使用的$message,所以在使用时候也是this.$message
Vue.prototype.$message = function(msg){
  return Message({
    message: msg,
    duration: 1000
  })
}
//分别对success、warning和error等样式进行设置
Vue.prototype.$message.success = function (msg) {
  return Message.success({
    message: msg,
    duration: 1000
  })
}
Vue.prototype.$message.warning = function (msg) {
  return Message.warning({
    message: msg,
    duration: 1000
  })
}
Vue.prototype.$message.error = function (msg) {
  return Message.error({
    message: msg,
    duration: 1000
  })
}
Vue.config.productionTip = false;

// Vue.use(ElementUI);
new Vue({
  router,
  render: (h) => h(App),
}).$mount("#app");
