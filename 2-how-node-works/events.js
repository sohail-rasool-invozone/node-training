const events = require('events');
const http= require('http')


const eventEmitter = new events.EventEmitter();

eventEmitter.on('newSale',()=> {
    console.log('Sales are working')
})
eventEmitter.on('newSale',()=> {
    console.log('just test')
})
eventEmitter.on('newSale',(stockValue)=> {
    console.log(`we have now ${stockValue} in stock`)
})

eventEmitter.emit('newSale',9)

const server= http.createServer()

server.on('request',(req,res)=>{
    console.log('Request recived')
    res.end('Request recived')
})

server.on('request',(req,res)=>{
    console.log('Request 2 recived')
})
server.on('close',(req,res)=>{
    console.log('server close')
})

server.listen(8000,'localhost',()=>{
    console.log('server running on 8000')
})