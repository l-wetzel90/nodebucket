/*
============================================
; Title:  item.js
; Author: Loren Wetzel
; Modified By:
; Date:   18 March 2020
; Description: setup mongoose schema/model
;===========================================
*/

const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  text: {
    type: String
  }
});

module.exports = itemSchema;
