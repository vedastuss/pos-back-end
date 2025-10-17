require("dotenv").config();
const mongoose = require("mongoose");

console.log('Testing MongoDB Connection...');
console.log('Connection string (masked):', process.env.MONGODB_URI?.substring(0, 40) + '...');

mongoose.connect(process.env.MONGODB_URI, {
    serverSelectionTimeoutMS: 30000,
    family: 4,
})
.then(() => {
    console.log('✅ SUCCESS: Connected to MongoDB');
    process.exit(0);
})
.catch((err) => {
    console.error('❌ FAILED:', err.message);
    console.error('Error code:', err.code);
    console.error('\nPossible causes:');
    console.error('1. DNS resolution issue (try different DNS like 8.8.8.8)');
    console.error('2. Firewall blocking port 27017');
    console.error('3. ISP blocking MongoDB connections');
    console.error('4. Network restrictions');
    process.exit(1);
});