//importing http module
const { write } = require('fs');
const http=require('http');
//creating server 
const server=http.createServer((req,res)=>{
   const url=req.url;
   if(url==="/"){
    res.write("Hello From Node Js");
   }
   else if(url==="/home"){
    res.write("Welcome Home");
   }
   else if(url==="/home"){
    res.write("Welcome Home");
   }
   else if(url==="/About"){
        res.write("Welcome to About Page");
   }
   res.end();
});
server.listen(5000);

