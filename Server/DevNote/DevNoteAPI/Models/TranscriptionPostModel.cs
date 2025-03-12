namespace DevNote.API.Models 
{ 
    public class TranscriptionPostModel
    {
        public int FileId { get; set; } // ID של הקובץ שמתומלל
        public string TranscribedText { get; set; } = string.Empty; // הטקסט שזוהה מהקובץ
    }
}  
