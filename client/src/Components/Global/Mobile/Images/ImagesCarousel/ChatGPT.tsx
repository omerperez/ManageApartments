import React, { useState } from "react";

interface Props {
  onDetected: (barcode: string) => void;
}

const BarcodeScanner: React.FC<Props> = ({ onDetected }) => {
  const [permission, setPermission] = useState(false);

  const requestPermission = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      setPermission(true);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      {permission ? (
        <video />
      ) : (
        <button onClick={requestPermission}>Request permission</button>
      )}
    </div>
  );
};

export default BarcodeScanner;
