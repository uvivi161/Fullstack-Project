// // React Component
// import React, { useState } from 'react';
// import axios, { AxiosProgressEvent } from 'axios';

// const FileUploader = () => {
//   const [file, setFile] = useState<File | null>(null);
//   const [progress, setProgress] = useState(0);

//   const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     debugger;
//     if (e.target.files) {
//       setFile(e.target.files[0]);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) return;
//     try {
//       // שלב 1: קבלת Presigned URL מהשרת
//       interface PresignedUrlResponse {
//         url: string;
//       }

//       const response = await axios.get<PresignedUrlResponse>('https://localhost:7170/api/FileUpload/presigned-url', {
//         params: { fileName: file.name }
//       });
//       console.log(response);
      

//       const presignedUrl = response.data.url;
//       debugger;
//       if(file.type == 'mp3' || file.type == 'pdf')
//       {
//         // שלב 2:  הקובץ ישירות ל-S3
//         await axios.put(presignedUrl, file, {
//           headers: {
//             'Content-Type': 'mp3/pdf',
//           },
//           onUploadProgress: (progressEvent: AxiosProgressEvent) => {
//             const percent = Math.round(
//               (progressEvent.loaded * 100) / (progressEvent.total || 1)
//             );
//             setProgress(percent);
//           },
//         });
  
//         alert('הקובץ הועלה בהצלחה!');
//       }
//       else{
//         alert('this type of file is not valid')
//       }
//     } catch (error) {
//       console.error('שגיאה בהעלאה:', error);
//     }
//   };

//   return (
//     <div>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload}>העלה קובץ</button>
//       {progress > 0 && <div>התקדמות: {progress}%</div>}
//     </div>
//   );
// };

// export default FileUploader;





import React, { useState } from 'react';
import axios, { AxiosProgressEvent } from 'axios';

const FileUploader = () => {
  const [file, setFile] = useState<File | null>(null);
  const [progress, setProgress] = useState(0);
  const [uploading, setUploading] = useState(false); // מצב להעלאה

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleUpload = async () => {
    if (!file) return;
    try {
      setUploading(true); // מתחילים את ההעלאה
      const response = await axios.get<{ url: string }>('https://localhost:7170/api/FileUpload/presigned-url', {
        params: { fileName: file.name }
      });
      const presignedUrl = response.data.url;
      debugger;
      if (file.type.toLowerCase() === 'application/pdf' || file.type.toLowerCase() === 'audio/mp3/mpeg') {
        await axios.put(presignedUrl, file, {
          headers: {
            'Content-Type': file.type,
          },
          onUploadProgress: (progressEvent: AxiosProgressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / (progressEvent.total || 1)
            );
            setProgress(percent);
          },
        });

        alert('הקובץ הועלה בהצלחה!');
      } else {
        alert('סוג הקובץ לא נתמך');
      }
    } catch (error) {
      console.error('שגיאה בהעלאה:', error);
    } finally {
      setUploading(false); // סיום העלאה
    }
  };

  return (
    <div style={styles.container as React.CSSProperties}>
      <input
        type="file"
        onChange={handleFileChange}
        disabled={uploading}
        style={styles.fileInput}
      />
      <button
        onClick={handleUpload}
        disabled={uploading || !file}
        style={styles.uploadBtn}
      >
        {uploading ? 'העלאה בתהליך...' : 'העלה קובץ'}
      </button>

      {progress > 0 && !uploading && (
        <div style={styles.progressContainer}>
          <div style={{ ...styles.progressBar, width: `${progress}%` }} />
          <div style={styles.progressText as React.CSSProperties}>{progress}%</div>
        </div>
      )}
    </div>
  );
};

// Style object for inline styles
const styles = {
  container: {
    width: '300px',
    padding: '20px',
    backgroundColor: '#f9f9f9',
    borderRadius: '8px',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  fileInput: {
    marginBottom: '15px',
    padding: '10px',
    fontSize: '16px',
    border: '2px solid #ccc',
    borderRadius: '5px',
    width: '100%',
  },
  uploadBtn: {
    padding: '10px 20px',
    backgroundColor: '#4CAF50',
    color: 'white',
    fontSize: '16px',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  progressContainer: {
    width: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '5px',
    overflow: 'hidden',
    marginTop: '10px',
  },
  progressBar: {
    height: '10px',
    backgroundColor: '#4CAF50',
    transition: 'width 0.3s ease-in-out',
  },
  progressText: {
    textAlign: 'center',
    marginTop: '5px',
    fontSize: '14px',
    color: '#555',
  },
};

export default FileUploader;
