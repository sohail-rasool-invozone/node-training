const fs = require('fs')
const http = require('http')
const url = require('url')
const slugify = require('slugify')
const replaceTemplate = require('./modules/replaceTemplate.js')



//  Synchrnous Way - Blocking
//  const textIn = fs.readFileSync('./txt/input.txt','utf-8')

//  const textOut = `I Know about avocado is ${textIn} \n Create On ${Date.now()}`

//  fs.writeFileSync('./txt/output.txt',textOut)
//  console.log('Text is Written !!!')

//  Async way - non blocking

//  fs.readFile('./txt/start.txt', 'utf-8', (err, data) => {
//    fs.readFile(`./txt/${data}.txt`, 'utf-8', (err, data2) => {
//      fs.readFile(`./txt/append.txt`, 'utf-8', (err, data3) => {
//          fs.writeFile('./txt/final.txt', `asdsad ${data2} \n ${data3}`, err => {
//              console.log(`files are written`)
//          })
//      })
//    })
//  })
//  console.log('files will read !!!!')

/// //// //// ///// //// ///// ////// ///// ////// Server /////// /////// ///// //// //// ///// //////

const tempOverView = fs.readFileSync(
  `${__dirname}/templates/template-overview.html`,
  'utf-8'
)
const tempCard = fs.readFileSync(
  `${__dirname}/templates/template-card.html`,
  'utf-8'
)
const tempProduct = fs.readFileSync(
  `${__dirname}/templates/template-product.html`,
  'utf-8'
)

const data = fs.readFileSync(`${__dirname}/dev-data/data.json`, 'utf-8')
const productData = JSON.parse(data)

const slugs = productData.map((product) => slugify(product.productName,{lower:false}))

console.log(`slugs are ${slugs}`)



const server = http.createServer((req, res) => {
  const { pathname, query } = url.parse(req.url, true)
  // Overview Page

  if (pathname === '/' || pathname === '/overview') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    const cardHTML = productData
      .map((product) => replaceTemplate(tempCard, product))
      .join('')

    const output = tempOverView.replace(/{%PRODUCT_CARDS%}/g, cardHTML)

    res.end(output)

    // Product Page
  } else if (pathname === '/product') {
    res.writeHead(200, { 'Content-type': 'text/html' })
    const product = productData[query.id]
    const output = replaceTemplate(tempProduct, product)
    res.end(output)

    // API Page
  } else if (pathname === '/api') {
    res.writeHead(200, {
      'Content-type': 'application/json',
    })
    res.end(data)

    // Not found Page
  } else {
    res.writeHead(404, {
      'Content-type': 'text/html',
      'my-own-header': 'hello',
    })
    res.end('<h1>404 not found</h1>')
  }
})

server.listen(8000, 'localhost', () => {
  console.log('server is running on 8000')
})
