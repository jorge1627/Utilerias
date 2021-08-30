const inconsistencia_documento_identidad = {
  1: { descripcion: "Sin inconsistencia", accion: 1 },
  2: {
    descripcion: "Imagen de mi borrosa, informacion no visible o incompleta",
    accion: 2,
  },
  3: { descripcion: "Mi no enlistado en el acuerdo de la cnv", accion: 4 },
  4: {
    descripcion:
      "Mi digitalizado en apartado diferente o al que le corresponde",
    accion: 3,
  },
  5: {
    descripcion:
      "Diferencia entre la informacion captada en el tramite contra la asentada en el mi",
    accion: 4,
  },
  6: {
    descripcion:
      "Medios de identificacion sin informacion en la imagen (imagen totalmente blanca o negra)",
    accion: 4,
  },
  7: {
    descripcion: "Mi no vigente en terminos del acuerdo de la cnv",
    accion: 3,
  },
  8: {
    descripcion:
      "Falta anverso/reverso del mi, con informacion que se sustente en el tramite",
    accion: 2,
  },
  9: { descripcion: "Fecha no visible en el mi", accion: 4 },
  10: {
    descripcion:
      "Mi aprobado por la cnv en el que se advierte el no cumplimiento de algunos requisitos",
    accion: 3,
  },
  11: { descripcion: "Credencial para votar no vigente", accion: 3 },
  12: {
    descripcion:
      "La informacion captada en el tramite difiere de la asentada en el mi",
    accion: 4,
  },
  13: {
    descripcion: "Documento de identidad sin lugar de nacimiento",
    accion: 3,
  },
  14: { descripcion: "Aparente copia", accion: 2 },
  15: { descripcion: "Documentos probablemente alterados", accion: 4 },
  16: { descripcion: "Incorrecto tipo de mi", accion: 4 },
  17: { descripcion: "Género no corresponde con la base de datos", accion: 2 },
  18: { descripcion: "Sin genero", accion: 2 },
  19: { descripcion: "Otro", accion: 4 },
};

const inconsistencia_huellas = {
  1: { descripcion: "Buena calidad", accion: 1 },
  4: { descripcion: "No requerido", accion: 1 },
  5: { descripcion: "Ausente (con leyenda)", accion: 1 },
  6: { descripcion: "Ausente (sin leyenda)", accion: 4 },
  7: { descripcion: "Cortada", accion: 2 },
  8: { descripcion: "Sin núcleo", accion: 2 },
  9: { descripcion: "Captada parcialmente", accion: 4 },
  10: { descripcion: "Con puntos blancos", accion: 2 },
  11: { descripcion: "Oscura", accion: 4 },
  12: { descripcion: "Ilegible", accion: 4 },
  13: { descripcion: "En posición horizontal", accion: 3 },
  14: { descripcion: "Incluye parte de otro dedo", accion: 1 },
  15: { descripcion: "Incluye siguiente falange", accion: 1 },
  16: { descripcion: "Con residuos de otra toma", accion: 2 },
};

const inconsistencia_fotografia = {
  1: { descripcion: "Buena calidad", accion: 1 },
  3: { descripcion: "Imagen no disponible", accion: 1 },
  4: { descripcion: "Con exceso de iluminación", accion: 2 },
  5: { descripcion: "Con poca resolución", accion: 4 },
  6: { descripcion: "Mal encuadrada", accion: 3 },
  7: { descripcion: "Con rostro 3/4 oblicuo", accion: 4 },
  8: { descripcion: "Borrosa", accion: 2 },
  9: { descripcion: "Oscura", accion: 2 },
  10: { descripcion: "Opaca", accion: 2 },
  11: { descripcion: "con fondo de color", accion: 2 },
};

const inconsistencia_accion = {
  1: "No requieren acción",
  2: "Revisión en MAC",
  3: "Reinstrucción",
  4: "Intervención directa",
};

const inconsistencia_soporte = {
    1:"Ninguno",
    2:"Cédula de supervisión a MAC y Minuta.",
    3:"Lista de asistencia y guía de observación.",
    4:"Minuta de reunión, Oficio INE/JDE03/VRFE/1722/2021 e informe de hechos del funcionario."
}

const inconsistencia_detalle_accion = {
  1: "Ninguno",
  2: `Se realizó la supervisión en MAC y reunión de trabajo con funcionarios, donde se les instruyó de acuerdo con lo establecido en:
            A) Instrucciones de Trabajo para la Operación del Módulo de Atención Ciudadana. Tomo I. Punto 1. Captura del trámite. 1.4 Imágenes. 1.4.2 Captura Huellas.  
            B) Consideraciones: punto 4.2. 
            C) Casos especiales para la captura de las Huellas`,
  3: "Cédula de supervisión a MAC y Minuta.",
  4: "Minuta de reunión, Oficio INE/JDE03/VRFE/1722/2021 e informe de hechos del funcionario.",
};

const huellas = [
  "PULGAR I",
  "INDICE I",
  "MEDIO I",
  "ANULAR I",
  "MEÑIQUE I",
  "PULGAR D",
  "INDICE D",
  "MEDIO D",
  "ANULAR D",
  "MEÑIQUE D",
];

const mano_derecha = [  
  "PULGAR D",
  "INDICE D",
  "MEDIO D",
  "ANULAR D",
  "MEÑIQUE D",
];

const mano_izquierda = [
  "PULGAR I",
  "INDICE I",
  "MEDIO I",
  "ANULAR I",
  "MEÑIQUE I",
]





///Auxiliares de requerimientos--------------------------------------------------------------------------
//2: (datos) => {
//  let detalle = `Se realizó la supervisión en MAC y reunión de trabajo con funcionarios, donde se les instruyó de acuerdo con lo establecido en:
//          A) Instrucciones de Trabajo para la Operación del Módulo de Atención Ciudadana. Tomo I. Punto 1. Captura del trámite. 1.4 Imágenes. 1.4.2 Captura Huellas.  
//          B) Consideraciones: punto 4.2. `;
//  for (const d in datos) {
//      if(datos[d]>1){
//          detalle +=`Se encontraron ${datos[d]} huellas con clave ${d} “${inconsistencia_huellas[d].descripcion}”.\n `
//      }else{
//          detalle +=`Se encontro 1 huella con clave ${d} “${inconsistencia_huellas[d].descripcion}”.\n `
//      }      
//  }
//  return detalle;





//<div class="row table-responsive">
//<table class="table table-bordered table-condensed">
//  <thead>
//    <tr>    
//      <th>MAC</th>
//      <th>GRUPO</th>
//      <th>FOLIO SOLICITUD</th>
//      <th>PULGAR I</th>
//      <th>INDICE I</th>
//      <th>MEDIO I</th>
//      <th>ANULAR I</th>
//      <th>MEÑIQUE I</th>
//      <th>PULGAR D</th>
//      <th>INDICE D</th>
//      <th>MEDIO D</th>
//      <th>ANULAR D</th>
//      <th>MEÑIQUE D</th>
//      <th>MI</th>
//      <th>DF</th>
//      <th>CD</th>
//      <th>FOTOGRAFÍA</th>
//      <th>FECHA REVISIÓN</th>
//      <th>FUNCIONARIO QUE REGISthA LA SOLICITUD INDIVIDUAL</th>
//      <th>FUNCIONARIO QUE DIGITALIZA MEDIOS DE IDENTIFICACION</th>
//    </tr>
//  </thead>
//  <tbody>
//  </tbody>
//</table>
//</div>