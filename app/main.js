const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  
  socket.on("data",(data)=>{

    const path = data.toString().split(" ")[1];
    const indexSlash = path.indexOf("/");
    if(indexSlash === path.length -1 || indexSlash === -1){
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    }
    else {
      const otherPath = path.substring(indexSlash + 1).split("/");
      const indexEcho = otherPath.indexOf("echo");
      const contentType="text/plain";
      var contentLength = 0;
      var content ="";
      if(indexEcho !== -1){
        const afterEchoPath = otherPath[indexEcho + 1];
        content = afterEchoPath;
        contentLength = content.length;
        if(afterEchoPath !== undefined){
          socket.write(`HTTP/1.1 200 OK\r\nContent-Type: ${contentType}\r\nContent-Length: ${contentLength}\r\n\r\n${content}`);
        }
      } else {
        socket.write("HTTP/1.1 404 Not Found\r\n\r\n");

      }
    }
  })
   socket.on("close", () => {
     socket.end();
   });
 });

 server.listen(4221, "localhost");
