import cluster from 'cluster';

export const calculateInThreads = <T>(
  tasks: Array<{ calculateFn: () => T }>,
  whatDoWithCalculations: (results: Array<T>) => T
) => {
  const forks = 4;

  if (cluster.isPrimary) {
    console.log("I am primary");
  } else {
    console.log("I am worker");
  }
};