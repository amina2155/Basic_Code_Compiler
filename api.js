const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const compiler = require("compilex");
const cors = require("cors");
const options = { stats: true };
compiler.init(options);

app.use(cors());

app.use(bodyParser.json());

app.use(
  "/codemirror-5.65.15",
  express.static(
    "C:/Users/User/OneDrive/Documents/Project_Things_plus_practice/try_code_compiler/codemirror-5.65.15"
  )
);

app.get("/", (req, res) => {
  res.sendFile(
    "C:/Users/User/OneDrive/Documents/Project_Things_plus_practice/try_code_compiler/editor.html"
  );
});

// app.get("/", (req, res) => {
//   res.send("Server is running"); // Send a simple message
// });

app.post("/compile", function (req, res) {
  var code = req.body.code;
  var input = req.body.input;
  var lang = req.body.lang;

  if (lang === "C++" || lang === "C") {
    const envData = {
      OS: "windows",
      cmd: "g++",
      options: { timeout: 10000 },
    };

    if (input) {
      compiler.compileCPPWithInput(envData, code, input, (data) => {
        if (data.error) {
          res.send({ error: data.error });
        } else if (data.output) {
          res.send(data);
        }
      });
    } else {
      compiler.compileCPP(envData, code, (data) => {
        if (data.error) {
          res.send({ error: data.error });
        } else if (data.output) {
          res.send(data);
        }
      });
    }
  } else if (lang === "Java") {
    const envData = { OS: "windows" };

    if (input) {
      compiler.compileJavaWithInput(envData, code, input, (data) => {
        if (data.error) {
          res.send({ error: data.error });
        } else if (data.output) {
          res.send(data);
        }
      });
    } else {
      compiler.compileJava(envData, code, (data) => {
        if (data.error) {
          res.send({ error: data.error });
        } else if (data.output) {
          res.send(data);
        }
      });
    }
  } else if (lang === "Python") {
    const envData = { OS: "windows" };

    if (input) {
      compiler.compilePythonWithInput(envData, code, input, (data) => {
        if (data.error) {
          res.send({ error: data.error });
        } else if (data.output) {
          res.send(data);
        }
      });
    } else {
      compiler.compilePython(envData, code, (data) => {
        if (data.error) {
          res.send({ error: data.error });
        } else if (data.output) {
          res.send(data);
        }
      });
    }
  } else {
    res.send({ error: "Invalid language selection." });
  }
});

app.listen(7000, () => {
  console.log("Server is running on port 7000");
});
