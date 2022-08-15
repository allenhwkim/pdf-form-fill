// Refs. 
// https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFDocumentProxy.html
// https://github.com/mozilla/pdf.js/blob/b8aa9c62217492c845ae3f27cc368aec7a58f38a/examples/node/getinfo.js
//

const fs = require('fs').promises;
const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");
const { PDFDocument } = require('pdf-lib');

async function getFields(pdfPath) {
  const contents = await fs.readFile(pdfPath);
  const pdfRaw = new Uint8Array(contents);

  const pdfDocument = await pdfjsLib.getDocument(pdfRaw).promise;
  const fields = await pdfDocument.getFieldObjects();

  return {pdfRaw, fields};
}

async function fillForm(pdfRaw, fields, data) {
  const pdfDoc = await PDFDocument.load(pdfRaw)
  const form = pdfDoc.getForm();

  for (var key in data) {
    const fieldType = fields[key][0].type;
    const value = data[key];
    switch (fieldType) {
      case 'text': 
        form.getTextField(key).setText(value);
        break;
      case 'combobox':
        form.getDropdown(key).select(value);
        break;
      case 'checkbox':
        const method = value ? 'check' : 'uncheck';
        form.getCheckBox(key)[method]();
        break;
      case 'options':
        form.getOptionsList(key).select(Array.from(value));
        break;
      case 'radiogroup':
        form.getRadioGroup(key).select(value);
        break;
      // case 'signature':
      //   break;
      default:
    }
  }

  const pdfBytes = await pdfDoc.save();
  // const base64Pdf = await pdfDoc.saveAsBase64({ dataUri: true });

  return pdfBytes;
}

// NOTE: encrypted pdf file is not supported. Please use non-encrypted pdf only

getFields('example.pdf')
  .then(({pdfRaw, fields}) => {
    const data = {
      'Given Name Text Box': 'Allen',
      'Family Name Text Box': 'Kim',
      'House nr Text Box': '123',
      'Address 1 Text Box': 'Fantacy Road',
      'Address 2 Text Box': 'N/A',
      'Postcode Text Box': 'L1L1L1',
      'Country Combo Box': 'Netherlands', 
      'Height Formatted Field': '170', 
      'City Text Box': 'Brampton', 
      'Driving License Check Box': true, 
      'Favourite Colour List Box': 'Orange', 
      'Language 1 Check Box': true, 
      'Language 2 Check Box': true, 
      'Language 3 Check Box': true, 
      'Language 4 Check Box': true, 
      'Language 5 Check Box': true, 
      'Gender List Box': 'Woman' 
    };
    return fillForm(pdfRaw, fields, data);
  })
  .then(outData => fs.writeFile('output.pdf', outData))
  .then(resp => console.log('output.pdf ready'))