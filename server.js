const express = require('express')
const app = express()

//server build upon /www/vueChat/current/build
app.use(express.static('/www/vueChat/current/dist'))

const server = app.listen(1234)

//add websocket
//reference from https://socket.io/docs/server-api/
const io = require('socket.io')(server)

io.sockets.on('connection', socket => {

    socket.on('sendMsg', data => {

        //将收到的消息广播给其他用户
        socket.broadcast.emit('newMsg', data)

        //向所有用户推送实时消息
        var timeObj = new Date(),
            time = timeObj.getHours() + ':' + timeObj.getMinutes(),
            postObj = {
                content: data.userName + ': ' + data.content,
                time: time
            }

        io.sockets.emit('postMsg', postObj)
    })
})


