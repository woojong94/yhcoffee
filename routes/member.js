const express = require('express');
const {loginValidator} = require("../middleware/validator");
const { alert, go } = require("../lib/common");
const member = require('../models/member');
const router = express.Router();
