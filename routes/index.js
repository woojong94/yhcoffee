const express = require("express");
const router = express.Router();

router.get("/", (req, res) => {
	return res.render("main/index");	// main -> views 폴더 기준
});

module.exports = router;