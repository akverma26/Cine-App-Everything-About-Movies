const path = require("path");
const UglifyJsPlugin = require("uglifyjs-webpack-plugin");

module.exports = {
    entry: "./src/js/index.ts",
    mode: "development",
    output: {
        filename: "main.bundle.min.js",
        path: path.resolve(__dirname, "dist"),
    },
    optimization: {
        minimizer: [
            new UglifyJsPlugin({
                test: /\.min\.js$/,
                include: /\.min\.js$/,
            }),
        ],
    },
    module: {
        rules: [
            {
                test: /\.s[ac]ss$/i,
                use: [
                    // Creates `style` nodes from JS strings
                    "style-loader",
                    // Translates CSS into CommonJS
                    "css-loader",
                    // Compiles Sass to CSS
                    "sass-loader",
                ],
            },
            {
                test: /\.tsx?$/,
                use: "ts-loader",
                exclude: /node_modules/,
            },
            {
                test: /\.(png|woff|woff2|otf|eot|ttf|svg)$/,
                loader: "url-loader?limit=100000",
            },
        ],
    },
};
