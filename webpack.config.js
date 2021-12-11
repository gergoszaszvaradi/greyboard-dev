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
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: "/node_modules/"
            }
        ],
    },
    plugins: [
        new DotEnv(),
        new HtmlWebpackPlugin({
            template: path.join(__dirname, "src/webapp/assets/index.html"),
        })
    ],
    devtool: "source-map",
    devServer: {
        port: 3000,
        watchContentBase: true,
    },
};
