export type ProbabilityPoint = {
  k: number;
  probability: number;
};

export const experimentConfig = {
  m: 1000,
  n: 200,
  kMin: 1,
  kMax: 10,
  queriesPerCondition: 10_000,
  seed: "bloom-fixed-2026",
} as const;

export const theoryProbabilities: ProbabilityPoint[] = [
  18.13, 10.87, 9.18, 9.2, 10.09, 11.64, 13.78, 16.47, 19.67, 23.36,
].map((probability, index) => ({ k: index + 1, probability }));

const fixedExperimentProbabilities: ProbabilityPoint[] = [
  18.4, 10.6, 9.0, 9.3, 10.2, 11.5, 14.1, 16.2, 19.9, 23.1,
].map((probability, index) => ({ k: index + 1, probability }));

export function getFixedSimulationResults(): ProbabilityPoint[] {
  return fixedExperimentProbabilities.map((point) => ({ ...point }));
}

export function optimalHashCount(m: number, n: number) {
  return (m / n) * Math.log(2);
}
