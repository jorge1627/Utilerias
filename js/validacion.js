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
  concentrado_dia(datosV);
  //json_to_excel(datosV);
  //llenar_table(datosV);

  console.log(datosV);
};


function llenar_table(d) {
  tbodyValidacion.innerHTML ="";
  let tr = "";
  d.map(e => {
      tr += `<tr>  
      <td>${e['MAC']}</td>
      <td>${e['GRUPO']}</td>
      <td>${e['FOLIO SOLICITUD']}</td>
      <td>${e['PULGAR I']}</td>
      <td>${e['INDICE I']}</td>
      <td>${e['MEDIO I']}</td>
      <td>${e['ANULAR I']}</td>
      <td>${e['MEÑIQUE I']}</td>
      <td>${e['PULGAR D']}</td>
      <td>${e['INDICE D']}</td>
      <td>${e['MEDIO D']}</td>
      <td>${e['ANULAR D']}</td>
      <td>${e['MEÑIQUE D']}</td>
      <td>${e['MI']}</td>
      <td>${e['DF']}</td>
      <td>${e['CD']}</td>
      <td>${e['FOTOGRAFÍA']}</td>
      <td>${e['FECHA REVISIÓN']}</td>
      <td>${e['FUNCIONARIO QUE REGISTRA LA SOLICITUD INDIVIDUAL']}</td>
      <td>${e['FUNCIONARIO QUE DIGITALIZA MEDIOS DE IDENTIFICACION']}</td>
    </tr>`;
  });
  tbodyValidacion.innerHTML = tr;
}

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
  console.log(workbook);
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


function json_to_excelConcentrado(concentrado,grupo) {
  let HojaC = XLSX.utils.json_to_sheet(concentrado);
  let HojaG = XLSX.utils.json_to_sheet(grupo);
  let workbook = {
    Sheets: { Concentrado: HojaC, Grupo: HojaG  },
    SheetNames: ["Concentrado", "Grupo"],
  };
  let excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
  console.log(workbook);
  saveAsExcelFile(excelBuffer, "Concentrado");
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
    let _nivel_acciones = [];
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
      if (!_nivel_acciones.includes(accion)) {
        _nivel_acciones.push(accion);
      }
    });

    if ((_nivel_acciones.length > 1) & _nivel_acciones.includes(1)) {
      _nivel_acciones.sort();
      _nivel_acciones.splice(0, 1);
    }
    solicitud["NIVEL DE ACCIÓN SEGÚN LA INCIDENCIA (1 AL 4)"] =
      _nivel_acciones.toString();
    solicitud["nivel_2_huellas"] = acciones2;
    solicitud["nivel_4_huellas"] = acciones4;
    let ultimo_nivelAccion = _nivel_acciones.reverse()[0];
    solicitud["OBSERVACIONES(SEÑALAR EL SOPORTE DOCUMENTAL)"] =
      inconsistencia_soporte[ultimo_nivelAccion];
    solicitud["Acción"] = inconsistencia_detalle_accion[ultimo_nivelAccion];
  });
}



  function concentrado_dia(datos) {    
    let grupos =  {};
    let iEncontrada= []
    datos.map((e) => {
      let MI = 0,
        DF = 0,
        CD = 0,
        mano_i = 0,
        mano_d = 0,
        foto = 0,
        con_inc = 0, 
        sin_inc = 1
        let inc = {"grupo":e.GRUPO, "folio":e["FOLIO SOLICITUD"], "MI": "", "DF":"","CD":"","MDER":"","MIZQ":"","foto":""};
      if (e.MI > 1){
         MI = 1, con_inc = 1, sin_inc=0
         inc.MI = e.MI
        }
      if (e.DF > 1){
        DF = 1, con_inc = 1, sin_inc=0;
        inc.DF =  e.DF
      } 
      if (e.CD > 1){
        CD = 1, con_inc = 1, sin_inc=0;
        inc.CD = e.CD
      } 
      if (e["FOTOGRAFÍA"] > 1){
        foto = 1, con_inc = 1, sin_inc=0;
        inc.foto = e[FOTOGRAFÍA];
      } 
      mano_derecha.map((d) => {
        if (e[d] > 1){
          mano_d = 1, con_inc = 1, sin_inc=0;
          inc.MDER = "X"
        } 
      });
      mano_izquierda.map((i) => {
        if (e[i] > 1) {
          mano_i = 1, con_inc = 1, sin_inc=0;
          inc.MIZQ = "X"
        }
      });
      iEncontrada.push(inc);
      
      if (!grupos[e.GRUPO]) {
        grupos[e.GRUPO] = {
          Fecha: e["FECHA REVISIÓN"],
          noR: 1,
          MI,
          DF,
          CD,
          mano_i,
          mano_d,
          foto,
          con_inc,
          sin_inc
        };
      } else {
        grupos[e.GRUPO].noR++;
        grupos[e.GRUPO].MI += MI;
        grupos[e.GRUPO].DF += DF;
        grupos[e.GRUPO].CD += CD;
        grupos[e.GRUPO].mano_i += mano_i;
        grupos[e.GRUPO].mano_d += mano_d;
        grupos[e.GRUPO].foto += foto;
        grupos[e.GRUPO].con_inc += con_inc;
        grupos[e.GRUPO].sin_inc += sin_inc;
      }
    });

    tbodyIncEncontrada.innerHTML = "";
    let trEncontradas = "";
    iEncontrada.map(e =>{
      trEncontradas += `<tr>  
        <td>${e['grupo']}</td>
        <td>${e['folio']}</td>
        <td>${e['MI']}</td>
        <td>${e['DF']}</td>
        <td>${e['CD']}</td>
        <td>${e['MDER']}</td>
        <td>${e['MIZQ']}</td>
        <td>${e['foto']}</td>
      </tr>`;
    });
    
    tbodyIncEncontrada.innerHTML = trEncontradas;
    
    tbodyConcentrado.innerHTML ="";
    let tr = "";
    for(c in grupos){
      let e = grupos[c];
      tr += `<tr>  
        <td>${c}</td>
        <td>${e['noR']}</td>
        <td>${e['Fecha']}</td>
        <td>${e['noR']}</td>
        <td>${e['sin_inc']}</td>
        <td>${e['con_inc']}</td>
        <td>${e['MI']}</td>
        <td>${e['DF']}</td>
        <td>${e['CD']}</td>
        <td>${e['mano_d']}</td>
        <td>${e['mano_i']}</td>
        <td>${e['foto']}</td>
      </tr>`;
    }
    tbodyConcentrado.innerHTML = tr;

    json_to_excelConcentrado(iEncontrada,[grupos]);

  }

