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
    <div className="min-h-screen bg-background p-8">
      <div className="container mx-auto max-w-3xl">
        <h1 className="mb-8 text-3xl font-bold text-center text-foreground">
          LLM Prompt Interface
        </h1>

        <div className="space-y-6">
          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <div className="space-y-4">
              <textarea
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Geben Sie Ihren Prompt hier ein..."
                rows={5}
                className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
              />
              <button
                onClick={handleSubmit}
                disabled={isLoading || !prompt.trim()}
                className="w-full rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 disabled:pointer-events-none disabled:opacity-50"
              >
                {isLoading ? "Wird verarbeitet..." : "Absenden"}
              </button>
            </div>
          </div>

          <div className="rounded-lg border bg-card p-6 shadow-sm">
            <textarea
              value={response}
              readOnly
              placeholder="Hier erscheint die Antwort..."
              rows={10}
              className="w-full rounded-md border bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground"
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
