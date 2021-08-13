const express = require("express");
const nunjucks = require("nunjucks");
const morgan = require("morgan");
const dotenv = require("dotenv");
const cookieParser = require("cookie-parser");
const session = require("express-session");
const path = require("path");
const logger = require("./lib/logger");
const bootStrap = require("./boot");

const memberRouter = require("./routes/member");
const mainRouter = require("./routes")

const app = express();

dotenv.config();

app.set("PORT", process.env.PORT || 3004);
app.set("view engine", "html");
nunjucks.configure(path.join(__dirname, "views"), {
	express : app,
	watch : true,
});

app.use(morgan("dev"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.json());
app.use(express.urlencoded({ extended : false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
	resave : false,
	saveUninitialized : true,
	secret : process.env.COOKIE_SECRET,
	cookie : {
		httpOnly : true, 
	},
	name : "yhsessid",
}));

app.use(bootStrap);	


app.use("/", mainRouter);	
app.use("/member", memberRouter); 


app.use((req, res, next) => {
	const err = new Error(`${req.url}은 존재하지 않는 페이지 입니다.` );
	err.status = 404;
	next(err);
});

app.use((err, req, res, next) => {
	const data = {
		message : err.message,
		status : err.status || 500,
		stack : err.stack,
	};
	
	logger(`[${data.status}]${data.message}` , "error");
	logger(data.stack, "error");
	
	if (process.env.NODE_ENV === "production") {
		delete data.stack;
	}
	
	return res.status(data.status).render("error", data);
});

app.listen(app.get("PORT"), () => {
	console.log(app.get("PORT"), "번 포트에서 서버 대기중!!!!!");
});
