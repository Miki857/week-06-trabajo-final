const User = require("../../models/User");
const user = async () => {
    const body = {
        firstName: "Pepito",
        lastName: "Carrasquilla",
        email: "pepito@gmail.com",
        password: "pepito",
        phone: "+00 123456789"
    }

    await User.create(body);
};

module.exports = user;