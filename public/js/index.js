//inicializo socket del lado del cliente
const socket = io()

let user
let chatBox = document.getElementById("chatBox")
let chatLogs = document.getElementById("chatLogs")

Swal.fire({
    title: "Bienvenido",
    input: "text",
    text: "Ingresa tu nombre de usuario",
    inputValidator: (value)=>{
        return !value && "Necesitas identificarte para continuar"
    },
    allowOutsideClick: false
}).then(result =>{
    user = result.value
    console.log(`tu nombre de usuario es ${user}`)

    socket.emit("userConnection", user)
})

chatBox.addEventListener("keypress", e => {
    if(e.key === "Enter") {
        if (chatBox.value.trim().length > 0){

            console.log(`mensaje: ${chatBox.value}`)
            socket.emit("message", {
                user,
                message: chatBox.value
            })

            chatBox.value = ""

        }
    }
})

socket.on("messagesLogs", data => {

    let messages = ""

    data.forEach(chat => {
        messages += `${chat.user}: ${chat.message} </br>`
    });

    chatLogs.innerHTML = messages
})

socket.on("newUser", data => {
    Swal.fire({
        text:`${data} se ha conectado`,
        toast: true,
        position: "top-right"
    })
})