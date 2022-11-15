import cluster from "cluster";

export class BoostPerformance {
  private static instance: BoostPerformance;
  private forks = 4;
  private workers:  any[] = [];

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
    whatDoWithCalculations: (results: Array<number>) => T
  ) => {
    if (cluster.isPrimary) {
      this.setupWorkerProcesses();

      const results: number[] = []
      let workerIndex = 0
      for (let i = 0; i < tasks.length; i++) {
        this.workers[i].send(i)
        this.workers[i].on('message', (message: any) => {
          results.push(message)
          if (results.length === tasks.length) console.log('inside worker', whatDoWithCalculations(results))
        })
      }
    } else {
      process.on('message', (msgIndex: number) => {
        const {calculateFn} = tasks[msgIndex]
        const result = calculateFn()
      
        process.send(result)
      })
    }
  };
}
