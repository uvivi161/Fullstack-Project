import { useContext, useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';
import { UserContext } from '../login/UserReducer';
import { LinkContext } from './context';

const useFileUploader = () => {
  const [s3K, setS3K] = useState<string | null>(null);
  const [user] = useContext(UserContext);
  const [file, setFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [transcribeProgress, setTranscribeProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [uploadedFileUrl, setUploadedFileUrl] = useState<string | null>(null);
  // const [pdfUrl, setPdfUrl] = useState<string | null>(null);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [transcript, setTranscript] = useState('');
  const [editedTranscript, setEditedTranscript] = useState('');
  const [transcriptionId, setTranscriptionId] = useState('');
  const [open, setOpen] = useState(false);
  const [alertMessage, setAlertMessage] = useState('');
  const [alertSeverity, setAlertSeverity] = useState<'success' | 'error' | 'info' | 'warning'>('success');
  const { pdfUrl, setPdfUrl } = useContext(LinkContext);

  // const [pdfUrl, setPdfUrl] = useContext(LinkContext)
  const buttonStyle = {
    color: '#595047',
    margin: '5px',
    border: '2px solid #595047',
    minWidth: '100px',
    '&:hover': {
      backgroundColor: '#595047',
      color: '#ffffff',
    },
  };

  const showAlert = (message: string, severity: typeof alertSeverity) => {
    setAlertMessage(message);
    setAlertSeverity(severity);
    setOpen(true);
  };

  const closeAlert = () => setOpen(false);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      const { data } = await axios.get('https://localhost:7170/api/FileUpload/presigned-url', {
        params: { fileName: file.name }
      });

      const { url: presignedUrl, s3Key } = data;
      setS3K(s3Key);

      await axios.put(presignedUrl, file, {
        headers: { 'Content-Type': file.type },
        onUploadProgress: (e: AxiosProgressEvent) => {
          const percent = Math.round((e.loaded * 100) / (e.total || 1));
          setUploadProgress(percent);
        },
      });

      const fileUrl = presignedUrl.split('?')[0];
      await axios.post('https://localhost:7170/api/FileUpload/UploadTo-DB', {
        fileName: file.name,
        FileUrl: fileUrl,
        UserId: user.id,
        s3Key,
      });

      setUploadedFileUrl(fileUrl);
      showAlert('הקובץ הועלה בהצלחה!', 'success');
    } catch (error) {
      console.error(error);
      showAlert('שגיאה בהעלאת הקובץ', 'error');
    }
  };

  const handleTranscription = async () => {
    if (!uploadedFileUrl) return;
    setIsTranscribing(true);
    setTranscribeProgress(0);
    let progress = 0;

    const interval = setInterval(() => {
      progress += 5;
      setTranscribeProgress(progress);
      if (progress >= 95) clearInterval(interval);
    }, 300);

    try {
      const { data } = await axios.post('https://localhost:7170/api/Transcription/transcribe', {
        FileUrl: uploadedFileUrl,
        S3Key: s3K,
        UserId: user.id
      });

      clearInterval(interval);
      setTranscribeProgress(100);
      setTranscript(data.transcriptText);
      setEditedTranscript(data.transcriptText);
      setPdfUrl(data.pdfUrl || '');
      setTranscriptionId(data.transcriptionId);
    } catch (error) {
      clearInterval(interval);
      console.error(error);
      showAlert('שגיאה בתמלול הקובץ', 'error');
    } finally {
      setIsTranscribing(false);
    }
  };

  const handleSavePdf = async () => {
    setLoading(true);
    try {
      const { data } = await axios.post('https://localhost:7170/api/Transcription/save-edited-transcription', {
        EditedText: editedTranscript,
        OriginalFileUrl: uploadedFileUrl,
        UserId: user.id,
      });

      if (data.pdfUrl) {
        console.log(data.pdfUrl); // For debugging purposes, you can remove this line later
        
        debugger;
        setPdfUrl(data.pdfUrl);
        setPdfUrl(data.pdfUrl);
        showAlert('הקובץ נשמר כ־PDF בהצלחה!', 'success');
      } else {
        showAlert(data.errorMessage || 'שגיאה בשמירת הקובץ כ־PDF', 'error');
      }
    } catch (err) {
      showAlert('שגיאה בשמירת הקובץ כ־PDF', 'error');
    } finally {
      setLoading(false);
    }
  };

  return {
    file,
    uploadProgress,
    handleFileChange,
    handleUpload,
    uploadedFileUrl,
    pdfUrl,
    isTranscribing,
    transcribeProgress,
    transcript,
    editedTranscript,
    setEditedTranscript,
    handleTranscription,
    handleSavePdf,
    loading,
    open,
    alertMessage,
    alertSeverity,
    closeAlert,
    buttonStyle,
  };
};

export default useFileUploader;
