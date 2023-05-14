//importung core node modules
const http = require("http");
const { buffer } = require("stream/consumers");

let parsedmessage = ""; // define parsedmessage variable outside of request handlers

//creating server
const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/") {
    //send form to collect the input
    res.setHeader("Content-Type", "text/html");
    res.write(`
      <html>
        <head>
          <title>Form </title>
        </head>
        <body>
          <center>
            <form action="/message" method="post" >
              <input type="text" name="message" />
              <button type="submit">Submit</button>
            </form>
          </center>
        </body>
      </html>
    `);

    // check if parsedmessage exists and add it to the response
    if (parsedmessage) {
      res.write(`
        <html>
          <head>
            <title>Form response </title>
          </head>
          <body>
            <center>
              <p>You typed: ${parsedmessage}</p>
            </center>
          </body>
        </html>
      `);
    }

    res.end();
  } else if (req.method === "POST" && req.url === "/message") {
    let body = [];

    req.on("data", (chunk) => {
      body.push(chunk);
    });

    req.on("end", () => {
      parsedmessage = Buffer.concat(body).toString(); // set parsedmessage variable
      res.statusCode = 302;
      res.setHeader("Location", "/");
      res.end();
    });
  }
});

server.listen(5000, () => {
  console.log("server is listening at port number 5000");
});
