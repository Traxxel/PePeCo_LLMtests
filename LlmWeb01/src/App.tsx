import { useState } from "react";
import axios from "axios";

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
      <h1 className="title">LLM Prompt Interface</h1>

      <div>
        <div className="card">
          <div>
            <textarea
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              placeholder="Geben Sie Ihren Prompt hier ein..."
              className="textarea"
            />
            <div className="space-y">
              <button
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim()}
                className="button"
              >
                {isLoading ? "Wird verarbeitet..." : "Absenden"}
              </button>
            </div>
          </div>
        </div>

        <div className="card">
          <textarea
            value={response}
            readOnly
            placeholder="Hier erscheint die Antwort..."
            className="textarea"
          />
        </div>
      </div>
    </div>
  );
}

export default App;
