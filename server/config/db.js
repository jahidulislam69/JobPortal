import mongoose from 'mongoose'

// function to connect to the MongoDB database
const connectDB = async () => {
    try {
        await mongoose.connect(`${process.env.MONGODB_URI}/job-portal`);
        console.log('Database Connected');
    } catch (error) {
        console.error('Database connection failed:', error.message);
        process.exit(1); // Exit the process with failure
    }
}

export default connectDB;