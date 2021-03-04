const webpack = require("webpack");

module.exports = {
    configureWebpack: {
        plugins: [
            new webpack.ProvidePlugin({
                $:"jquery",
                jQuery:"jquery",
                "windows.jQuery":"jquery"
            })
        ]
    },
    devServer: {
        host: '0.0.0.0',
        port: 8080,
        open: true,
        proxy: {
            '/api': {
                target:'http://localhost:8000',
                changeOrigin:true,
                ws: true,
                secure: false,
                pathRewrite:{
                    '^/api': ''
                }
            }
        }
    }
}

