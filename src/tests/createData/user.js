const User = require("../../models/User");
const request = require('supertest');
const app = require('../../app');
const user = async () => {
    const body = {
        firstName: "Pepito",
        lastName: "Carrasquilla",
        email: "pepito@gmail.com",
        password: "pepito",
        phone: "+00 123456789"
    }

    //Create User:
    await User.create(body);
    //Login User:
    await request(app)
        .post(`/api/v1/users/login`)
        .send({email: body.email, password: body.password});
};

module.exports = user;