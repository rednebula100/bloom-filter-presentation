export type ProbabilityPoint = {
  k: number;
  probability: number;
};

export type SimulationRun = {
  seed: number;
  k: number;
  falsePositives: number;
  queries: number;
  probability: number;
};

export type SimulationResult = {
  averages: ProbabilityPoint[];
  runs: SimulationRun[];
};

export const SIMULATION_SEEDS = [104_729, 130_363, 155_921, 196_613, 262_147] as const;

export const experimentConfig = {
  m: 1000,
  n: 200,
  kMin: 1,
  kMax: 10,
  queriesPerCondition: 10_000,
  repetitions: SIMULATION_SEEDS.length,
} as const;

function theoreticalProbability(k: number) {
  const { m, n } = experimentConfig;
  return (1 - Math.exp((-k * n) / m)) ** k * 100;
}

export const theoryProbabilities: ProbabilityPoint[] = Array.from(
  { length: experimentConfig.kMax - experimentConfig.kMin + 1 },
  (_, index) => {
    const k = experimentConfig.kMin + index;
    return { k, probability: theoreticalProbability(k) };
  },
);

export function createSeededRandom(seed: number) {
  let state = seed >>> 0;

  return () => {
    state ^= state << 13;
    state ^= state >>> 17;
    state ^= state << 5;
    return state >>> 0;
  };
}

function stableHash(value: string, seed: number) {
  let hash = seed >>> 0;

  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 0x01000193);
  }

  hash ^= hash >>> 16;
  hash = Math.imul(hash, 0x85ebca6b);
  hash ^= hash >>> 13;
  hash = Math.imul(hash, 0xc2b2ae35);
  hash ^= hash >>> 16;
  return hash >>> 0;
}

export class BloomFilter {
  private readonly bits: Uint8Array;
  private readonly size: number;
  private readonly hashCount: number;

  constructor(size: number, hashCount: number) {
    this.size = size;
    this.hashCount = hashCount;
    this.bits = new Uint8Array(size);
  }

  private positions(value: string) {
    const h1 = stableHash(value, 0x811c9dc5) % this.size;
    const h2 = 1 + (stableHash(value, 0x9e3779b9) % (this.size - 1));

    return Array.from(
      { length: this.hashCount },
      (_, index) => (h1 + index * h2) % this.size,
    );
  }

  add(value: string) {
    for (const position of this.positions(value)) this.bits[position] = 1;
  }

  has(value: string) {
    return this.positions(value).every((position) => this.bits[position] === 1);
  }
}

function generateUniqueValues(
  namespace: "insert" | "query",
  count: number,
  randomUint32: () => number,
) {
  const values = new Set<string>();

  while (values.size < count) {
    const randomPart = randomUint32().toString(16).padStart(8, "0");
    values.add(`${namespace}:${randomPart}`);
  }

  return [...values];
}

export function buildSimulationDataset(seed: number) {
  const randomUint32 = createSeededRandom(seed);
  const inserted = generateUniqueValues("insert", experimentConfig.n, randomUint32);
  const queries = generateUniqueValues(
    "query",
    experimentConfig.queriesPerCondition,
    randomUint32,
  );

  return { inserted, queries };
}

export function runDeterministicSimulation(
  seeds: readonly number[] = SIMULATION_SEEDS,
): SimulationResult {
  const datasets = seeds.map((seed) => ({ seed, ...buildSimulationDataset(seed) }));
  const runs: SimulationRun[] = [];
  const averages: ProbabilityPoint[] = [];

  for (let k = experimentConfig.kMin; k <= experimentConfig.kMax; k += 1) {
    let probabilitySum = 0;

    for (const dataset of datasets) {
      const filter = new BloomFilter(experimentConfig.m, k);
      for (const value of dataset.inserted) filter.add(value);

      let falsePositives = 0;
      for (const value of dataset.queries) {
        if (filter.has(value)) falsePositives += 1;
      }

      const probability = (falsePositives / dataset.queries.length) * 100;
      probabilitySum += probability;
      runs.push({
        seed: dataset.seed,
        k,
        falsePositives,
        queries: dataset.queries.length,
        probability,
      });
    }

    averages.push({ k, probability: probabilitySum / datasets.length });
  }

  return { averages, runs };
}

export const simulationResult = runDeterministicSimulation();
export const simulationAverages = simulationResult.averages;

export function optimalHashCount(m: number, n: number) {
  return (m / n) * Math.log(2);
}
