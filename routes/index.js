const express = require("express");
const models = require("../models/index");

const router = express.Router();
let finished;
let unfinished;
router.get("/", function(req, res) {
  models.task.findAll({done: true})
    .then(function(data) {

	    res.render("index", {todos: data});
      
    })
    // models.task.findAll({done: false})
    // .then(function(data2) {
    // 	unfinished = data2;
    //   console.log(unfinished);
    // });
});
router.post("/", function(req, res) {
  models.task.create({
    name: req.body.name,
    done: false
  })
  .then(function(data) {
    res.redirect("/");
  });

});
router.get("/markoff/:id", function(req, res) {
	console.log("ID", req.params.id)
  models.task.findById(req.params.id)
    .then(function(task) {
    	console.log(task);
    	task.update({done: true}).then( function(stuff){
    		res.redirect("/");
    	})
    });
});
router.post("/delete/:id", function(req,res){
  models.task.destroy({
    where: {
    id: req.params.id
  }
  })
  res.redirect("/")
})
router.post("/edit/:id", function(req, res){
 models.task.update({
    name: req.body.name,
    done: false
  }, {
    where: {
      id: req.params.id
    }
  })
    .then(function(data) {
      res.redirect("/");
    })
    .catch(function(err) {
      res.redirect("/");
    });
})



module.exports = router;