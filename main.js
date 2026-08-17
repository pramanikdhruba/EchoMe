import ollama from "ollama";
import { ElevenLabsClient, play } from "@elevenlabs/elevenlabs-js";
import fs from "fs";
import { exec } from "child_process";
import path from "path";
import 'dotenv/config'

const elevenlabs = new ElevenLabsClient({
    apiKey: process.env.ELEVENLABS_API_KEY,
});

const SYSTEM_PROMPT = `
I am Dhruba Pramanik, MATH And Computer Teacher, Complete BCA , And I have Good Knowledge in 
1. Computer Based : Data Structure And Algorithm, Operating System, Computer Network, Computer Fundamentals.
2. Mathematics Based : Trigonometry, Calculus, Algebra, Probability and Statistics.

I don't have knowledge of subjects outside Computer Science and Mathematics. If a student asks a question unrelated to these two domains, I will respond:

"This is not in my domain. Please ask something related to Computer Applications or Mathematics."

Rules :
 - Always Follow Json Structure
 
    Only One Step At A Time 
    The Pipeline : 
    - "INITIAL" when user gives an input, we will have an initial thought process on why this user is trying to do this.
    - "THINK" this is where we are going to think about how to solve this and then start to breakdown the problem
    - "ANALYSE" this is where we will analyse the solution and also verify if the output is correct
    - "THINK" we can go back to think mode where we now see if any sub problem remains and think 
    - "ANALYSE" again analyse the problem and get onto a solution
    - "OUTPUT" this is where we can end and give the final output to the user.


    Output Format:
  { "step": "INITIAL" | "THINK" | "ANALYSE" | "OUTPUT", "text": "<The Actual Text>" }
   - Final Actual Text will be in This Array Structure : [
    "TOPIC": "Topic Name",
    "DEFINITION": "Brief and Easy To Understand Definition",
    "SUMMARY": "Short Summary of the Topic will be in Hinglish And Key Points : 1. 2. 3.",
    "EXAMPLES": ["Example 1", "Example 2"]

 - The "Definition" value must start with "Haaji". e.g., Haaji Class, Today We Are Going To Disscuss UDP Protocol.
 - Give Long Definition, Make Sure Students Can Easily Understand The Concept Within Few Sentences.
 - Give Short Summary Of The Topic
 - Always Try To Give Some Real World Examples After The Definition Or Summary
 - Follow English But Sometime Use Hindi words To Make The Explanation More Conversational And Easy To Understand.

Hinglish Teaching Style:
    - Use natural Hinglish occasionally to make explanations conversational.
    - Do not use Hinglish in every sentence.
    - Use phrases naturally, such as:
    Haaji Class : Alright Class
    Dekho Class : Look here, Class
    Chaliye samajhte hain : Let’s understand
    Simple words mein : In simple words
    Isko aise samjho : Understand it this way
    Maan lo : Suppose
    Suppose karo : Suppose that
    Dhyaan dena : Pay attention
    Yaad rakhna : Remember
    Ek example lete hain : Let’s take an example
    Real life mein dekho : Look at it in real life
    Yahan tak clear hai? : Is it clear so far?
    Ab next point dekhte hain : Now let’s look at the next point
    Confuse hone ki zarurat nahi hai : There’s no need to be confused
    Sabse important baat ye hai : The most important thing is
    Exam ke point of view se important hai : Important from an exam point of view

    - Use these phrases for fit naturally.
    - Do not overuse them.
    - Keep the explanation primarily in clear English with natural Hinglish expressions.
]
`

const start = Date.now();

const MESSAGES_DB = [{ role: 'system', content: SYSTEM_PROMPT }];

function extractJson(rawResult) {
    const cleaned = rawResult.replace(/```json|```/g, '').trim();
    const match = cleaned.match(/\{[\s\S]*\}/);
    return match ? match[0] : cleaned;
}

async function main(prompt = '') {

    MESSAGES_DB.push({ role: 'user', content: prompt });

    let iteration = 0;
    const MAX_ITERATIONS = 15;

    let parsedResult = null;

    while (iteration++ < MAX_ITERATIONS) {
        let result;

        try {
            result = await ollama.chat({
                model: 'gemma4:31b-cloud',
                messages: MESSAGES_DB,
                stream: false,
                format: {
                    type: "object",
                    properties: {
                        step: {
                            type: "string",
                            enum: [
                                "INITIAL",
                                "THINK",
                                "ANALYSE",
                                "OUTPUT"
                            ]
                        },

                        text: {
                            type: "string"
                        }
                    },

                    required: [
                        "step",
                        "text"
                    ]
                }
            }
            )
        } catch (apiErr) {
            console.error('❌ API call failed:');
            console.error('status:', apiErr.status);
            console.error('message:', apiErr.message);
            console.error('full error:', JSON.stringify(apiErr, null, 2));
            break;
        }
        // console.log(response.message.content)
        console.log("Request started:", Date.now() - start, "ms");

        let firstToken = true;

        const rawResult = result.message.content;

        const jsonResult = extractJson(rawResult);

        try {
            parsedResult = JSON.parse(jsonResult);

            MESSAGES_DB.push({
                role: 'assistant',
                content: rawResult
            });

            // console.log(`🤖 (${parsedResult.step}) : ${parsedResult.text}`);

            if (parsedResult.step === 'OUTPUT') {
                break;
            }

            MESSAGES_DB.push({
                role: 'user',
                content: `Continue from step ${parsedResult.step}.`
            })
        } catch (err) {
            console.error('❌ Failed to parse response:', jsonResult);
            console.error(err);
        }

        if (iteration >= MAX_ITERATIONS) {
            console.warn('❌ Maximum iterations reached. Exiting.');
            break;
        }
    }

    console.log("\n\nParsed Result:", parsedResult);

    // const finalReponse = parsedResult.DEFINITION + parsedResult.SUMMARY
    // console.log("\n\nFinal Response:", finalReponse);

    // const audioResponse = await elevenlabs.textToSpeech.convert(
    //     'JBFqnCBsd6RMkjVDRZzb', // voice_id
    //     {
    //       text:finalReponse,
    //       modelId: 'eleven_multilingual_v2',
    //       outputFormat: 'mp3_44100_128', // output_format
    //     }
    // )

    //     // --- Save audio stream to file ---
    //     // const outputPath = path.resolve("./output.mp3");
    //     // const writeStream = fs.createWriteStream(outputPath);

    //     // for await (const chunk of audioResponse) {
    //     //     writeStream.write(chunk);
    //     // }
    //     // writeStream.end();

    //     // writeStream.on("finish", () => {
    //     //     console.log(`\nAudio saved to ${outputPath}`);

    //     //     // --- Auto-play using OS default player (Windows) ---
    //     //     exec(`start "" "${outputPath}"`, (err) => {
    //     //         if (err) console.error("Playback error:", err);
    //     //     });

    //     //     console.log("\nTotal:", Date.now() - start, "ms");
    //     // });
    //     // console.log("\nTotal:", Date.now() - start, "ms");
}

main('What is Data Structure?');