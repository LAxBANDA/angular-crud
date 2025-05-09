
export default {
  basePath: 'https://LAxBANDA.github.io/angular-crud',
  supportedLocales: {
  "en-US": ""
},
  entryPoints: {
    '': () => import('./main.server.mjs')
  },
};
