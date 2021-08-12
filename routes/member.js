const express = require("express");
const { joinValidator, loginValidator } = require("../middleware/validator");
const { alert, go } = require("../lib/common");
const member = require("../models/member"); // member 모델
const router = express.Router();

router.route("/join")
	.get((req, res) => {

		return res.render("member/join");
	})
	.post(joinValidator, async (req, res) => {
		const result = await member.join(req.body);
		if (result) { 
			return go("/member/login", res, "parent");
		}
		
		//가입 실패
		return alert("가입에 실패했습니다.", res);
	});	

router.route("/login")
	.get((req, res) => {
		// 로그인 양식
		
		return res.render("member/login");
	})
	.post(loginValidator, async (req, res) => {
		// 로그인 처리
		const result = await member.login(req.body.memId, req.body.memPw, req);
		if (result) { 
			return go("/", res, "parent");
		}
		
		return alert("로그인 실패ㅠㅠ", res);
	});	

router.route("/logout")
	.get((req, res) => {
		
		req.session.destroy();
		
		return res.redirect("/");
	});

module.exports = router;