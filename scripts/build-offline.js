/* eslint-env node */
const { buildWithArgs } = require('wpsjs/src/lib/build')

buildWithArgs({ pluginType: 'offline' })
  .then(() => console.log('离线插件构建成功'))
  .catch(e => { console.error('构建失败:', e); process.exit(1) })
