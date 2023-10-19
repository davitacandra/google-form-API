import Fastify from 'fastify'
import { config } from 'dotenv'

config()

const PORT = process.env.PORT! || 3000
const fastify = Fastify({ logger: true })

fastify.addContentTypeParser('*', (_request, payload, done) => {
  let data = ''
  payload.on('data', (chunk) => {
    data += chunk
  })
  payload.on('end', () => {
    done(null, data)
  })
})

fastify.all('*', (req, reply) => {
  console.log(req.method)
  console.log(req.url)
  console.log(req.headers)
  console.log(req.body)
  reply.send('OK')
})

fastify.listen({ port: +PORT, host: '0.0.0.0' }, (err) => {
  if (err) throw err
})
