const net = require("net");

// You can use print statements as follows for debugging, they'll be visible when running tests.
console.log("Logs from your program will appear here!");

// Uncomment this to pass the first stage
const server = net.createServer((socket) => {
  
  socket.on("data",(data)=>{

    const httpString = cleanString(data.toString());
    const httpStringArray = httpString.toString().split(" ");
    const Method = httpStringArray[0];
    const param = httpStringArray[1];
    const host = httpStringArray[4];
    const UserAgent = httpStringArray[8];
    console.log(UserAgent);

    const indexSlash = param.indexOf("/");

    if(indexSlash === param.length -1 || indexSlash === -1){
      socket.write("HTTP/1.1 200 OK\r\n\r\n");
    }
    else {
      const otherPath = param.substring(indexSlash + 1).split("/");
      const indexEcho = otherPath.indexOf("echo");
      const indexAgent = otherPath.indexOf("user-Agent");
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

        if(indexAgent !== -1){
          socket.write("HTTP/1.1 404 Not Found\r\n\r\n");
        }
        else{
          contentLength = UserAgent.length;
          content = UserAgent;
          socket.write(`HTTP/1.1 200 OK\r\nContent-Type: ${contentType}\r\nContent-Length: ${contentLength}\r\n\r\n${content}`);
        }

      }
    }
  })
   socket.on("close", () => {
     socket.end();
   });
 });

 server.listen(4221, "localhost");

function cleanString(str){
    return str.replace(/\r\n/g, ' ').replace(/\n/g, ' ').replace(/\r/g, ' ');
 }


