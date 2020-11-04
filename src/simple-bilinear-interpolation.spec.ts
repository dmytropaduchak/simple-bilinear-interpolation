import { bilinearInterpolation } from './simple-bilinear-interpolation';
import { BilinearInterpolationPoint } from './simple-bilinear-interpolation.definition';

describe('src/simple-bilinear-interpolation.ts', () => {
  const points: BilinearInterpolationPoint[] = [
    { x: 1, y: 1, z: 11 },
    { x: 2, y: 1, z: 12 },
    { x: 1, y: 2, z: 21 },
    { x: 2, y: 2, z: 22 },
  ];
  it('should do extrapolation `z` variable by parameter `x` equal matrix data', () => {
    const params = { x: 2, y: 2 };
    const calculator = bilinearInterpolation(points);
    expect(calculator(params)).toEqual(22);
  });

  it('should do extrapolation `z` variable by parameter `y` equal matrix data', () => {
    const params = { x: 1.5, y: 2 };
    const calculator = bilinearInterpolation(points);
    expect(calculator(params)).toEqual(21.5);
  });

  it('should do extrapolation `z` variable by parameters between matrix data', () => {
    const params = { x: 1.5, y: 1.5 };
    const calculator = bilinearInterpolation(points);
    expect(calculator(params)).toEqual(16.5);
  });

  it('should do extrapolation `x` variable by parameters equal matrix data', () => {
    const params = { y: 2, z: 22 };
    const calculator = bilinearInterpolation(points);
    expect(calculator(params)).toEqual(2);
  });

  it('should do extrapolation `x` variable by parameters between matrix data', () => {
    const params = { y: 1.5, z: 16.5 };
    const calculator = bilinearInterpolation(points);
    expect(calculator(params)).toEqual(1.5);
  });

  it('should do extrapolation `y` variable by parameters equal matrix data', () => {
    const params = { x: 2, z: 22 };
    const calculator = bilinearInterpolation(points);
    expect(calculator(params)).toEqual(2);
  });

  it('should do extrapolation `y` variable by parameters between matrix data', () => {
    const params = { x: 1.5, z: 16.5 };
    const calculator = bilinearInterpolation(points);
    expect(calculator(params)).toEqual(1.5);
  });

  it('should throw extrapolation error if incorrect value of `x` variable, calculation by `x`, `y`', () => {
    expect(() => {
      bilinearInterpolation(points)({ x: -1.5, y: 1 });
    }).toThrowError("Can't calculate bilinear interpolation for x: '-1.5'");
  });

  it('should throw extrapolation error if incorrect value of `x` variable, calculation by `x`, `z`', () => {
    expect(() => {
      bilinearInterpolation(points)({ x: -1.5, z: 16.5 });
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  it('should throw extrapolation error if incorrect value of `y` variable, calculation by `y`, `x`', () => {
    expect(() => {
      bilinearInterpolation(points)({ x: 1, y: -1.5 });
    }).toThrowError("Can't calculate bilinear interpolation for y: '-1.5'");
  });

  it('should throw extrapolation error if incorrect value of `y` variable, calculation by `y`, `z`', () => {
    expect(() => {
      bilinearInterpolation(points)({ y: -1.5, z: 16.5 });
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  it('should throw extrapolation error if incorrect matrix data', () => {
    expect(() => {
      bilinearInterpolation([{ x: 1, y: 1, z: 11 }])({ x: 1.5, y: 1.5 });
    }).toThrowError("Can't calculate bilinear interpolation, please provide more points");
  });

  it('should throw extrapolation error if if incorrect value of `x` or `y`', () => {
    expect(() => {
      bilinearInterpolation(points)({ a: 1, z: 11 } as any);
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  it('should throw extrapolation error if if incorrect value of `x` or `y` and `z`', () => {
    expect(() => {
      bilinearInterpolation(points)({ a: 1, b: 2 } as any);
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  it('should throw extrapolation error if incorrect matrix value', () => {
    expect(() => {
      bilinearInterpolation([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }] as any)({ x: 1.5, z: 16.5 });
    }).toThrowError("Can't calculate bilinear interpolation");
  });
});
