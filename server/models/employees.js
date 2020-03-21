/*
============================================
; Title:  employee.js
; Author: Loren Wetzel
; Modified By:
; Date:   18 March 2020
; Description: setup mongoose schema/model
;===========================================
*/

const mongoose = require('mongoose');
// const Item = require('./items');

// const employeeSchema = new mongoose.Schema({
//   empId: {
//     type: String,
//     unique: true,
//     dropDups: true,
//     required: true
//   },
//   firstName: {type: String},
//   lastName: {type: String},
//   todo: [Item],
//   done: [Item]
// });

const itemSchema = new mongoose.Schema({
  text: {type: String}
  // finished: { type: Boolean,
  //   default: false }
});

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
  done: [itemSchema]
});

module.exports = mongoose.model('Employee', employeeSchema);

// const Employee = module.exports = mongoose.model('Employee', employeeSchema);

// module.exports.getById = (id, callback) => {
//   var query = { empId: id };
//   Employee.findById(query, callback);
// };

// module.exports.getAll = (callback) => {
//   // var query = { };
//   Employee.find({}, callback);
// };
