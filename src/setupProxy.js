const {createProxyMiddleware} = require("http-proxy-middleware");

module.exports = app => {
  app.use(
  	createProxyMiddleware("/getpassList", { 
  		target: " https://dermaiserver.herokuapp.com" ,
  		secure: false,
  		changeOrigin: true
  	})
  );
  app.use(
  	createProxyMiddleware("/getUserDetails", { 
  		target: " https://dermaiserver.herokuapp.com" ,
  		secure: false,
  		changeOrigin: true
  	})
  );
  app.use(
  	createProxyMiddleware("/postUserDetails", { 
  		target: " https://dermaiserver.herokuapp.com" ,
  		secure: false,
  		changeOrigin: true
  	})
  );
};