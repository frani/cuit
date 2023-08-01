/*!
 * cuit <https://github.com/frani/cuit>
 *
 * Copyright (c) 2023-present, frani.
 * Released under the MIT License.
 */

"use strict";

/**
 * Basandome en la informacion de wiki https://es.wikipedia.org/wiki/Clave_%C3%9Anica_de_Identificaci%C3%B3n_Tributaria
 * es como voy a definir las variables dentro de este file:
 * - globalType: son los primeros dos dígitos iniciales que indican el tipo global
 * - dni: Documento nacional de identidad
 * - checkDigit: el ultimo numero es un dígito verificador.
 *
 * El dígito verificador es un mecanismo de detección de errores utilizado para verificar la corrección de un dato,
 * generalmente en soporte informático. Los dígitos de control se usan principalmente para detectar errores en el tecleo o
 * transmisión de los datos.
 */

const REGX = /\D+/g;
const ESTR = "";

/**
 * Format a valid cuit adding separator
 * @param {String} [dirty=''] CUIT number
 * @param {String} [separator="-"] default is "-"
 * @returns string
 */
const format = (dirty = "", separator = "-") => {
  const cuit = String(dirty).replace(REGX, ESTR).padStart(11, "0").slice(0, 11);
  const a = cuit.slice(0, 2);
  const b = cuit.slice(2, -1);
  const c = cuit.slice(-1);
  return [a, b, c].join(separator);
};

/**
 * Try to guess a CUIT/CUIL from a given DNI
 * @param {String} dni documento nacional de identidad
 * @param {String} gender "M" or "Masculino" | "F" or "femenino" | "" or "Indeterminado"
 * @param {String} [globalType="30"] by default is "30", pass "" in gender to use globalType as default, otherwise globalType going to
 * change based if gender is M o F
 * @returns CUIT
 */
const getCUITbyDNI = (dni = "", gender = "M", globalType = "30") => {
  let _globalType = globalType;

  gender = `${gender}`.toLowerCase();
  if (gender === "masculino") gender = "m";
  if (gender === "femenino") gender = "f";
  if (gender === "m") _globalType = "20";
  if (gender === "f") _globalType = "27";

  const _dni = String(dni).replace(REGX, ESTR).padStart(8, "0").slice(0, 8);
  const rest = `${_globalType}${_dni}`.split("").map(Number).reverse();
  const SUMA_P = rest.reduce(
    (acc, cur, index) => acc + cur * (2 + (index % 6)),
    0
  );
  const MOD11 = SUMA_P % 11;

  /**
   * Por defecto el dígito verificador pasa a ser la diferencia entre (11- Resto).
   * Si el resto es 0 Entonces el dígito verificador  0.
   * Si el resto es 1 Entonces se aplica la siguiente regla:
   * Si es hombre: el dígito verificador = 9 y "el tipo" pasa a ser 23
   * Si es mujer: el dígito verificador =4 y "el tipo" pasa a ser 23
   */

  let checkDigit = 11 - MOD11;

  if (MOD11 === 0) {
    checkDigit = 0;
    return [_globalType, _dni, checkDigit].join("");
  }

  if (MOD11 === 1 && gender === "m") {
    checkDigit = 9;
    _globalType = "23";
    return [_globalType, _dni, checkDigit].join("");
  }

  if (MOD11 === 1 && gender === "f") {
    checkDigit = 4;
    _globalType = "23";
    return [_globalType, _dni, checkDigit].join("");
  }

  return [_globalType, _dni, checkDigit].join("");
};

/**
 * Validate if a CUIT based on control number
 * @param {string} [cuit=''] numbers ( accepts CUIT with or without -)
 * @returns boolean
 */
const validateCuit = (cuit = "") => {
  cuit = String(cuit).replace("-", "");
  if (cuit.length !== 11) return false;
  const globalType = cuit.slice(0, 2);
  const dni = cuit.slice(2, 10);
  const checkDigit = cuit.slice(10, 11);
  const res = getCUITbyDNI(dni, "", globalType);

  if (checkDigit === res.slice(10, 11)) return true;
  return false;
};

module.exports = { getCUITbyDNI, format, validateCuit };
