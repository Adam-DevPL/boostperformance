var cluster = require('cluster');


const calculateInThreads = <T>(
  tasks: Array<{ calculateFn: () => T }>,
  whatDoWithCalculations: (results: Array<T>) => T
) => {};