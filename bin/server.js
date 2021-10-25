import app from '../app'
import { createLog } from '../log'

const log = createLog('server')

const PORT = process.env.PORT || 4040
const HOST = process.env.PORT || 'localhost'

app.listen(PORT, HOST, (err, address) => {
  if (err) {
    log.error(err)
    process.exit(1)
  }

  log.info(`Server listening on ${address}`)
})
