import React, { useState } from 'react';
import ImageProcessor from './components/ImageProcessor';
import Description from './components/Description';

function App() {
  
  const [processedImages, setProcessedImages] = useState([]);

  
  const handleDataFromChild = (data) => {
    setProcessedImages(data); 
  };

  return (
    <div>
      <div className="flex-container">
        <div className="heading-container">
          <Description />
        </div>
        <div className="input-container">
          <div id="inputbg">
            <ImageProcessor sendDataToParent={handleDataFromChild} />
          </div>
        </div>
      </div>

      <div id="final">
      
      {processedImages.length > 0 && (
        <div className="processed-images-container">
          <div className="horizontal-scroll">
            {processedImages.map((imageUrl, index) => (
              <a key={index} href={imageUrl} download={`Coloured_${index + 1}.jpg`}>
                <img
                  src={imageUrl}
                  alt={`Processed version ${index + 1}`}
                  // className="w-32 h-32 object-cover rounded-lg shadow-md"
                  min-height="400px"
                  min-width="400px"
                />
              </a>
            ))}
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default App;
