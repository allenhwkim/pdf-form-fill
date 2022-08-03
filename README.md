# pdf-form-fill
Fill out pdf form using pdfjs-dist and node-pdftk


## Install

### ATTENTION: [pdftk](https://en.wikipedia.org/wiki/PDFtk) required
Your system must have pdftk installed
  * For ubuntu, 
    ```
    $ sudo apt install pdftk-java
    ```
### now, install packages
```
$ npm i
```

## USAGE

To get list of PDF form fileds
```
$ node ./index.js # it outputs all list of form fields
```

To fill the form
```
$ node ./fill-form.js # output to output.pdf
```

