import mongoose, { mongo } from 'mongoose'

export async function connect(){
    try{
        mongoose.connect(process.env.MONGO_URI!)
        const connection = mongoose.connection;

        connection.on('connected', () => {
            console.log("MONGO CONNECTED SUCCESSFULLY")
        })

        connection.on('error', (err) => {
            console.log("MONGO ERROR ",err)
        })
    }catch(error){
        console.log("Something went wrong ",error)
    }
}