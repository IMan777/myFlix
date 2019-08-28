const fs = require('fs');
const url = require('url');    /* FS , URL & HTTP Modules Declaired */
const http = require('http');
const port = process.env.port || 8080; /* Port Set To 8080 Or Any Port Higher Than 1024 */
const date = new Date().toUTCString(); /*Date Set For Timestamp*/


const server = http.createServer((request, response) => {  /* Server Created*/
    var addr = request.url,
    q = url.parse(addr, true),
    filePath = ' ';
/* If Statement For Whether File Path Includes Documentation or Index*/
    if (q.pathname.includes('documentation')) {
       filePath = (__dirname + '/documentation.html');
     } else {
       filePath = (__dirname + '/index.html');
     }

     fs.readFile(filePath, function(error, data) { /*Read File Function Set*/
       if (error) {

        response.writeHead(404, { 'Content-Type': 'text/html' });
        return response.end("404 Page Not Found!");

       }

       response.writeHead(200, { 'Content-Type': 'text/html' });
       response.write(data);
       response.end("Welcome!");
     });
     /*Write File Function Set*/
     fs.writeFile('log.txt', 'URL: ' + addr + '  Timestamp: ' + date + '\n\n', function(error) {
       if (error) {
         console.log(error);
       }
         else {
       console.log('Log Updated Successfully.');
       }
     });

}); server.listen(port);
