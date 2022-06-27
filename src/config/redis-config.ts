import * as redis from 'redis';


const client = redis.createClient({
    socket.port: 6379,
    
})

export default client;