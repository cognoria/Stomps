// import { RtfParser } from 'read-rtf'
import mammoth from "mammoth";

//extract txt formats
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

//extract pdf formats
export async function extractTextFromPDF(file) {
  // const content = await pdfToText(file)
  // return {name: file.name, content}
  return new Promise((resolve, reject) => {
    console.log("extractTextFromPDF")
    // Check if window is defined (i.e., if the code is running in the browser)
    if (typeof window == 'undefined') reject(new Error('pdfjs-dist can only be used in the browser environment.'));

    console.log("window is availableextractTextFromPDF")
    // Dynamically import pdfjsLib.getDocument to ensure it's only imported in the browser
    import('pdfjs-dist/webpack').then((pdfjsLib) => {
      console.log(pdfjsLib, pdfjsLib.GlobalWorkerOptions)
      // pdfjsLib.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjsLib.version}/pdf.worker.js`

      console.log("extractTextFromPDF: helper imported")
      const reader = new FileReader();
      reader.onload = async () => {
        console.log("extractTextFromPDF: Reader loaded")
        const loadingTask = pdfjsLib.getDocument(reader.result);
        console.log(loadingTask)
        try {
          const pdf = await loadingTask.promise;
          console.log("extractTextFromPDF: PDF loaded", pdf)
          const textContent = [];
          for (let pageNum = 1; pageNum <= pdf.numPages; pageNum++) {
            const page = await pdf.getPage(pageNum);
            const textContentItems = await page.getTextContent();
            const text = textContentItems.items.map((item) => item.str).join(" ");
            textContent.push(text);
          }
          const name = file.name;
          const content = textContent.join("\n");
          console.log({ name, content })
          resolve({ name, content });
        } catch (error) {
          reject(error);
        }
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file);
    }).catch((error) => {
      reject(error);
    });
  });
}

//extract documents
export async function extractTextFromDoc(file) {
  // if (file.type === 'application/rtf' || file.name.endsWith('.rtf')) return await extractTextFromRTF(file)

  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      const result = await mammoth.extractRawText({ buffer: reader.result });
      const name = file.name;
      const content = result.value;
      resolve({ name, content });
    }
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  })
}

//extract rtf formats
export async function extractTextFromRTF(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = async () => {
      try {
        const parser = new RtfParser();
        const rtf = parser.parse(reader.result)
        const name = file.name;
        const content = rtf.rawText;
        resolve({ name, content });
      } catch (error) {
        reject(error);
      }
    };
    reader.onerror = (error) => {
      reject(error);
    };
    reader.readAsArrayBuffer(file);
  });
}

export function isTXTFile(file) {
  return file.type === "text/plain";
}

export function isPDFFile(file) {
  return file.type === 'application/pdf';
}

export function isDOCFile(file) {
  return file.type === 'application/msword' || file.type === 'application/vnd.openxmlformats-officedocument.wordprocessingml.document';
}
