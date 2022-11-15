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

    cluster.on("online", function (worker) {
      console.log("Worker " + worker.process.pid + " is listening");
    });

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
      this.workers.push(cluster.fork());
      this.workers[this.workers.length - 1].on(
        "message",
        function (message: any) {
          console.log(message);
        }
      );
    });
  };

  public calculateInThreads = <T>(
    tasks: Array<{ calculateFn: () => T }>,
    whatDoWithCalculations: (results: Array<T>) => T
  ) => {
    if (cluster.isPrimary) {
      this.setupWorkerProcesses();
    } else {
      tasks.forEach((task) => {
        const result = task.calculateFn();
        console.log(process.pid + "  " + result);
      });
    }

  };
}
