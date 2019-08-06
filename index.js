const express = require('express');

const Users = require('./data/db');

const server = express();

server.use(express.json())


server.post('/api/users', (req, res) => {
    const {name, bio} = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."})
    } else {
        Users.insert(req.body)
        .then(user => {
            res.status(201).json(user);
        })
        .catch(() => {
            res.status(500).json({errorMessage: 'Error adding user.'});
        });
    }
});

server.get('/api/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json(users);
    })
    .catch(() => {
        res.status(500).json({errorMessage: "The users information could not be retrieved."})
    })

})

server.get('/api/users/:id', (req, res) => {
    const userID = req.params.id;
    Users.findById(userID)
    .then(user => {
        if (user) {
            res.status(200).json(user)
        } else {
            res.status(404).json({ errorMessage: "The user with the specified ID does not exist." })
        }
    })
    .catch(() => {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." });
    });
});

server.delete('/api/users/:id', (req, res) => {
    const userID = req.params.id;
    Users.remove(userID)
    .then(id => {
        if (id === id || id > 0) {
            res.status(200).json({message: 'User deleted.'})
        } else {
            res.status(404).json({ errormessage: "The user with the specified ID does not exist." })
        }
    })
    .catch(() => {
        res.status(500).json({ errorMessage: 'The user could not be removed' });
    });
});

server.put('/api/users/:id', (req, res) => {
    const userID = req.params.id;
    const {name, bio} = req.body;
    if (!name || !bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user."});
    } else {
        Users.update(userID, req.body)
        .then(user => {
            if (user) {
                res.status(200).json(user)
            } else {
                res.status(404).json({ message: "The user with the specified ID does not exist." });
            }
        })
        .catch(() => {
            res.status(500).json({ errorMessage: "The user information could not be modified." });
        });
    }
});



const port = 8000;
server.listen(port, () => console.log('api running'));