const member = require("../models/member");

module.exports = async (req, res, next) => {	
	if (req.session.memId) {
		const info = await member.get(req.session.memId);
		if (info) {
			req.isLogin = res.isLogin = res.locals.isLogin = true;
			req.member = res.member = res.locals.member = info;
		}
	}
	next();
};
