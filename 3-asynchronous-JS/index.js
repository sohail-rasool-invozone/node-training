const fs = require('fs')
const axios = require('axios')

const getBreedImage = async (data) => {
  try {
    const res = await axios.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    )
    console.log(res.data.message)
    fs.writeFile('./dog-images.txt', res.data.message, (err) => {
      console.log('files written')
    })
  } catch (error) {
    console.error(error.response.data.message)
  }
}

const readFilePro = (file) => {
	return new Promise((resolve,reject) => {
		fs.readFile(file,'utf-8',(err,data)=>{
			if (err) reject('file not found')
			resolve(data)
		})
	}) 
}
readFilePro(`${__dirname}/dog.txt`).then((data)=>{
	getBreedImage(data)
})

// fs.readFile(`${__dirname}/dog.txt`, 'utf-8', async (err, data) => {
//   getBreedImage(data)
//   if (err) console.error(err)
// })
