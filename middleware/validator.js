const { alert } = require("../lib/common");
const logger = require("../lib/logger");
const fs = require("fs").promises;
const constants = require("fs").constants;
const path = require("path");

module.exports.joinValidator = async (req, res, next) => {
	
	try {
		
		const required = {
			memId : "아이디를 입력하세요.",
			memPw : "비밀번호를 입력하세요.",
			memPwRe : "비밀번호를 확인하세요.",
			memNm : "회원명을 입력하세요.",
		};
		
		for (key in required) {
			if (!req.body[key]) {
				throw new Error(required[key]);
			}
		}
		
		if (req.body.memId.length < 6) {
			throw new Error("아이디는 6자리 이상 입력해 주세요.");
		}
		
		if (req.body.memPw.length < 10) {
			throw new Error("비밀번호는 8자리 이상 입력해 주세요.");
		}
		
		if (req.body.memPw != req.body.memPwRe) {
			throw new Error("비밀번호가 일치하지 않습니다.");
		}
		
		
		try {
			const filePath = path.join(__dirname, "../data/member/", req.body.memId + ".json");
			await fs.access(filePath, constants.F_OK);
			
				
				return alert("이미 가입하셨습니다. - " + req.body.memId, res);
		} catch(e) { 
			
		}
		
	} catch (err) {
		logger(err.message, "error");
		return alert(err.message, res);
	}
	next();
};


module.exports.loginValidator = (req, res, next) => {
	try {
		if (!req.body.memId) {
			throw new Error("아이디를 입력하세요!!!");
		}
		
		if (!req.body.memPw) {
			throw new Error("비밀번호를 입력하세요!!!");
		}
		
	} catch(err) {
		return alert(err.message, res);
	}
	next();
};