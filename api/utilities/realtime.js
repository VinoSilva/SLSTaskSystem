let connection = null;

const socketIO = require('socket.io');


class Realtime{
    constructor(){
        this._socket = null;
    }

    connect(server,serverMiddleware){
        const io = socketIO(server);

        // io.use(function(socket, next) {
        //     sessionMiddleware(socket.request, socket.request.res, next);
        // });

        io.on('connection',(socket)=>{
            this._socket = socket;

            this._socket.on('disconnect',function(){
                console.log(socket.id,"(Disconnected)");
            });
            
            console.log(`New socket connection: ${socket.id}`);
        });
    }

    sendEvent(event,data){
        this._socket.emit(event,data);
    }

    registerEvent(event,handler){
        this._socket.on(event,handler);
    }

    static init(server,sessionMiddleware){
        if(!connection){
            connection = new Realtime();
            connection.connect(server,sessionMiddleware);
        }
    }

    static getConnection(){

        if(!connection){
            throw new Error("no active connection");
        }

        return connection;
    
    }
}

module.exports = {
    connect: Realtime.init,
    connection: Realtime.getConnection 
}