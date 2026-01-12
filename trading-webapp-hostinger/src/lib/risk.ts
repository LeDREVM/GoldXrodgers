// Risk management utilities
/**
 * Helpers R-multiple.
 * resultR: +2.0 = gain 2R, -1.0 = stop, etc.
 */
export function computeWinrate(resultRs: number[]): number {
    if (!resultRs.length) return 0;
    const wins = resultRs.filter((r) => r > 0).length;
    return wins / resultRs.length;
  }
  
  export function computeAvgR(resultRs: number[]): number {
    if (!resultRs.length) return 0;
    const sum = resultRs.reduce((a, b) => a + b, 0);
    return sum / resultRs.length;
  }
  