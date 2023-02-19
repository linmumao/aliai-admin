const path = require("path");
const resolve = (dir) => path.join(__dirname, "./", dir);
module.exports = {
	publicPath: process.env.BASE_URL,
	outputDir: "add-client",
	lintOnSave: true,
	assetsDir: "static",
	devServer: {
		disableHostCheck: true,
		// proxy: {
		// 	"^/url": {
		// 		target: "http://42.193.250.42:30600/",
		// 		changeOrigin: true,
		// 		secure: false, //如果是http接口，需要配置该参数
		// 		pathRewrite: {
		// 			"^/url": "",
		// 		},
		// 	},
		// },
	},
	productionSourceMap: false,
	chainWebpack: (config) => {
		// another name
		config.resolve.alias
			.set("@", resolve("src"))
			.set("@v", resolve("src/views"))
			.set("@c", resolve("src/components"))
			.set("@u", resolve("src/utils"))
			.set("@s", resolve("src/service")); /*别名配置*/
		config.optimization.runtimeChunk("single");
	},
};
