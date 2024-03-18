export function Txt ()  {
    const file = fileInput.files[0];
    const reader = new FileReader();

    reader.onload = function (event) {
        const textContent = event.target.result; // Extracted text content
        console.log(textContent);
    };

    reader.readAsText(file);

};


export function Pdf () {

}