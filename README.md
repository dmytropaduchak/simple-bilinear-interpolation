[![Build Status](https://travis-ci.org/dmytropaduchak/simple-bilinear-interpolation.svg?branch=master)](https://travis-ci.org/dmytropaduchak/simple-bilinear-interpolation)
[![Coverage Status](https://coveralls.io/repos/github/dmytropaduchak/simple-bilinear-interpolation/badge.svg?branch=master)](https://coveralls.io/github/dmytropaduchak/simple-bilinear-interpolation?branch=master)
[![NPM Version](https://badge.fury.io/js/simple-bilinear-interpolation.svg)](http://badge.fury.io/js/simple-bilinear-interpolation?type=dev)  

# Simple Bilinear Interpolation

A simple interpolation module that construct new data points within the range of a discrete set of known data points.
Bilinear Interpolation [EXAMPLE](https://dmytropaduchak.github.io/simple-interpolation-example#bilinear).

## Installation 

You can install this package using NPM:

```sh
npm i simple-bilinear-interpolation --save
```

## How use

Simple example JavaScript / TypeScript:

```JavaScript
import { bilinearInterpolation } from "simple-bilinear-interpolation";

const points = [{ x: 1, y: 1, z: 11 }, { x: 2, y: 1, z: 12 }, { x: 1, y: 2, z: 21 }, { x: 2, y: 2, z: 22 }];
const calculate = bilinearInterpolation(points);

calculate({ x: 1.5, y: 1.5 }); // z -> 16.5
calculate({ x: 1.5, z: 16.5 }); // y -> 1.5
calculate({ y: 1.5, z: 16.5 }); // x -> 1.5
```
## Unit testing

For run unit tests, use:

```
npm run test
```

All unit test report you can find at `report/` folder.

For run test at watch mode, use:

```
npm run test:dev
```


## Linting

For check eslint rules, use:

```
npm run lint
```

For auto fix all eslint bugs, use:

```
npm run lint:fix
```


## License
Except where noted otherwise, files are licensed under the MIT License.


## Information

- [Bilinear interpolation](https://en.wikipedia.org/wiki/Bilinear_interpolation).
