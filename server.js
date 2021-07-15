const http = require("http");
const fs = require("fs");
const url = require("url");
const Jimp = require("Jimp");

http
  .createServer((req, res) => {
    if (req.url == "/") {
      fs.readFile("public/index.html", "utf8", (err, html) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(html);
      });
    } 
    
    else if (req.url == "/estilos") {
      fs.readFile("public/style.css", (err, css) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "text/css" });
        res.end(css);
      });
    } 
    
    else if (req.url == "/javascript") {
      fs.readFile("public/script.js", (err, js) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "application/javascript" });
        res.end(js);
      });
    } 
    
    else if (req.url == "/imagenes" ) {      
      fs.readdir("./public/img/",(err,lista)=>{
            if (err) console.log(err);
            res.writeHead(200, { "Content-Type": "text/plain" });
            res.end(JSON.stringify(lista))
          })
    } 

    else if (req.url.startsWith("/imagenes")) {
      const rutaImagen = req.url.split("/imagenes")[1]      
      fs.readFile(`./public/img/${rutaImagen}`,(err,img)=>{
            if (err) console.log(err);
            res.writeHead(200, { "Content-Type": "image/jpeg" });
            res.end(img)
          })
    } 
    
    else if (req.url.startsWith("/imagen")) {
      const { imagen } = url.parse(req.url, true).query;
      Jimp.read(imagen, (err, img) => {
        img.writeAsync(`./public/img/test.jpg`).then(() => {
          res.writeHead(200, { "Content-Type": "text/html" });
          const htmlImage = `<img src="${imagen}" alt="">`
          res.end(htmlImage);
        });
      });
    }
    
    else if (req.url.startsWith("/eliminar")) {
      const rutaImagen = req.url.split("/eliminar")[1]      
      fs.unlink(`./public/img/${rutaImagen}`,(err,img)=>{
            if (err) console.log(err);
            res.writeHead(200, { "Content-Type": "image/text" });
            res.end("Imagen Eliminada")
          })
    } 

    else if (req.url.startsWith("/public")){
      fs.readFile(__dirname + req.url, function (err,data) {
        if (err) {
          res.writeHead(404);
          res.end(JSON.stringify(err));
          return;
        }
        res.writeHead(200);
        res.end(data);
      });
    }
    
    else {
      fs.readFile("public/404.html", "utf8", (err, errorPage) => {
        if (err) {
          console.log(err);
          res.statusCode = 500;
          res.end(JSON.stringify(err));
        }
        res.writeHead(200, { "Content-Type": "text/html" });
        res.end(errorPage);
      });
    }
  })
  .listen(process.env.PORT || 3000);
