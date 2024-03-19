import { useEffect, useState } from 'react';
import * as pdfjsLib from 'pdfjs-dist/legacy/build/pdf';

// pdfjsLib.GlobalWorkerOptions.workerSrc = `/path/to/pdf.worker.js`;

export async function ExtractTextFromPDF(file) {
  const [pdfText, setPdfText] = useState('');

  useEffect(() => {
    const loadingTask = pdfjsLib.getDocument(file);
    loadingTask.promise
      .then((pdf) => {
        const textContent = [];
        for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
          pdf.getPage(pageNum).then((page) => {
            page.getTextContent().then((textContentItems) => {
              const text = textContentItems.items.map((item) => item.str).join(' ');
              textContent.push(text);
              if (pageNum === pdf.numPages) {
                const name = file.name;
                const content = textContent.join('\n');
                setPdfText({ name, content });
              }
            });
          });
        }
      })
      .catch((error) => {
        console.error('Error extracting text from PDF:', error);
      });
  }, [file]);

  return {name: file.name, content: pdfText};
}