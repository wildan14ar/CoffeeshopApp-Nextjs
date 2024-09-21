"use client"

import { useState } from 'react';

const Upload = ({ onUpload }) => {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files[0]; // Mendapatkan file yang dipilih

    if (!file) {
      setError('Please select a file to upload');
      return;
    }

    setError('');
    setLoading(true);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('/api/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();

      if (response.ok) {
        onUpload(result.url); // Mengirim URL ke parent component
      } else {
        setError(result.error || 'File upload failed');
      }
    } catch (err) {
      setError('An error occurred during file upload');
    }

    setLoading(false);
  };

  return (
    <div>
      <h2>Upload an Image</h2>
      <input 
        type="file" 
        onChange={handleFileChange} 
        accept="image/*"
        disabled={loading} // Disable input saat proses upload
      />
      {error && <p style={{ color: 'red' }}>{error}</p>}
      {loading && <p>Uploading...</p>}
    </div>
  );
};

export default Upload;
