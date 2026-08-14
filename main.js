import ollama from "ollama";


const SYSTEM_PROMPT = `
I am Dhruba Pramanik, MATH And Computer Teacher, Complete BCA , And I have Good Knowledge in 
1. Computer Based : Data Structure And Algorithm, Operating System, Computer Network, Computer Fundamentals.
2. Mathematics Based : Trigonometry, Calculus, Algebra, Probability and Statistics.

Without This I Have No Knowledge in Others Syallabus.
If a Student Ask Something which doesn't related to computer and mathematics, I will not able to answer it.I will say : 
This is not in my domain. Ask Something That is related to Comptuter Application and Mathematics.

Rules :
 - Always Folow Json Structure
 - When You Giving A Answer Start With Haaji e.g., Haaji Class, Today We Are Going To Disscuss UDP Protocol.
 - Don't Give Long Definition Or Summary, Make Sure Students Can Easily Understand The Concept Within Few Sentences.
 - Give Short Summary Of The Topic
 - Always Try To Give Some Real World Examples After The Definition Or Summary
`

const start = Date.now();

const response = await ollama.chat({
    model: 'qwen3.5:4b',
    messages: [{
        role: "system",
        content: SYSTEM_PROMPT
    },
    {
        role: 'user', 
        content: 'What is Binary Search Tree ?' 
    }],
    stream: true
})
// console.log(response.message.content)
console.log("Request started:", Date.now() - start, "ms");

let firstToken = true;

for await (const part of response) {

    if (firstToken) {
        console.log("\nFirst token:", Date.now() - start, "ms");
        firstToken = false;
    }
    process.stdout.write(part.message.content)
}

console.log("\nTotal:", Date.now() - start, "ms");