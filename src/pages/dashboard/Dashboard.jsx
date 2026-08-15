import React from 'react';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard MyZubster</h1>
      <p>Benvenuto nella dashboard di amministrazione.</p>
    </div>
EOFort default Dashboard;
root@myzubster:~/repos/MyZubsterWeb# # Crea una struttura base per le pagine
mkdir -p src/pages/admin src/pages/bounties src/pages/garden src/pages/taz

# Crea componenti placeholder per ogni pagina
for page in admin bounties garden taz; do
  cat > src/pages/${page}/${page^}.jsx << EOF
import React from 'react';

const ${page^} = () => {
  return <div><h1>${page^} Page</h1><p>Componente placeholder per ${page}.</p></div>;
};

donert default ${page^};
root@myzubster:~/repos/MyZubsterWeb# npm run build

> myzubster-web@1.0.0 build
> react-scripts build

Creating an optimized production build...
Failed to compile.

Module not found: Error: Can't resolve './pages/marketplace/Marketplace' in '/root/repos/MyZubsterWeb/src'


root@myzubster:~/repos/MyZubsterWeb#
cd ~/repos/MyZubsterWeb

cat > server-static.js << 'EOF'
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const path = require('path');

const app = express();

// Proxy per le API (backend su porta 5003)
app.use('/api', createProxyMiddleware({
  target: 'http://localhost:5003',
  changeOrigin: true,
}));

// Servi i file statici dalla cartella corrente
app.use(express.static(__dirname));

// Per le route SPA (se usi React Router)
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

const PORT = 5173;
app.listen(PORT, '0.0.0.0', () => {
  console.log(`🚀 Server static + proxy running on http://0.0.0.0:${PORT}`);
  console.log(`🔗 Health proxy: http://localhost:${PORT}/api/health`);
});
