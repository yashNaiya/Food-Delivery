const express = require("express");
const app = express();
const cookieParser = require('cookie-parser')
const path = require('path')
require("./Connection/connection")
const dotenv = require('dotenv')
const PORT = process.env.PORT || 9002
dotenv.config({ path: "././config.env" })

var cors = require('cors')
app.use(cors());
const { createProxyMiddleware } = require('http-proxy-middleware');
app.use('https://yash-restaurant-backend.onrender.com', createProxyMiddleware({ 
    target: 'http://localhost:8080/', //original url
    changeOrigin: true, 
    //secure: false,
    onProxyRes: function (proxyRes, req, res) {
       proxyRes.headers['Access-Control-Allow-Origin'] = '*';
    }
}));

const User = require("./Models/Users")
app.use(cookieParser())
app.use(express.json())


app.use(require('./router/auth'))


app.get("/", function (req, res) {
    app.use(express.static(path.resolve(__dirname, './client/build')))
    res.sendFile(path.resolve(__dirname, './client/build/index.html'))
})

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Be Started at port ${process.env.PORT}`)
})