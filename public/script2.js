const socket = io();
let table1=document.getElementById("messageTable");
let arr=0;


 function save1(){



let  td1=document.getElementById("td1");
     td1.textContent=arr;

  }

  function adddata(data1){
   arr=data1;
   save1();
}

window.onload=()=>{
    arr = JSON.parse(localStorage.getItem("myArr")) || [];
    save1();
}


socket.on('sendadmin', (msg) => {
    
    adddata(msg);
    localStorage.setItem("myArr", JSON.stringify(arr));
 
 
    
   
  });

 let clear1 =document.getElementById("clearbtn");
  let next1 =document.getElementById("nextbtn");
 clear1.addEventListener("click",()=>{
    localStorage.clear();
    window.location.reload();
    


 });



 let numstu=document.getElementById("input1");
 let stubtn=document.getElementById("enbut1");
 
stubtn.addEventListener("click",()=>{
    let num=numstu.value;
    if(!isNaN(num)){
        socket.emit("studentnum",num);
    }

    else{
        alert("Please Enter a nummber!");
    }
    
});

next1.addEventListener("click",()=>{
  
    socket.emit("requestinfo");
})
 
