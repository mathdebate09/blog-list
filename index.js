const app = require('./app')
const config = require('./utils/config')
const logger = require('./utils/logger')

console.log('reach outside index')
app.listen(config.PORT, () => {
  console.log('reach inside index')
  logger.info(`Server running on port ${config.PORT}`)
  console.log('activated port index index')
})