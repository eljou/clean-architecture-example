import 'module-alias/register' // sets up the transpilation modules mechanism
import server from './infrastructure/server'

const PORT = process.env.PORT || 8080
server.listen(PORT)
console.log('listening over port', PORT)
