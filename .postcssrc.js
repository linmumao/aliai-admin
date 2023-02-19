module.exports = {
  // 配置要使用的 PostCSS 插件
  plugins: {

    // 配置使用 postcss-pxtorem 插件
    // 作用：把 px 转为 rem
    "postcss-pxtorem": {
      "rootValue": 32,
      "propList": ["*"]
    }
  }
}

