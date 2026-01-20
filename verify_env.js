import dotenv from "dotenv";
dotenv.config();

const email = process.env.ADMIN_EMAIL;
const pass = process.env.ADMIN_PASSWORD;

console.log("--- CREDENTIAL CHECK ---");
console.log(`Loaded Email: '${email}'`);
console.log(`Loaded Pass : '${pass}'`);

const targetEmail = "surenderthakur40437@gmail.com";
const targetPass = "admin123";

console.log(`Matches Target Email? ${email === targetEmail}`);
console.log(`Matches Target Pass?  ${pass === targetPass}`);

if (email !== targetEmail) {
    console.log("MISMATCH! Check .env for typos or extra spaces.");
    console.log(`Expected: '${targetEmail}'`);
    console.log(`Got:      '${email}'`);
}
console.log("------------------------");
