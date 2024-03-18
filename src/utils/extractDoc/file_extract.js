import { getDocument } from "pdfjs-dist";
import mammoth from "mammoth";
export async function extractTextFromTXT(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const fileName = file.name;
      const content = event.target.result;
      resolve({ fileName, content });
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsText(file);
  });
}

export async function extractTextFromPDF(file) {
  return new Promise((resolve, reject) => {
    const loadingTask = getDocument(file);
    loadingTask.promise
      .then((pdf) => {
        const textContent = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          pdf.getPage(pageNum).then((page) => {
            page.getTextContent().then((textContentItems) => {
              const text = textContentItems.items
                .map((item) => item.str)
                .join(" ");
              textContent.push(text);
              if (textContent.length === pdf.numPages) {
                const fileName = file.name;
                const content = textContent.join("\n");
                resolve({ fileName, content });
              }
            });
          });
        }
      })
      .catch((error) => {
        reject(error);
      });
  });
}

export async function extractTextFromDoc(file) {
  const result = await mammoth.extractRawText({ buffer: file });
  const fileName = file.name;
  const content = result.value;
  return { fileName, content };
}
