import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';

export default function ImageProcessor({ sendDataToParent }) {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const onDrop = useCallback((acceptedFiles) => {
    if (acceptedFiles && acceptedFiles[0]) {
      setSelectedFile(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: 'image/*',
    multiple: false,
  });

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!selectedFile) return;

    setIsLoading(true);
    const formData = new FormData();
    formData.append('image', selectedFile);

    try {
      const response = await fetch('http://localhost:5000/img', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Image processing failed');
      }

      const data = await response.json();

      
      const imageUrl1 = `data:image/jpeg;base64,${data.image1}`;
      const imageUrl2 = `data:image/jpeg;base64,${data.image2}`;
      const imageUrl3 = `data:image/jpeg;base64,${data.image3}`;

    
      sendDataToParent([imageUrl1, imageUrl2, imageUrl3]);
    } catch (error) {
      console.error('Error processing image:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <div className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div
            {...getRootProps()}
            className={`p-6 border-2 border-dashed rounded-lg text-center cursor-pointer transition-colors ${
              isDragActive ? 'border-blue-500 bg-blue-50' : 'border-gray-300 hover:border-blue-500'
            }`}
          >
            <input {...getInputProps()} />
            {isDragActive ? (
              <p className="text-blue-500">Drop the image here ...</p>
            ) : (
              <p id="drag-drop-text">Drop an image here, or click to select one</p>
            )}
            {selectedFile && (
              <p className="mt-2 text-sm text-gray-500" id="sel">
                Selected file: {selectedFile.name}
              </p>
            )}
          </div>
          <button
            type="submit"
            disabled={!selectedFile || isLoading}
            id="butt"
          >
            {isLoading ? 'Processing...' : 'Process Image'}
          </button>
        </form>
      </div>
    </div>
  );
}
