const getBase64: (files: File) => Promise<string> = (file: File) => {
  return new Promise((resolve) => {
    let baseURL: string | ArrayBuffer | null = "";
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      baseURL = reader.result ?? "";
      resolve(baseURL.toString());
    };
  });
};

export { getBase64 };
