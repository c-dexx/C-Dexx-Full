const express = require('express');
const bodyParser = require('body-parser');
const User = require('./collections/user.js');  // No need for 'import' here
const Review = require('./collections/review.js');
require('./connection.js');  // No need for 'import' here
const cors = require('cors');
const { fileURLToPath } = require('url');
const { dirname } = require('path');

const route = express();



route.use(cors({
  origin: 'http://localhost:3001',
  methods: ['GET', 'POST', 'OPTIONS'],
  allowedHeaders: ['Content-Type']
}));
route.use(bodyParser.json());
route.use(bodyParser.urlencoded({ extended: true }));

route.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

route.post('/users', (req, res) => {
  console.log('Request body:', req.body);
  User.create(req.body)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      console.error('Error creating user:', err);
      res.status(500).send(err);
    });
});

route.get('/users', (req, res) => {
  User.find().then(users => {
    res.send(users);
  }).catch(err => {
    res.status(500).send(err);
  });
});

route.get('/users/:id', (req, res) => {
  User.findById(req.params.id).then(user => {
    res.send(user);
  }).catch(err => {
    res.status(404).send(err);
  });
});

route.put('/users/:id', (req, res) => {
  User.findByIdAndUpdate(req.params.id, req.body, { new: true }).then(user => {
    res.send(user);
  }).catch(err => {
    res.status(500).send(err);
  });
});
route.delete('/users/:id', (req, res) => {
  User.findByIdAndRemove(req.params.id).then(() => {
    res.send({ message: 'User deleted successfully' });
  }).catch(err => {
    res.status(500).send(err);
  });
});
route.post('/review', (req, res) => {
  console.log(req.body);
  Review.create(req.body)
    .then((review) => {
      res.send(review);
    })
    .catch((err) => {
      res.status(500).send(err);
    });
});
route.get('/review', (req, res) => {
  Review.find().then(reviews => {
    res.send(reviews);
  }).catch(err => {
    res.status(500).send(err);
  });
});
route.get('/review/:id', (req, res) => {
  Review.findByIdAndRemove(req.params.id).then(() => {
    res.send({ message: 'Review deleted successfully' });
  }).catch(err => {
    res.status(500).send(err);
  });
});
route.post('/users/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    console.log(req.body);
    
    // If user exists and password matches, return user data
    if (user && user.password === password) { // Ideally, hash passwords in production
      res.status(200).send({
        message: 'Login successful',
        user: { _id: user._id, email: user.email, nama: user.nama },
      });
    } else {
      res.status(401).send({ error: 'Invalid email or password' });
    }
  } catch (err) {
    console.error('Error during login:', err);
    res.status(500).send({ error: 'Internal server error' });
  }
});

const port = 3000;
route.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
module.exports = route;