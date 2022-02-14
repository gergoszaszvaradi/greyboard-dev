const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const DotEnv = require("dotenv-webpack");

module.exports = {
    mode: "none",
    target: "web",
    entry: path.join(__dirname, "src/webapp/index.tsx"),
    output: {
        filename: "bundle.js",
        path: path.join(__dirname, "dist/webapp"),
    },
    resolve: {
        extensions: [".js", ".ts", ".tsx"],
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/i,
                use: "ts-loader",
                exclude: "/node_modules/"
            },
            {
                test: /\.((c|sa|sc)ss)$/i,
                oneOf: [
                    {
                        resourceQuery: /\.module/,
                        use: [
                            "style-loader",
                            {
                                loader: "css-loader",
                                options: {
                                    modules: {
                                        localIdentName: "[path][name]__[local]--[hash:base64:5]",
                                    },
                                    sourceMap: true,
                                },
                            },
                            "sass-loader",
                        ],
                    },
                    {
                        use: [
                            "style-loader",
                            "css-loader",
                            "sass-loader",
                        ],
                    },
                ],
            },
            {
                test: /\.(png|jpe?g|gif|svg)$/i,
                type: "asset",
            },
        ],
    },
    plugins: [
        new DotEnv(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/webapp/index.html"),
            inject: false,
        })
    ],
    devtool: "source-map",
    devServer: {
        port: 3000,
        historyApiFallback: {
            index: '/',
        },
        proxy: {
            "/api": "http://localhost:5000",
            "/socket.io": {
                target: "http://localhost:5000",
                ws: true,
            },
        },
    },
};
