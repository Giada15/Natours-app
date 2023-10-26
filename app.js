const fs = require('fs');
const express = require('express');

const app = express();

app.use(express.json());

// app.get('/', (req, res) => {
//   res
//     .status(200)
//     .json({ message: 'Hello from the server side', app: 'Natours' });
// });

// app.post('/', (req, res) => {
//   res.send('You can post to this endpoint...');
// });

const tours = JSON.parse(
  fs.readFileSync(`${__dirname}/dev-data/data/tours-simple.json`)
);

app.get('/api/v1/tours', (req, res) => {
  res.json({
    status: 'success',
    results: tours.length,
    data: {
      tours: tours,
    },
  });
});

app.post('/api/v1/tours', (req, res) => {
  //create new id for new object
  const newId = tours[tours.length - 1].id + 1;

  //create new object: add id to req.body
  const newTour = Object.assign({ id: newId }, req.body);

  //push new object to array
  tours.push(newTour);

  //write new array to data file
  fs.writeFile(
    `${__dirname}/dev-data/data/tours-simple.json`,
    JSON.stringify(tours),
    (err) => [
      res.status(201).json({
        status: 'success',
        data: {
          tour: newTour,
        },
      }),
    ]
  );
});

const port = 3000;
app.listen(port, () => console.log(`Listening on port ${3000}`));
