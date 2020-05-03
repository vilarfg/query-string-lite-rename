# query-string-lite-rename

[![Build Status](https://travis-ci.com/vilarfg/query-string-lite-rename.svg?&branch=master)](https://travis-ci.com/vilarfg/query-string-lite-rename) [![Coverage Status](https://coveralls.io/repos/github/vilarfg/query-string-lite-rename/badge.svg?branch=master)](https://coveralls.io/github/vilarfg/query-string-lite-rename?branch=master) [![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://github.com/vilarfg/query-string-lite-rename/blob/master/LICENSE) [![Download Size](https://badgen.net/bundlephobia/minzip/query-string-lite-rename)](https://bundlephobia.com/result?p=query-string-lite-rename@0.2.1) [![npm version](https://badgen.net/npm/v/query-string-lite-rename)](https://www.npmjs.com/package/query-string-lite-rename)

## install

``` shell
npm install query-string-lite-rename
```

## usage

``` javascript
import renamer, { rename } from "query-string-lite-rename";

const dictionaryA = { a: "changesToA", y: "changesToY" };
const dictionaryB = { b: "changesToB", y: "changesToY" };

const query = { a: true, b: ["b"], z: ["z"] };

console.log(rename(dictionaryA, query));
//=> { changesToA: true, b: ["b"], z: ["z"] }

console.log(rename(dictionaryB, query));
//=> { a: true, changesToB: ["b"], z: ["z"] }
```

### currying

``` javascript
const renameUsingDictA = rename(dictionaryA);

console.log(renameUsingDictA(query));
//=> { changesToA: true, b: ["b"], z: ["z"] }
```

### rename and back to original

Use a dictionary to rename a query and its inverted version to rename it back. 

``` javascript 
const { to, from } = renamer(dictionaryA);

const renamedQuery = to(query);

console.log(renamedQuery);
//=> { changesToA: true, b: ["b"], z: ["z"] }

console.log(from(renamedQuery));
//=> { a: true, b: ["b"], z: ["z"] }
```

<!-- ## Rationale

You can read all about ***why*** I decided to write this package over [here](). -->

<!-- 

## TODO

* [ ] write description
* [ ] write the blog post about this
* [ ] write docs
* [ ] implement typedoc
* [x] Travis CI
* [x] Coveralls
* [x] write tests

 -->

## licence

[MIT](https://github.com/vilarfg/query-string-lite-rename/blob/master/LICENSE) Copyright (c) 2020 Fernando G. Vilar.












