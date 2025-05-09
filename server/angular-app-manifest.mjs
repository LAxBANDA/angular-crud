
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: '/angular-crud/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/angular-crud"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 16896, hash: '42b235fbba00bc6243840e1791c7cece627b4cb0e25b05d83831387f74890402', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17152, hash: 'cf0c32ffd1731cf540aef9799bd8c14a9ad8cc4b9a4cf82fe163b7f61fa0bafa', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 320442, hash: '22a67daae1c37c17aaf5520a3b00a5a5a56e95deb2cf52f858320fa17906a2bc', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-547HEYEM.css': {size: 170, hash: 'R1lxbYFXGkQ', text: () => import('./assets-chunks/styles-547HEYEM_css.mjs').then(m => m.default)}
  },
};
