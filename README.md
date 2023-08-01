# Time based One Time Password

Argentina CUIT utilities based [on a wikipedia post](https://es.wikipedia.org/wiki/Clave_%C3%9Anica_de_Identificaci%C3%B3n_Tributaria)

This is a no-depenencies package

# Install

if you are using Yarn:

```sh
yarn add @frani/cuit
```

if you are using NPM:

```sh
npm i @frani/cuit
```

# Usage

how get a CUIT based on DNI:

```js
const cuit = require("@frani/cuit");

const cuitNumber = cuit.getCUITbyDNI("20300400");
console.log(cuitNumber); // 20203004002
```

## About Genders

be default it take it is from a Masculine gender person, you can modify that using:

```js
const cuit = require("@frani/cuit");

const cuitNumber = cuit.getCUITbyDNI("20300400", "F");
console.log(cuitNumber); // 27203004007
```

## This package also includes exceptions

if you read the wiki post, you there is some exception when generate some CUIT, here an example:

```js
const cuit = require("@frani/cuit");

const cuitNumber = cuit.getCUITbyDNI("20300404", "F");
console.log(cuitNumber); // 23203004044
```

instead of start with 27 (as normal for Femenine), it starts with 23

## Check CUIT validation

```js
const cuit = require("@frani/cuit");

const isValid = cuit.validateCuit("23203004044");
console.log(isValid); // true
```

## Format CUIT

```js
const cuit = require("@frani/cuit");

const formatted = cuit.format("23203004044");
console.log(formatted); // "23-20300404-4"

const formatted = cuit.format("23203004044", ".");
console.log(formatted); // "23.20300404.4"

const formatted = cuit.format("23-20300404-4", "");
console.log(formatted); // "23203004044"
```
