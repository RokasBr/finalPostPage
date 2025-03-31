const express = require('express');
const {faker} = require('@faker-js/faker');
const users = express()

console.log(faker.person.firstName());
const users = [];
let maxUserId = 0;
users.get('/create/:name', (req, res) =>
{
    maxUserId++;

    // Create user object with all required fields
    const user = {
        id: maxUserId, // Use incremented maxUserId
        name: req.params.name,
        lastName: faker.person.lastName(),
        email: faker.internet.email(),
        ip: faker.internet.ip()
    };

    // Add user to global users array
    users.push(user);

    // Respond with created user
    res.json(user);

})
users.get('/delete/:id', (req, res) => {
    const userId = parseInt(req.params.id);
    // Find index of user with matching ID
    const userIndex = users.findIndex(user => user.id === userId);

    if (userIndex !== -1) {
        users.splice(userIndex, 1);
        res.json({ message: 'User deleted successfully' });
    } else {
        res.status(404).json({ message: 'User not found' });
    }
});


users.get('/users', (req, res) => {
    res.json(users);
});


users.listen(2001)
console.log('listening on port 2001')