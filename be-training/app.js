const express = require("express");
const cookieParser = require("cookie-parser");
const cors = require("cors");
const logger = require("morgan");
const bodyParser = require("body-parser");
const path = require("path");
const http = require("http");

const indexRouter = require("./router/index.route" );
const { urlValidation, handleErrors } = require("./error");
const appConfig = require("./config/app.config")["app"];

const app = express();

// Allowed origins
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:4000",
  "http://172.27.0.1:4000",
  "http://192.168.137.1:4000",
];

// Unified CORS middlewareasas
app.use((req, res, next) => {
  const origin = req.headers.origin;
  if (!origin || allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin || "*");
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization, x-api-key, x-payload, timezone, utc-offset");
    res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, PATCH, OPTIONS");
    res.setHeader("Access-Control-Expose-Headers", "Authorization");
    res.setHeader("Content-Security-Policy", "script-src 'self' 'unsafe-inline'");
  }
  if (req.method === "OPTIONS") return res.sendStatus(200);
  next();
});

// Middleware
app.use(cors({ origin: allowedOrigins, credentials: true }));

app.use(logger("dev"));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

// Routing
app.use("/", indexRouter);

// Error Handling
app.use(urlValidation);

app.use(handleErrors);
// Server
const server = http.createServer(app);
const PORT = process.env.PORT || appConfig.port || 3000;
const HOST = process.env.HOST || "0.0.0.0";

server.listen(PORT, HOST, () => {
  console.log(`Server listening on http://${HOST}:${PORT}`);
});

module.exports = app; 

