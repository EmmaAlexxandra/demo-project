'use client';

import { useState, useEffect } from 'react';

function Home() {
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [imageList, setImageList] = useState<string[]>([]);

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    if (event.target.files && event.target.files.length > 0) {
      setSelectedFile(event.target.files[0]);
    }
  }

  async function handleUpload() {
    console.log('Upload started', selectedFile);
  
    if (!selectedFile) {
      console.warn('No file selected!');
      return;
    }
  
    const formData = new FormData();
    formData.append('file', selectedFile);
  
    const res = await fetch('/api/upload', {
      method: 'POST',
      body: formData,
    });
  
    if (!res.ok) {
      const err = await res.text();
      console.error('Upload failed:', err);
    } else {
      console.log('Upload successful');
      fetchImages(); 
    }
  }
  

  function fetchImages() {
    fetch('/api/images')
      .then(response => response.json())
      .then(data => {
        setImageList(data.images || []);
      });
  }
  

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <main className="p-4">
      <h1 className="text-lg font-bold mb-4">Image Upload</h1>

      <input type="file" accept="image/*" onChange={handleFileChange} />
      <button
        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded"
        onClick={handleUpload}
      >
        Upload
      </button>

      <div className="mt-6 grid grid-cols-2 gap-4">
        {imageList.map(function (src, index) {
          return (
            <img
              key={index}
              src={`/uploads/${src}`}
              className="w-full h-auto border rounded"
              alt="Uploaded"
            />
          );
        })}
      </div>
    </main>
  );
}

export default Home;
