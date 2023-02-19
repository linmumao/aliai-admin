import axios from "axios";
import { Message, MessageBox } from "element-ui";
import { localGet, localRemove } from "./local.js";
import Router from "vue-router";
import Vue from "vue";
import homeUrl from "./url.js";

Vue.use(Router);
// import '../router/index'
const router = new Router({
  mode: "history",
  base: process.env.BASE_URL,
});

const Server = axios.create({
  	baseURL: "http://192.168.1.74:80/api/", //永华环境


	// baseURL: "http://81.71.41.147:30500/api/",
  // baseURL: "http://159.75.245.152:30050/api/", //测试环境
  // baseURL: "http://192.168.1.20:80/api/", //本地环境
  // timeout: 3000,
	//  baseURL: homeUrl,
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json; charset=utf-8",
  },
  // headers: { "Content-Type": "application/x-www-form-urlencoded " },
});
//使用Server创建请求拦截器
Server.interceptors.request.use(
  function(config) {
    if (localGet()) {
      config.headers.Authorization = localGet();
    }
    return config;
  },
  function(error) {
    return Promise.reject(error);
  }
);
//使用Server创建响应拦截器
Server.interceptors.response.use(
  function(response) {
    //判断接口返回的数据成功，直接返回数据中data数据
    if (response.data.code == 401) {
      Message.error(response.data.msg);
      localRemove();
      router.replace({ path: "/home" });
      // router.go(0)
      location.reload();
    }
    if (response.config.url == "merchant/merchant/importExcel") {
      return response;
    } else {
      if (response.data.code == 0) {
        return response.data;
      } else {
        Message.error(response.data.msg);
      }
    }
  },
  function(error) {
    return Promise.reject(error);
  }
);
export default Server;
