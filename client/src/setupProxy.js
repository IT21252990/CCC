const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
    app.use(
        '/auth',  // Adjust this path based on your API endpoints
        createProxyMiddleware({
            target: 'http://localhost:5000',  // Your backend server URL
            changeOrigin: true,
            onProxyRes: function(proxyRes) {
                // Remove the X-Powered-By header if it appears
                delete proxyRes.headers['x-powered-by'];
            }
        })
    );
};
