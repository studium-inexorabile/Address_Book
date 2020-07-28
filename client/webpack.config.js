const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Configures Webpack details for bundling application.

module.exports  = (env) => {
    // checks development environment (production or dev)
    const isProduction = env === 'production'
    return {
        // sets entry point for bundling
        entry:'./src/app.js',
        output: {
            //sets output point for bundled app 
            path:path.join(__dirname,'public', 'dist'),
            filename:'bundle.js'
        },
        module:{
            // specifies what libraries to use for translating .js and .css
            rules:[{
                loader: 'babel-loader',
                test: /\.js$/,
                exclude: /node_modules/
            },{
                test: /\.s?css$/,
                use: [
                    MiniCssExtractPlugin.loader,
                    {
                        loader: 'css-loader',
                        options:{
                            url: false,
                            sourceMap: true
                        }
                    },
                    {
                        loader: 'sass-loader',
                        options: {
                            sourceMap: true
                        }
                    }
                ]
            }]
        },
        plugins:[
            new MiniCssExtractPlugin({
                filename:'styles.css'
            })
        ],
        // configures dev-tools based on production or development environment
        devtool: isProduction ? 'source-map' : 'inline-source-map',
        devServer:{
            contentBase: path.join(__dirname,'public'),
            historyApiFallback:true,
            publicPath: '/dist/'
        }
    }
}