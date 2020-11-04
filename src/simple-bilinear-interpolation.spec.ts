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
      const params = { x: -1.5, y: 1 };
      const calculator = bilinearInterpolation(points);
      calculator(params);
    }).toThrowError("Can't calculate bilinear interpolation for x: '-1.5'");
  });

  it('should throw extrapolation error if incorrect value of `x` variable, calculation by `x`, `z`', () => {
    expect(() => {
      const params = { x: -1.5, z: 16.5 };
      const calculator = bilinearInterpolation(points);
      calculator(params);
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  it('should throw extrapolation error if incorrect value of `y` variable, calculation by `y`, `x`', () => {
    expect(() => {
      const params = { x: 1, y: -1.5 };
      const calculator = bilinearInterpolation(points);
      calculator(params);
    }).toThrowError("Can't calculate bilinear interpolation for y: '-1.5'");
  });

  it('should throw extrapolation error if incorrect value of `y` variable, calculation by `y`, `z`', () => {
    expect(() => {
      const params = { y: -1.5, z: 16.5 };
      const calculator = bilinearInterpolation(points);
      calculator(params);
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  it('should throw extrapolation error if incorrect matrix data', () => {
    expect(() => {
      const params = { x: 1.5, y: 1.5 };
      const calculator = bilinearInterpolation([{ x: 1, y: 1, z: 11 }]);
      calculator(params);
    }).toThrowError("Can't calculate bilinear interpolation, please provide more points");
  });

  it('should throw extrapolation error if if incorrect value of `x` or `y`', () => {
    expect(() => {
      const params = { a: 1, z: 11 } as any;
      const calculator = bilinearInterpolation(points);
      calculator(params);
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  it('should throw extrapolation error if if incorrect value of `x` or `y` and `z`', () => {
    expect(() => {
      const params = { a: 1, b: 2 } as any;
      const calculator = bilinearInterpolation(points);
      calculator(params);
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  it('should throw extrapolation error if incorrect matrix value', () => {
    expect(() => {
      const params = { x: 1.5, z: 16.5 };
      const calculator = bilinearInterpolation([{ a: 1 }, { b: 2 }, { c: 3 }, { d: 4 }] as any);
      calculator(params);
    }).toThrowError("Can't calculate bilinear interpolation");
  });

  describe('zero calculation', () => {
    it('should do right extrapolation `x` variable', () => {
      const params = { x: 0, y: 0 };
      const calculator = bilinearInterpolation([
        { x: -1, y: -1, z: -1 },
        { x: 1, y: -1, z: 1 },
        { x: -1, y: 1, z: 1 },
        { x: 1, y: 1, z: -1 },
      ]);
      expect(calculator(params)).toEqual(0);
    });

    it('should do right extrapolation `x` variable by parameters equal matrix data', () => {
      const params = { x: 0, y: 0 };
      const calculator = bilinearInterpolation([
        { x: 1, y: 1, z: 3 },
        { x: 0, y: 1, z: 2 },
        { x: 1, y: 0, z: 1 },
        { x: 0, y: 0, z: 0 },
      ]);
      expect(calculator(params)).toEqual(0);
    });
  });
});
