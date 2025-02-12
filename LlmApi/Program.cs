using Microsoft.AspNetCore.Mvc;
using LLama;
using LLama.Common;
using LLama.Abstractions;

var builder = WebApplication.CreateBuilder(args);
builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// LLM Service als Singleton registrieren
builder.Services.AddSingleton<LlmApi.ILLMService, LlmApi.LLMService>();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();

namespace LlmApi
{
    public interface ILLMService
    {
        Task<string> GenerateResponseAsync(string prompt);
    }

    public class LLMService : ILLMService
    {
        private readonly string _modelPath;
        private readonly ModelParams _modelParams;

        public LLMService(IConfiguration configuration)
        {
            _modelPath = configuration["LLM:ModelPath"] ?? throw new ArgumentNullException("ModelPath nicht konfiguriert");
            _modelParams = new ModelParams(_modelPath)
            {
                ContextSize = 2048,
                GpuLayerCount = 5
            };
        }

        public async Task<string> GenerateResponseAsync(string prompt)
        {
            using var model = LLamaWeights.LoadFromFile(_modelParams);
            using var context = model.CreateContext(_modelParams);
            
            var executor = new InteractiveExecutor(context);
            var response = new System.Text.StringBuilder();
            
            await foreach (var text in executor.InferAsync(prompt, new InferenceParams()))
            {
                response.Append(text);
            }

            return response.ToString();
        }
    }

    [ApiController]
    [Route("api/[controller]")]
    public class LLMController : ControllerBase
    {
        private readonly ILLMService _llmService;

        public LLMController(ILLMService llmService)
        {
            _llmService = llmService;
        }

        [HttpPost("generate")]
        public async Task<IActionResult> GenerateResponse([FromBody] PromptRequest request)
        {
            try
            {
                var response = await _llmService.GenerateResponseAsync(request.Prompt);
                return Ok(new { response });
            }
            catch (Exception ex)
            {
                return StatusCode(500, new { error = ex.Message });
            }
        }
    }

    public class PromptRequest
    {
        public string Prompt { get; set; } = string.Empty;
    }
} 