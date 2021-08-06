btnValidar.onclick = async () => {
  if (!excelFile.value) {
    toast(
      "Seleccione un archivo de excel para validar, recuerde debe llevar el formato correcto"
    );
    excelFile.focus();
    return false;
  }
  let datosV = await excel_to_json();
  asignar_niveles_accion(datosV);
  json_to_excel(datosV);
  console.log(datosV);
};

function excel_to_json() {
  return new Promise((resolve, reject) => {
    var fileReader = new FileReader();
    fileReader.onload = function (event) {
      var data = event.target.result;

      var workbook = XLSX.read(data, {
        type: "binary",
      });
      let rowObject;
      workbook.SheetNames.forEach((sheet) => {
        rowObject = XLSX.utils.sheet_to_row_object_array(
          workbook.Sheets[sheet]
        );
      });
      resolve(rowObject);
    };
    fileReader.readAsBinaryString(excelFile.files[0]);
  });
}

function json_to_excel(data_json) {
  let worksheet = XLSX.utils.json_to_sheet(data_json);
  let workbook = {
    Sheets: { Validación: worksheet },
    SheetNames: ["Validación"],
  };
  let excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  console.log(excelBuffer);
  saveAsExcelFile(excelBuffer, "ejemplo");
}

function saveAsExcelFile(buffer, fileName) {
  let blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8",
  });
  let link = document.createElement("a");
  link.href = window.URL.createObjectURL(blob);
  link.download = fileName;
  link.click();
}

function asignar_niveles_accion(datos) {
  datos.map((solicitud) => {
    let acciones = [];
    let acciones2 = {};
    let acciones4 = {};
    huellas.map((huella) => {
      let noIncidencia = solicitud[huella];

      let accion = inconsistencia_huellas[noIncidencia].accion;
      switch (accion) {
        case 2:
          if (acciones2[noIncidencia]) {
            acciones2[noIncidencia]++;
          } else {
            acciones2[noIncidencia] = 1;
          }
          break;
        case 4:
          acciones4[huella] = noIncidencia;
          break;
      }
      if (!acciones.includes(accion)) {
        acciones.push(accion);
      }
    });

    if ((acciones.length > 1) & acciones.includes(1)) {
      acciones.sort();
      acciones.splice(0, 1);
    }

    solicitud["NIVEL DE ACCIÓN SEGÚN LA INCIDENCIA (1 AL 4)"] = acciones.toString();
    solicitud["nivel_2_huellas"] = acciones2;
    solicitud["nivel_4_huellas"] = acciones4;
    solicitud["OBSERVACIONES(SEÑALAR EL SOPORTE DOCUMENTAL)"] = inconsistencia_soporte[acciones.reverse()[0]];
  });
}
