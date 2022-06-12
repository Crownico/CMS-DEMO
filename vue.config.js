const AutoImport = require("unplugin-auto-import/webpack");
const Components = require("unplugin-vue-components/webpack");
const { ElementPlusResolver } = require("unplugin-vue-components/resolvers");

const { defineConfig } = require("@vue/cli-service");
module.exports = defineConfig({
  devServer: {
    // 设置代理解决跨域问题
    proxy: {
      "^/api": {
        target: "http://192.168.139.1:8080",
        // target: "",
        pathRewrite: {
          "^/api": ""
        },
        changeOrigin: true
      }
    }
  },
  transpileDependencies: true,
  // publicPath: "./",
  configureWebpack: {
    plugins: [
      AutoImport({
        resolvers: [ElementPlusResolver()]
      }),
      Components({
        resolvers: [ElementPlusResolver()]
      })
    ]
  }
});
