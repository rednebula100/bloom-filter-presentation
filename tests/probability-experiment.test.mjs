import assert from "node:assert/strict";
import test from "node:test";

import {
  BloomFilter,
  SIMULATION_SEEDS,
  buildSimulationDataset,
  experimentConfig,
  runDeterministicSimulation,
  simulationAverages,
} from "../src/data/probabilityExperiment.ts";

test("simulation datasets are deterministic, unique, and disjoint", () => {
  assert.equal(SIMULATION_SEEDS.length, 5);

  for (const seed of SIMULATION_SEEDS) {
    const first = buildSimulationDataset(seed);
    const second = buildSimulationDataset(seed);
    assert.deepEqual(first, second);
    assert.equal(first.inserted.length, experimentConfig.n);
    assert.equal(first.queries.length, experimentConfig.queriesPerCondition);

    const inserted = new Set(first.inserted);
    assert.equal(inserted.size, first.inserted.length);
    assert.equal(new Set(first.queries).size, first.queries.length);
    assert.equal(first.queries.some((value) => inserted.has(value)), false);
  }
});

test("BloomFilter uses its bit array without false negatives for inserted data", () => {
  const dataset = buildSimulationDataset(SIMULATION_SEEDS[0]);
  const filter = new BloomFilter(experimentConfig.m, 4);
  for (const value of dataset.inserted) filter.add(value);
  assert.equal(dataset.inserted.every((value) => filter.has(value)), true);
});

test("five-seed simulation is repeatable and supplies all ten graph points", () => {
  const first = runDeterministicSimulation();
  const second = runDeterministicSimulation();

  assert.deepEqual(first, second);
  assert.deepEqual(first.averages, simulationAverages);
  assert.equal(first.averages.length, 10);
  assert.equal(first.runs.length, 50);
  assert.deepEqual(first.averages.map((point) => point.k), [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  assert.equal(first.runs.every((run) => run.queries === 10_000), true);
});
