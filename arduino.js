const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const app = express();
const server = http.createServer(app);
const io = new Server(server);
let array=[];
let calnum=0;
let time2=0;

app.use(express.static(path.join(__dirname, 'public')));
app.get('/index.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/admin', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'admin.html'));
});

let mesag1="";
let mesag2=3;

io.on('connection', (socket) => {
  console.log('A user connected');

  
  socket.on('sendMessage', (data) => {
    console.log('Message received:', data);
    mesag1=data;
    verify(data);
    caltime();
    
   
  


  });

 
 let clicknum=3;
 let clicknum1=0;

  socket.on('requestinfo', () => {
      
    if(array.length>1){
      if(clicknum==3){
         io.emit("sendadmin",array[0]);
         clicknum=4;
      }

      else if(clicknum==4){
      io.emit("sendadmin",array[1]);
      array.shift();
      if(array.length==1){
           clicknum=0;
      }
     
      }

   
    }
    else if(array.length==1){
      

       

     if(clicknum==0){
          array.shift();
          io.emit("sendadmin","0");
          clicknum=3;
          
      }

      else if(clicknum==3){
        io.emit("sendadmin",array[0]);
        clicknum=4;
        clicknum1=1;
      }

      else if(clicknum1==1){
        array.shift();
        io.emit("sendadmin","0");
        clicknum1=0;
        clicknum=3;
      }

     
    
   
     
    }

    else{
      io.emit("sendadmin","0");
    }
   
   
    
    
    console.log(clicknum);

  });

  function verify(data3){
    let n=array.length;
    let n1=0;
    for(let i=0;i<n;i++){
      if(array[i]==data3){
         n1=1
         calnum=i+1;
         io.emit("cannotadd");
      }

    }
   if(n1==0 ){
    array.push(data3);
    calnum=array.length

 


  
}

else{
   n1=0
   console.log("Value repeated");
}

  }


  function caltime(){
      let time1 =time2*(calnum)/1000;
      io.emit("timeremaining",time1);
  }



   socket.on('studentnum', (data1) => {
      mesag2=data1;
    console.log('Message received:', mesag2);
   
    
    
  

  });

  



});




const port = new SerialPort({
  path: '/dev/ttyACM0', 
  baudRate: 9600
});

const parser = port.pipe(new ReadlineParser({ delimiter: '\n' }));

let count1=0;

parser.on('data', (data) => {
  data = data.trim();
  console.log("Arduino:", data);
  if (data.startsWith("Count:")) {
     count1 = data.split(":")[1];
        senddata();
    
    console.log("Status from Arduino:", count1);
  }
 
  else if (data.startsWith("Time:")) {
     time2 = data.split(":")[1];
  
    console.log("Status from Arduino:", time2);
  }
 
  else {
    console.log("Unknown data:", data);
  }
});

function senddata() {

let mes="";
if(array[0]!=null){
 
    msg = `${mesag2},${array[0]}\n`;
}

else{
  let t="Not Registered";
  msg = `${mesag2},${t}\n`;
}
  

  port.write(msg, (err) => {
    if (err) console.error("Error writing:", err);
    else console.log("Message sent:", msg);
  });
}





server.listen(3000, () => console.log('Server running on http://localhost:3000'));