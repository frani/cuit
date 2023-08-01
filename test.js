"use strict";

require("mocha");
const assert = require("assert");
const cuit = require("./");

describe("getCUITbyDNI tests", function () {
  it("should same values:", function () {
    assert(cuit.getCUITbyDNI("20300400") === cuit.getCUITbyDNI("20300400"));
    assert(cuit.getCUITbyDNI("20300400") === "20203004002");
    assert(cuit.getCUITbyDNI("20300400", "F") === "27203004007");
  });
  it("should exceptional CUIT values:", function () {
    assert(cuit.getCUITbyDNI("20300404", "f") === "23203004044");
  });
  it("should pass right values:", function () {
    assert(cuit.getCUITbyDNI("20300404", "Masculino") === "20203004045");
    assert(cuit.getCUITbyDNI("20300404", "m") === "20203004045");
    assert(cuit.getCUITbyDNI("20300404", "") === "30203004040");
    assert(cuit.getCUITbyDNI("20300404", "Indeterminado") === "30203004040");
    assert(cuit.getCUITbyDNI("20300404", "F") === "23203004044");
    assert(cuit.getCUITbyDNI("20300404", "femenino") === "23203004044");
  });
});

describe("validateCuit tests", function () {
  it("should same values:", function () {
    assert(cuit.validateCuit("20203004002"));
    assert(cuit.validateCuit("27203004007"));
    assert(cuit.validateCuit("23203004044"));
    assert(cuit.validateCuit("20203004045"));
    assert(cuit.validateCuit("30203004040"));
    assert(cuit.validateCuit("30203004040"));
    assert(cuit.validateCuit("23203004044"));
    assert(cuit.validateCuit("23203004044"));
  });
});

describe("format tests", function () {
  it("should same values:", function () {
    assert(cuit.format("20203004002") === "20-20300400-2");
    assert(cuit.format("20-20300400-2", "") === "20203004002");
    assert(cuit.format("27203004007", ".") === "27.20300400.7");
    assert(cuit.format("27-20300400-7", ".") === "27.20300400.7");
  });
});
