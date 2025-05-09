
export default {
  bootstrap: () => import('./main.server.mjs').then(m => m.default),
  inlineCriticalCss: true,
  baseHref: 'https://LAxBANDA.github.io/angular-crud/',
  locale: undefined,
  routes: [
  {
    "renderMode": 2,
    "route": "/angular-crud"
  }
],
  entryPointToBrowserMapping: undefined,
  assets: {
    'index.csr.html': {size: 16922, hash: '1d971a53474090e6c7bc2b9c62532b5cacd8110d23f242f14102b5cd4ce0b0fb', text: () => import('./assets-chunks/index_csr_html.mjs').then(m => m.default)},
    'index.server.html': {size: 17178, hash: 'ee07eaa1f1172a1d0418f9475bcf35263626cefc6183657b320d27e581e3e4b8', text: () => import('./assets-chunks/index_server_html.mjs').then(m => m.default)},
    'index.html': {size: 320468, hash: '9ff52fba06168bce5c4968385378a3d84f40f772d01b84aa15b3073f63add100', text: () => import('./assets-chunks/index_html.mjs').then(m => m.default)},
    'styles-547HEYEM.css': {size: 170, hash: 'R1lxbYFXGkQ', text: () => import('./assets-chunks/styles-547HEYEM_css.mjs').then(m => m.default)}
  },
};
