const fs = require('fs')
const express = require('express')
const app = express()

app.use(express.json())

const tours = JSON.parse(
  fs.readFileSync(
    `${__dirname}/dev-data/data/tours-simple.json`,
    'utf-8'
  )
)

const getAllTours = (req, res) => {
  res.status(200).json({
    statue: 'success',
    results: tours.length,
    data: {
      tours,
    },
  })
}

const getTour = (req, res) => {
  const id = req.params.id * 1
  const tour = tours.find(
    (tour) => tour.id === id
  )

  if (!tour) {
    return res.status(404).json({
      status: 'fail',
      message: 'id not found',
    })
  }

  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  })
}

const createTour = (req, res) => {
  const tourId = tours[tours.length - 1].id + 1
  const newTour = Object.assign(
    { id: tourId },
    req.body
  )
  tours.push(newTour)
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => {
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      })
    }
  )
}

const updateTour = (req, res) => {
  const id = req.params.id * 1
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'id not found',
    })
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour: '<Update tour here.....>',
    },
  })
}

const deleteTour = (req, res) => {
  const id = req.params.id * 1
  if (id > tours.length) {
    return res.status(404).json({
      status: 'fail',
      message: 'id not found',
    })
  }
  res.status(204).json({
    status: 'success',
    data: null,
  })
}

// Get All Tours
// app.get('/api/v1/tours', getAllTours)

//Get tour by id
// app.get('/api/v1/tours/:id', getTour)

// Create New Tour
// app.post('/api/v1/tours', createTour)

// Update Tour
// app.patch('/api/v1/tours/:id', updateTour)

// Delete Tour
// app.delete('/api/v1/tours/:id', deleteTour)

app
  .route('/api/v1/tours')
  .get(getAllTours)
  .post(createTour)

app
  .route('/api/v1/tours/:id')
  .get(getTour)
  .patch(updateTour)
  .delete(deleteTour)

// Server
const port = 8000
app.listen(port, () => {
  console.log(
    `App is running on port ${port}.....`
  )
})
