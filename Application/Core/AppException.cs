namespace Application.Core;
public class AppException
{
    public AppException(int statusCode, string message, string details = null)
    {
        // Development mode returns status code, actual message of error, and details as stack trace
        // Production mode only returns status code and standard message (i.e. "server error")
        StatusCode = statusCode;
        Message = message;
        Details = details;  
    }

    public int StatusCode { get; set; }
    public string Message { get; set; }
    public string Details { get; set; }
    
}
