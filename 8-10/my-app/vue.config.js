module.exports = {
  devServer: {
    open: true,
    port: 1111,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        pathRewrite: {}
      }
    }
  }
};
