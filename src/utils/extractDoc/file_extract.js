import { getDocument } from "pdfjs-dist";
import mammoth from "mammoth";
// import pdf from 'pdf-parse';

export async function extractTextFromTXT(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = function (event) {
      const name = file.name;
      const content = event.target.result;
      resolve({ name, content });
    };
    reader.onerror = function (error) {
      reject(error);
    };
    reader.readAsText(file);
  });
}

export async function extractTextFromPDF(file) {
//   const data = await pdf(file);
  console.log({data})
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
                const name = file.name;
                const content = textContent.join("\n");
                resolve({ name, content });
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
  const name = file.name;
  const content = result.value;
  return { name, content };
}


export function isTXTFile(file) {
  return file.type === 'text/plain';
}


export function isPDFFile(file) {
  return file.type === 'application/pdf';
}

export function isDOCFile(file) {
  return file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}