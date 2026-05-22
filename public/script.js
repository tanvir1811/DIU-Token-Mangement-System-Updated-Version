
const socket = io();

let btn =document.getElementById("enbut");
let input=document.getElementById("input");
let show=document.getElementById("show");
let show1=document.getElementById("show1");
show.style.display="none";
show1.style.display="none";


btn.addEventListener("click",()=>{
  show.style.display="none";
show1.style.display="none";
  let mesg=input.value;
  let num=mesg[0]+mesg[1]+mesg[2]+mesg[4]+mesg[5]+mesg[7]+mesg[8];
  if(mesg[3]=="-" && mesg[6]=="-" &&!isNaN(num)){
  socket.emit('sendMessage', mesg);
  }

  else{
    alert("Please Enter in right format");
  }

 
});


socket.on('cannotadd', () => {
   
 show.style.display="block";
show1.style.display="block";
    
  

  });

  socket.on('timeremaining', (data4) => {
   
        show.style.display="block";
        show.textContent="Time Reamining:"+data4+" Seconds";

  });



