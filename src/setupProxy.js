const { createProxyMiddleware } = require('http-proxy-middleware');

module.exports = function(app) {
  app.use(
    '/api',
    createProxyMiddleware({
      target: 'https://api.employeecornertelkom.com',
      changeOrigin: true,
      timeout: 5000, // Set the timeout to 5 seconds
      pathRewrite: { '^/api': '' }, // Removes '/api' from the start of the URL path
    })
  );
};
