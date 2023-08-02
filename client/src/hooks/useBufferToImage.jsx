import { useState, useEffect } from 'react';

const useBufferToImage = (bufferData) => {
  const [imageDataUrl, setImageDataUrl] = useState('');

  useEffect(() => {
    if (bufferData && bufferData.data) {
      const buffer = new Uint8Array(bufferData.data);
      const blob = new Blob([buffer], { type: bufferData.type });

      const reader = new FileReader();
      reader.onloadend = () => {
        setImageDataUrl(reader.result);
      };
      reader.readAsDataURL(blob);
    }
  }, [bufferData]);

  return imageDataUrl;
};

export default useBufferToImage;
