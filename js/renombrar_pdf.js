btnValidacion.onclick = () => {
  window.location = "validacion.html";
};

btnValidacionMensual.onclick = () => {
  window.location = "validacionMensual.html";
};

btnpdf.disabled = true;

async function gettext(file) {
  var data = await arrayPDF(file);
  var pdf = pdfjsLib.getDocument({ data });
  return pdf.promise.then(function (pdf) {
    // get all pages text
    var maxPages = pdf._pdfInfo.numPages;
    var countPromises = []; // collecting all page promises
    for (var j = 1; j <= maxPages; j++) {
      var page = pdf.getPage(j);

      var txt = "";
      countPromises.push(
        page.then(function (page) {
          // add page promise
          var textContent = page.getTextContent();
          return textContent.then(function (text) {
            // return content promise
            return obtener_nombre_solicitud(
              text.items
                .map(function (s) {
                  return s.str;
                })
                .join("")
            ); // value page text
          });
        })
      );
    }
    // Wait for all pages and join text
    return Promise.all(countPromises).then(function (texts) {
      return texts.join("");
    });
  });
}

function arrayPDF(file) {
  return new Promise((resolve, reject) => {
    var fileR = new FileReader();
    fileR.onload = function () {
      var typedarray = new Uint8Array(this.result);
      resolve(typedarray);
    };
    //Step 3:Read the file as ArrayBuffer
    fileR.readAsArrayBuffer(file);
  });
}

const pdf_zip = () => {
  let zip = new JSZip();
  let files = Array.from(pdfFiles.files);
  Promise.all(
    files.map(async (e) => {
      let nombre = await gettext(e);
      zip.file(`${nombre}.pdf`, e);
    })
  ).then(() => {
    zip.generateAsync({ type: "blob" }).then(
      function (blob) {
        // 1) generate the zip file
        saveAs(blob, "Cédulas individuales.zip"); // 2) trigger the download
      },
      function (err) {
        toast(err);
      }
    );
  });
};

const obtener_nombre_solicitud = (text) => {
  let indice1 = text.indexOf("FECHA DE REVISIÓN") + 17;
  let text1 = text.substring(indice1);
  let indice2 = text1.indexOf(" ");
  let nombre = text1.substring(0, indice2);
  return nombre;
};

btnRenombrar.onclick = () => {
  if (!pdfFiles.files.length) {
    toast("Seleccione al menos un archivo pdf para renombrar");
    pdfFiles.focus();
    return false;
  }
  pdf_zip();
};
