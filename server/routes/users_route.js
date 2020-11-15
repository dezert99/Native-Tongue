module.exports = app => {
    const user = require("../controllers/users_controller.js");

    // Create a new Announcement
    app.post("/user", user.create);

    // Retrieve all user
    app.get("/user", user.findAll);

    // Update a Announcement with aID
    app.put("/user", user.update);

    // Delete a Announcement with aID
    app.delete("/user", user.delete);

};
    