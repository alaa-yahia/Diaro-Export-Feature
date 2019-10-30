# Diaro-Export-Feature
#### This a node JS app to mimic the export feature of Diaro app
It exports to both HTML & PDF files with HTML being the default

## Dependencies:
* Html-pdf
* Puppeteer
* xml-js
#### Install npm dependencies using `npm install`
You can skip Puppeteer if you want to export entries to pdf without images.
## To generate files:
1. Put diaro backup file as well as `media` folder into `xml` folder [there is dummy data included for test purposes]
2. Run the node JS app: 
* `node diaro.js` // This is the default, it will generate the html file with all the entries & images.
* `node diaro.js -pdf` // To export to a pdf file without images (fast pdf export).
* `node diaro.js -pdf -img` // To export to a pdf file with images included (somehow slow).

#### Files will be put in `generatedFiles` folder.
