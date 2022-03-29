const fs = require('fs')
const server = require('http').createServer()

server.on('request', (req, res) => {
  // Solution 1

  //   fs.readFile('./test-file.txt', (err, data) => {
  //     if (err) console.log(err)
  //     res.end(data)
  //   })

  //   Solution 2
//   const readable = fs.createReadStream('test-file.txt')
//   readable.on('data', (chunk) => {
//     res.write(chunk)
//   })
//   readable.on('end', () => {
//     res.end()
//   })

  //   Solution 3
  const readable = fs.createReadStream('test-file.txt')
  readable.pipe(res)

  readable.on('error', (err) => {
      console.log(err)
      res.statusCode =500
      res.end('File Not Found')
  })
})

server.listen(8000, '127.0.0.1', () => {
  console.log('server is running on 8000')
})
