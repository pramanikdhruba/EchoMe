# EchoMe 🤖

> EchoMe is an AI-powered teaching assistant that uses an LLM to generate structured educational explanations and ElevenLabs to convert the final response into speech.

## ✨ Features

- AI-powered responses using Ollama
- Step-by-step response workflow
- Structured JSON responses
- Zod-based data validation
- Mathematics & Computer Scie# EchoMe 🤖

> EchoMe is an AI-powered teaching assistant that uses an LLM to generate structured educational explanations and ElevenLabs to convert the final response into speech.

## ✨ Features

- AI-powered responses using Ollama
- Step-by-step response workflow
- Structured JSON responses
- Zod-based data validation
- Mathematics & Computer Science focused teaching
- Natural Hinglish explanations
- Text-to-Speech using ElevenLabs
- Automatic audio playback on Windows
- Environment variable support

## 🛠️ Tech Stack

- **Node.js** — Runtime
- **JavaScript (ES Modules)** — Application development
- **Ollama** — LLM integration
- **Gemma 4 31B Cloud** — Current configured model
- **Zod** — Schema validation
- **ElevenLabs** — Text-to-Speech
- **dotenv** — Environment variable management

## 🔄 Workflow

```text
┌───────────────┐
│ 👤 User Input │
└───────┬───────┘
        │
        ▼
┌────────────────┐
│ 🤖 Ollama/Gemma│
└───────┬────────┘
        │
        ▼
┌───────────────────────────────┐
│ 🧠 AI Processing Pipeline     │
│                               │
│ INITIAL → THINK → ANALYSE     │
│                  ↓            │
│                OUTPUT         │
└───────────────┬───────────────┘
                │
                ▼
        ┌───────────────┐
        │ ✅ Zod Schema │
        │   Validation  │
        └───────┬───────┘
                │
                ▼
        ┌────────────────┐
        │ 📝 Final Answer│
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │ 🔊 ElevenLabs  │
        │   Text → Voice │
        └───────┬────────┘
                │
                ▼
        ┌────────────────┐
        │ 🎧 Audio Output│
        └────────────────┘
```

### Workflow Overview

1. The user provides a question.
2. EchoMe sends the question along with the system instructions to Ollama.
3. The model processes the request through the `INITIAL`, `THINK`, and `ANALYSE` stages.
4. The model generates the final `OUTPUT`.
5. The response is checked before being accepted.
6. The final educational content is combined into a single text response.
7. ElevenLabs converts the response into speech.
8. The generated audio is saved as `output.mp3` and played automatically.

## 🚀 Getting Started

### 1. Clone the Repository

```bash
git clone https://github.com/<YOUR_USERNAME>/EchoMe.git
cd EchoMe
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Configure Environment Variables

Create a `.env` file:

```env
ELEVENLABS_API_KEY=your_elevenlabs_api_key
ELEVENLABS_NAME = your_elevenlabs_api_name
```

Add `.env` to `.gitignore` and never commit your API keys.

### 4. Run the Project

```bash
node index.js
```
Replace `index.js` with your actual entry file if different.
```

## 📁 Project Structure

```text
EchoMe/
├── index.js
├── package.json
├── package-lock.json
├── .env
├── .gitignore
└── output.mp3
```

## 👨‍💻 Author

**Dhruba Pramanik**

---

**EchoMe — Learn. Understand. Listen.** 🤖🎙️