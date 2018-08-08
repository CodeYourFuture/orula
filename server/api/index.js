const express = require("express");
const router = express.Router();
const db = require("../helpers/db");

router.get("/status", (req, res) => res.send({ status: "OK" }));

// get '/classes'
router.get("/classes", (req, res) => {
    db.getClasses().then(
            data => {
                res.send(data);
            });
});

// get '/classes/:id'
router.get("/classes/:id", (req, res) => {
    const class_id = `${req.params.id}`;
    db.getClasses().where(
        'class_id', '=', class_id).then(
            data => {
                res.send(data);
            });
});


// post '/classes/'
router.post("/classes", (req, res) => {
    const body = req.body;
    db.getClasses().insert([{
        class_id:
            `${body.class_id}`,
        name: `${body.name}`,
        created_at: `${body.created_at}`,
        updated_at: `${
            body.updated_at}`
    }]).then(
        data => {
            res.send("successfully classes added");
        });
});

// put '/classes/:id'
router.put("/classes/:id", (req, res) => {
    const class_id = `${req.params.id}`;
    const body = req.body;
    db.getClasses().where('class_id', '=', class_id).update({
        name: `${body.name}`,
        created_at: `${body.created_at}`
    }).then(data => {
        res.json(data);
    });
});

// delete '/classes/:id'
router.delete("/classes/:id", (req, res) => {
    const class_id = `${req.params.id}`;
    db.getClasses().where(
        'class_id', '=', class_id).del().then(
            data => {
                res.json(data);
            });
});
module.exports = router;
