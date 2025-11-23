const socket= io();
const msg= document.getElementById('msg');
const btn=document.getElementById('btn');
const list= document.getElementById('list')
const list2= document.getElementById('list2')

// getting socket id is a time consuming task, hence do it asynchronously
setTimeout(()=>{
    console.log(socket.id);
},1000)

btn.addEventListener('click',(ev)=>{
    socket.emit('chat',{
        data: msg.value
    })
})

socket.on('grpchat',(chat)=>{
    let li=document.createElement('li');
    li.innerText= chat;
    list.appendChild(li);
})
socket.on('notme',(chat)=>{
    let li=document.createElement('li');
    li.innerText= chat;
    list2.appendChild(li);
})

