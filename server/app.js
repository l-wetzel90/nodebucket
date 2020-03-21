/**
 * Require statements
 */
const express = require("express");
const http = require("http");
const morgan = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");

/**
 * App configurations
 */
let app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "../dist/nodebucket")));
app.use("/", express.static(path.join(__dirname, "../dist/nodebucket")));

/**
 * Variables
 */
const port = 3000; // server port

//require employee model
const Employee = require("./models/employees");


// TODO: This line will need to be replaced with your actual database connection string
const conn =
  "mongodb+srv://admin:admin@buwebdev-cluster-1-7jtao.mongodb.net/nodebucket?retryWrites=true&w=majority";

/**
 * Database connection
 */
mongoose
  .connect(conn, {
    promiseLibrary: require("bluebird"),
    useUnifiedTopology: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.debug(`Connection to the database instance was successful`);
  })
  .catch(err => {
    console.log(`MongoDB Error: ${err.message}`);
  }); // end mongoose connection

/**
 * API(s)
 */
//get all employees
// app.get("/api/employees", (req, res, next) => {
//   //get all employee
//   Employee.find({}, "empId" , (err, employee) => {
//     if (err) {
//       console.log(err);
//       return next(err);
//     } else {
//       console.log(employee);
//       res.json(employee);
//     }
//   });
// });

//FindEmployeeById
app.get("/api/employees/:empId", (req, res, next) => {
  //get one employee
  Employee.findOne({ empId: req.params.empId }, (err, employee) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);
      res.json(employee);
    }
  });
});

//FindAllTasks
app.get("/api/employees/:empId/tasks", (req, res, next) => {
  //find all tasks
  Employee.findOne(
    { empId: req.params.empId },
    "empId todo done",
    (err, employee) => {
      if (err) {
        console.log(err);
        return next(err);
      } else {
        console.log(employee);
        res.json(employee);
      }
    }
  );
});

//CreateTask:
app.post("/api/employees/:empId/tasks", (req, res, next) => {
  //add task
  Employee.findOne({ empId: req.params.empId }, (err, employee) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      //creates item for task
      const item = {
        text: req.body.text
      };

      //push item to array
      employee.todo.push(item);

      //save to db
      employee.save(function(err, employee) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(employee);
          res.json(employee);
        } //end .save if else
      }); //end of .save method
    } //end find one if/else
  }); //end of findOne method
}); //end of api post

//UpdateTask:   maybe taskId in url
app.put("/api/employees/:empId/tasks", (req, res, next) => {
  //update task to done
  Employee.findOne({ empId: req.params.empId }, (err, employee) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      employee.set({
        todo: req.body.todo,
        done: req.body.done
      });

/*
was tryting something else
// const todoItem = employee.todo.find(
      //   item => item._id.toString() === req.params.taskId
      // );

      //push item to array
      employee.done.push(todoItem);
      //remove item from db
      employee.todo.id(todoItem._id).remove();
      */

      //save to db
      employee.save(function(err, employee) {
        if (err) {
          console.log(err);
          return next(err);
        } else {
          console.log(employee);
          res.json(employee);
        } //end .save if else
      }); //end of .save method
    } //end find one if/else
  }); //end of findOne method
}); //end of api post

//DeleteTask:
app.delete("/api/employees/:empId/tasks/:taskId", function(req, res, next) {
  Employee.findOne({ empId: req.params.empId }, (err, employee) => {
    if (err) {
      console.log(err);
      return next(err);
    } else {
      console.log(employee);

      //db id for item
      const todoItem = employee.todo.find(
        item => item._id.toString() === req.params.taskId
      );
      const doneItem = employee.done.find(
        item => item._id.toString() === req.params.taskId
      );

      //if/else to remove task from todo or done
      if (todoItem) {
        employee.todo.id(todoItem._id).remove();
        employee.save(function(err, emp1) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log('Deleted ' + emp1);
            res.json(emp1);
          }
        }); //end of save
      } else if (doneItem) {
        employee.done.id(doneItem._id).remove();
        employee.save(function(err, emp2) {
          if (err) {
            console.log(err);
            return next(err);
          } else {
            console.log('Deleted ' + emp2);
            res.json(emp2);
          } //end of if else in save
        }); //end of save
      } else {
        console.log("Unable to locate task: ${req.params.taskId}");
        res.status(200).send({
          type: "warning",
          text: "Unable to locate task: ${req.params.taskId}"
        }); //end of .send
      } //end of if/else
    } //end of if/else for .findOne
  }); //end of findone
}); //end of .delete

/**
 * Create and start server
 */
http.createServer(app).listen(port, function() {
  console.log(`Application started and listening on port: ${port}`);
}); // end http create server function
