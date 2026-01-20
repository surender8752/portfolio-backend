import dotenv from 'dotenv';
dotenv.config();
console.log('Node Version:', process.version);
console.log('MONGO_URI exists:', !!process.env.MONGO_URI);
if (process.env.MONGO_URI) console.log('MONGO_URI length:', process.env.MONGO_URI.length);
console.log('Current Directory:', process.cwd());
