module.exports = {
    module: {
        rules: [
            {
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader"
                },
            },
            {
                test: /\.css$/,
                // exclude: /(node_modules)/, // Remove this 
                use: [
                  { loader: 'style-loader' },
                  { loader: 'css-loader' },
                ],
            },
            // {
            //     test: /\.(jpe?g|png|gif|woff|woff2|eot|ttf|svg)(\?[a-z0-9=.]+)?$/,
            //     loader: 'url-loader?limit=100000' 
            // }
            {
                test: /\.(png|jpe?g|gif)$/i,
                loader: 'file-loader'
            }  
        ]
    }
}