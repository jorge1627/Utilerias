async function gettext(){
  var data = await arrayPDF(pdfFiles.files[0]);
  var pdf = pdfjsLib.getDocument({data})
  return pdf.promise.then(function(pdf) { // get all pages text
    var maxPages = pdf._pdfInfo.numPages;
    var countPromises = []; // collecting all page promises
    for (var j = 1; j <= maxPages; j++) {
      var page = pdf.getPage(j);

      var txt = "";
      countPromises.push(page.then(function(page) { // add page promise
        var textContent = page.getTextContent();

        var viewport = page.getViewport( {scale: 1.5} );

        //We'll create a canvas for each page to draw it on
        var canvas = document.createElement( "canvas" );
        canvas.style.display = "block";
        var context = canvas.getContext('2d');
        canvas.height = viewport.height;
        canvas.width = viewport.width;
        
        var renderContext = {
          canvasContext: context,
          viewport: viewport
        };
        var renderTask = page.render(renderContext);
           


        return textContent.then(function(text){ // return content promise
         console.log(text.items.map(function (s) { return s.str; }).join('')); // value page text 
        });


      }));
    }
    // Wait for all pages and join text
    return Promise.all(countPromises).then(function (texts) {
      return texts.join('');
    });
  });
}



function arrayPDF(file) {
  return new Promise((resolve,reject) => {
    var fileR =  new FileReader();
    fileR.onload = function() {
      var typedarray = new Uint8Array(this.result);                  
       resolve(typedarray); 
  };
  //Step 3:Read the file as ArrayBuffer
  fileR.readAsArrayBuffer(file);
  });
  
}