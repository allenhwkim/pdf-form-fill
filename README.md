# pdf-form-fill
Fill out pdf form using pdfjs-dist and pdf-lib(or pdftk)

# Usage

### pdf-lib example
* Pros: No system-level dependency
* Cons: Not supporting encrypted pdf files. 
  e.g. pdftk-example/0265-82.pdf(128-bit aes encrypted with permission password)
```
$ npm i
$ cd pdf-lib-example
$ node fill-form.js # example.pdf + data = output.pdf
```
| template | output |
| --------- | ------- |
| ![image](https://user-images.githubusercontent.com/1437734/184568496-4c02598d-1374-4a8f-a5d9-2d9bfa470788.png)  |  ![image](https://user-images.githubusercontent.com/1437734/184568414-54f2dd68-9235-4263-b999-4fad9ed69334.png) |

### pdftk example
* Pros: Support encryted pdf files
* Cons: [pdftk](https://en.wikipedia.org/wiki/PDFtk) required  
  For ubuntu, `$ sudo apt install pdftk-java`
```
$ npm i
$ cd pdftk-examle
$ node fill-form.js # 0265-82.pdf + data = output.pdf
```