"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var http_errors_1 = __importDefault(require("http-errors"));
var express_1 = __importDefault(require("express"));
var path_1 = __importDefault(require("path"));
var cookie_parser_1 = __importDefault(require("cookie-parser"));
var morgan_1 = __importDefault(require("morgan"));
var cors_1 = __importDefault(require("cors"));
var users_1 = require("./routes/users");
var git_1 = require("./routes/git");
var upload_1 = require("./routes/upload");
var fileUtils_1 = require("./utils/fileUtils");
var app = (0, express_1.default)();
app.use((0, cors_1.default)());
// view engine setup
app.set("views", path_1.default.join(__dirname, "views"));
app.set("view engine", "jade");
app.use((0, morgan_1.default)("dev"));
app.use(express_1.default.json({ limit: "50mb" }));
app.use(express_1.default.urlencoded({ extended: false }));
app.use((0, cookie_parser_1.default)());
app.use(express_1.default.static(path_1.default.join(__dirname, "public")));
// Serve React build files
// Define your API routes
// app.use("/direct", indexRouter);
app.use("/tree", users_1.app);
app.use("/git", git_1.app);
app.use("/local", upload_1.app);
// If no Express routes match, serve React app's index.html
if (fileUtils_1.isBinary) {
    app.use(express_1.default.static(path_1.default.join(__dirname, "react-build")));
    app.get("*", function (req, res) {
        console.log("Serving React build");
        res.sendFile(path_1.default.join(__dirname, "react-build", "index.html"));
    });
}
// catch 404 and forward to error handler
app.use(function (req, res, next) {
    next((0, http_errors_1.default)(404));
});
// error handler
app.use(function (err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get("env") === "development" ? err : {};
    // render the error page
    res.status(err.status || 500);
    res.render("error");
});
var port = process.env.PORT || 1000;
app.listen(port, function () {
    console.log("Server running on port ".concat(port));
});
