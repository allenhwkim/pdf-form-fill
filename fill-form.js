const pdftk = require('node-pdftk');
const fs = require('fs');


pdftk
    .input('./0265-82.pdf')
    .fillForm({
       first: 'Allen',
       last: 'Kim',
       mid: 'HONG',
       y_birth: '2001',
       m_birth: '08',
       d_birth: '08'
    })
    .flatten()
    .output()
    .then(buffer => {
       // Do stuff with the output buffer
       fs.writeFileSync('./output.pdf', buffer);
    })
    .catch(err => {
      console.error(err);
      throw err;
        // handle errors
    });
