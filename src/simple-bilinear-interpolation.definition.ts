/** Bilinear Interpolation Point Interface */
export interface BilinearInterpolationPoint {
  x: number;
  y: number;
  z: number;
}

/** Bilinear Interpolation execute function Type */
export type BilinearInterpolationFunction = (params: Partial<BilinearInterpolationPoint>) => number;
