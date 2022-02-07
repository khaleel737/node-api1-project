// BUILD YOUR SERVER HERE

const express = require('express');
const res = require('express/lib/response');
const userModel = require('./users/model.js');
const server = express();

server.use(express.json());



server.get('/', (req, res) => {
    console.log('received get request!');
    res.json("hello world!");
});


server.get('/api/users', async (req, res) => {
    try {
       const data = await userModel.find()
       return res.json(data);
    } catch (err) {
        res.status(500).json({ message: "The users information could not be retrieved" })
    }

})

server.post('/api/users' ,async (req, res) => {
    try {
        const { name, bio } = req.body;
        console.log(name, bio);
        const newUser = await userModel.insert({ name, bio });
        console.log(newUser);
        res.status(201).json(newUser)
        if(!newUser) {
            res.status(400).json({ message: "Please provide name and bio for the user"})
        } 
        
    } catch (err) {
        res.status(500).json({ message: "There was an error while saving the user to the database" })
    }
})

server.get('/api/users/:id', async (req, res) => {
    try {
        let { id } = req.params;
        const findUser = await userModel.findById(id);
        res.json(findUser)
    } catch (err) {
        res.status(500).json({ message: "The user information could not be retrieved" })
    }
})

server.delete('/api/users/:id', async (req, res) => {
    try {

        const removeUser = await userModel.remove(req.params.id)
        res.json(removeUser);
    } catch (err) {
        res.status(500).json({ message: "The user could not be removed" })
    }
})


server.put('/api/users/:id', async (req, res) => {
    let { id } = req.params;
    let { name, bio } = req.body;
    console.log(id, name, bio);
try {
    const updateUser = await userModel.update(id, { name, bio });
    res.json(updateUser)

} catch (err) {
    res.status(500).json({ message: "The user information could not be modified" })
}
})





// [GET]    /api/users/:id (R of CRUD, fetch user by :id)
// [POST]   /api/users     (C of CRUD, create new user from JSON payload)
// [PUT]    /api/users/:id (U of CRUD, update user with :id using JSON payload)
// [DELETE] /api/users/:id (D of CRUD, remove user with :id)

module.exports = server; // EXPORT YOUR SERVER instead of {}