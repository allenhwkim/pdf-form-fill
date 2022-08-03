// Refs. 
// https://mozilla.github.io/pdf.js/api/draft/module-pdfjsLib-PDFDocumentProxy.html
// https://github.com/mozilla/pdf.js/blob/b8aa9c62217492c845ae3f27cc368aec7a58f38a/examples/node/getinfo.js
//

const pdfjsLib = require("pdfjs-dist/legacy/build/pdf.js");

const pdfPath = './0265-82.pdf';
pdfjsLib.getDocument(pdfPath).promise.then(function (doc) { // a PDFDocumentProxy, 
  const stats = doc.stats;
  console.log({stats})
  doc.getCalculationOrderIds().then(resp => {
    console.log('.... caculationOrderIds', resp)
    return doc.getDownloadInfo();
  })
  .then(resp => {
    console.log('..... downloadInfo', resp);
    return doc.getMetadata();
  })
  .then(resp => {
    console.log('.... metaData', resp.info, resp.metadata.getAll())
    return doc.getFieldObjects();
  })
  .then(fieldObjects => {
    const resp = {};
    // console.log(fieldObjects['74'])
    for (var key in fieldObjects) {
      console.log(key, ':')
      const fieldInfos = fieldObjects[key];
      const fields = fieldInfos.map(fieldInfo => {
        const {type, name, value, defaultValue, exportValues, editable, hidden, page, rect} = fieldInfo;
        return {type, name, value, defaultValue, exportValues, editable, hidden, page, rect}
      });
      resp[key] = fields;
    }
    return resp;
  })
  .then(resp => {
    for (var key in resp) {
        console.log(`\n${key}:`);
        resp[key].filter(el => el.editable).forEach(el => {
        const {type, name, value, defaultValue, exportValues, page, rect} = el;
        console.log( '  ', JSON.stringify({type, name, exportValues, page, rect}) );
      })
    }
  })
});
