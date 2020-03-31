/*
============================================
; Title:  employee.js
; Author: Loren Wetzel
; Modified By:
; Date:   18 March 2020
; Description: setup mongoose schema/model
;===========================================
*/

/**
 * this is how the book showed to do this
 */

const mongoose = require('mongoose');

//item schema
const itemSchema = new mongoose.Schema({
  text: {type: String}
});

//employee schema
const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    unique: true,
    dropDups: true,
    required: true
  },
  firstName: {type: String},
  lastName: {type: String},
  todo: [itemSchema],
  done: [itemSchema],
  inProgress: [itemSchema]
});

module.exports = mongoose.model('Employee', employeeSchema);

/*
const Item = require('./items');

const employeeSchema = new mongoose.Schema({
  empId: {
    type: String,
    unique: true,
    dropDups: true,
    required: true
  },
  firstName: {type: String},
  lastName: {type: String},
  todo: [Item],
  done: [Item]
});

const Employee = module.exports = mongoose.model('Employee', employeeSchema);

module.exports.getById = (id, callback) => {
  var query = { empId: id };
  Employee.findById(query, callback);
};

module.exports.getAll = (callback) => {
  // var query = { };
  Employee.find({}, callback);
};
*/
