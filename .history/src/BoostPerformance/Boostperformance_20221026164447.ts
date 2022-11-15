import cluster from 'cluster';

const calculateInThreads = <T>(
  tasks: Array<{ calculateFn: () => T }>,
  whatDoWithCalculations: (results: Array<T>) => T
) => {
  const forks = 4;
};