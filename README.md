# LLM API

Eine .NET-basierte Web-API für die Interaktion mit lokalen LLM-Modellen unter Verwendung von LLamaSharp.

## Projektstruktur

- `LlmApi/` - .NET 8.0 Web-API für die Interaktion mit LLamaSharp
  - `LLMs/` - Verzeichnis für GGUF-Modelle
  - `Program.cs` - Hauptcode mit LLM-Implementierung
  - `Properties/` - Konfigurationsdateien

## Voraussetzungen

- .NET 8.0 SDK
- Ein GGUF-Modell (z.B. von [TheBloke auf HuggingFace](https://huggingface.co/TheBloke))

## Installation

1. Erstellen Sie den LLMs-Ordner und legen Sie Ihr GGUF-Modell ab

```bash
mkdir -p LlmApi/LLMs
# Kopieren Sie Ihre GGUF-Datei in das LLMs-Verzeichnis
```

2. Passen Sie den Modellpfad in `LlmApi/appsettings.json` an

```json
{
  "LLM": {
    "ModelPath": "LLMs/IhrModell.gguf"
  }
}
```

3. Starten Sie die API

```bash
dotnet run --project LlmApi
```

Die API ist dann unter http://localhost:5000 erreichbar.

## API Verwendung

Die API bietet einen Endpunkt zum Generieren von Antworten:

### POST `/api/LLM/generate`

Request Body:

```json
{
  "prompt": "Ihre Frage hier"
}
```

Response:

```json
{
  "response": "Antwort des LLM-Modells"
}
```

Sie können die API-Dokumentation und den Endpunkt auch über Swagger unter http://localhost:5000/swagger testen.

## Entwicklung

Das Projekt verwendet:

- .NET 8.0
- LLamaSharp für die LLM-Integration
- ASP.NET Core für die Web-API

## Wichtiger Hinweis

Die GGUF-Modelldateien müssen manuell im `LlmApi/LLMs`-Ordner abgelegt werden.
