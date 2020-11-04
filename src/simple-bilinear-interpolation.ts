import { linearInterpolation, LinearInterpolationPoint } from '@dmytropaduchak/simple-linear-interpolation';

import { BilinearInterpolationFunction, BilinearInterpolationPoint } from './simple-bilinear-interpolation.definition';

const MATRIX_LENGTH = 4;

const isZero = (num: number): boolean => num === 0;

/**
 * Implementation of bilinear interpolation
 * @param {array} points interpolation matrix data
 * @return {function} interpolation execute function
 */
export function bilinearInterpolation(points: BilinearInterpolationPoint[]): BilinearInterpolationFunction {
  if (points.length <= MATRIX_LENGTH - 1) {
    throw new Error("Can't calculate bilinear interpolation, please provide more points");
  }
  return (params: Partial<BilinearInterpolationPoint>): number => {
    if ('x' in params && 'y' in params) {
      const x1 = points.sort((a, b) => b.x - a.x).find((i) => i.x <= params.x);
      const x2 = points.sort((a, b) => a.x - b.x).find((i) => i.x >= params.x);

      if (!x1 || !x2) {
        throw new Error(`Can't calculate bilinear interpolation for x: '${params.x}'`);
      }

      const y1 = points.sort((a, b) => b.y - a.y).find((i) => i.y <= params.y);
      const y2 = points.sort((a, b) => a.y - b.y).find((i) => i.y >= params.y);

      if (!y1 || !y2) {
        throw new Error(`Can't calculate bilinear interpolation for y: '${params.y}'`);
      }

      if (x1.x === x2.x) {
        const data = points.filter((i) => i.x === x1.x).map(({ y: x, z: y }): LinearInterpolationPoint => ({ x, y }));
        return linearInterpolation(data)({ x: params.y });
      }

      if (y1.y === y2.y) {
        const data = points.filter((i) => i.y === y1.y).map(({ x, z: y }): LinearInterpolationPoint => ({ x, y }));
        return linearInterpolation(data)({ x: params.x });
      }

      const z11 = points.find((i) => i.x === x1.x && i.y === y1.y);
      const z12 = points.find((i) => i.x === x2.x && i.y === y1.y);
      const z21 = points.find((i) => i.x === x1.x && i.y === y2.y);
      const z22 = points.find((i) => i.x === x2.x && i.y === y2.y);

      if (!z11 || !z12 || !z21 || !z22) {
        throw new Error(`Can't calculate bilinear interpolation for x: '${params.x}' and y: '${params.y}'`);
      }

      const p1 = (((x2.x - params.x) * (y2.y - params.y)) / ((x2.x - x1.x) * (y2.y - y1.y))) * z11.z;
      const p2 = (((params.x - x1.x) * (y2.y - params.y)) / ((x2.x - x1.x) * (y2.y - y1.y))) * z12.z;
      const p3 = (((x2.x - params.x) * (params.y - y1.y)) / ((x2.x - x1.x) * (y2.y - y1.y))) * z21.z;
      const p4 = (((params.x - x1.x) * (params.y - y1.y)) / ((x2.x - x1.x) * (y2.y - y1.y))) * z22.z;

      return p1 + p2 + p3 + p4;
    }

    if ('z' in params) {
      let coordinate: number;
      let coordinates: number[][];

      if ('x' in params) {
        coordinate = params.x;
        coordinates = points.sort((a, b) => b.x - a.x).map((i) => [i.x, i.y, i.z]);
      }
      if ('y' in params) {
        coordinate = params.y;
        coordinates = points.sort((a, b) => a.y - b.y).map((i) => [i.y, i.x, i.z]);
      }

      if (!coordinate && !isZero(coordinate)) {
        throw new Error("Can't calculate bilinear interpolation");
      }

      const min = coordinates.find((i) => i[0] <= coordinate);
      const max = coordinates.find((i) => i[0] >= coordinate);

      if (!min || !max) {
        throw new Error("Can't calculate bilinear interpolation");
      }

      const minPoints = coordinates.filter((i) => i[0] === min[0]);
      const maxPoints = coordinates.filter((i) => i[0] === max[0]);

      const data = maxPoints.map((curr, i) => ({
        x: (((coordinate - curr[0]) * (minPoints[i][2] - curr[2])) / (minPoints[i][0] - curr[0]) || 0) + curr[2],
        y: curr[1],
      }));
      return linearInterpolation(data)({ x: params.z });
    }

    throw new Error("Can't calculate bilinear interpolation");
  };
}
