import cluster from "cluster";

export class BoostPerformance {
  private static instance: BoostPerformance;
  private forks = 4;
  private workers: any = [];

  private constructor() {}

  public static getInstance(): BoostPerformance {
    if (!BoostPerformance.instance) {
      BoostPerformance.instance = new BoostPerformance();
    }
    return BoostPerformance.instance;
  }

  private setupWorkerProcesses = () => {
    console.log("Master cluster setting up " + this.forks + " workers");

    for (let i = 0; i < this.forks; i++) {
      this.workers.push(cluster.fork());

      this.workers[i].on("message", function (message: any) {
        console.log(message);
      });
    }

    // process is clustered on a core and process id is assigned
    cluster.on("online", function (worker) {
      console.log("Worker " + worker.process.pid + " is listening");
    });

    // if any of the worker process dies then start a new one by simply forking another one
    cluster.on("exit", function (worker, code, signal) {
      console.log(
        "Worker " +
          worker.process.pid +
          " died with code: " +
          code +
          ", and signal: " +
          signal
      );
      console.log("Starting a new worker");
      cluster.fork();
      workers.push(cluster.fork());
      // to receive messages from worker process
      workers[workers.length - 1].on("message", function (message) {
        console.log(message);
      });
    });
  };
}

export const calculateInThreads = <T>(
  tasks: Array<{ calculateFn: () => T }>,
  whatDoWithCalculations: (results: Array<T>) => T
) => {
  const forks = 4;

  if (cluster.isPrimary) {
    console.log("I am primary");
    for (let i = 0; i < forks; i++) {
      cluster.fork();
    }
  } else {
    console.log(process.pid + " worker");

    tasks.forEach((task) => {
      const res = task.calculateFn();
      console.log(process.pid + "  " + res);
    });
    process.exit(0);
  }
};
