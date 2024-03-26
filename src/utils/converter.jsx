export const base64ToArrayBuffer = (strings) => {
    return Buffer.from(strings, "base64");
  };
  
  export const arrayBufferToBase64 = (arrayBuffer) => {
    const b = Buffer.from(arrayBuffer);
    return b.toString("base64");
  };
  