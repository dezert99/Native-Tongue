module.exports = app => {
    const user = require("../controllers/users_controller.js");

    // Create a new User
    app.post("/user", user.create);

    // Retrieve all user
    app.get("/user", user.findAll);

    // Update a User with username
    app.put("/user", user.update);

    app.post("/login", user.login);

};
    