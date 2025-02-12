import { useState } from "react";
import axios from "axios";
import "./App.css";

function App() {
  const [prompt, setPrompt] = useState("");
  const [response, setResponse] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        "http://localhost:5000/api/LLM/generate",
        {
          prompt,
        }
      );
      setResponse(result.data.response);
    } catch (error) {
      console.error("Fehler beim Senden des Prompts:", error);
      setResponse(
        "Es ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container">
      <h1>LLM Prompt Interface</h1>
      <div className="input-section">
        <textarea
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="Geben Sie Ihren Prompt hier ein..."
          rows={5}
          className="prompt-input"
        />
        <button
          onClick={handleSubmit}
          disabled={isLoading || !prompt.trim()}
          className="submit-button"
        >
          {isLoading ? "Wird verarbeitet..." : "Absenden"}
        </button>
      </div>
      <div className="output-section">
        <textarea
          value={response}
          readOnly
          placeholder="Hier erscheint die Antwort..."
          rows={10}
          className="response-output"
        />
      </div>
    </div>
  );
}

export default App;
