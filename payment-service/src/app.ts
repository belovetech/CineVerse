import express, { Express } from 'express';
import { PaymentService, config, database } from './payment/index';
import { logger } from '@cineverse/libs';

export default class App {
  private app: Express;
  private port: string | number;

  constructor() {
    this.app = express();
    this.port = config.port || 5000;
    this.initializeDatabase();
    this.makePayment();
  }

  public listen(): void {
    this.app.listen(this.port, () => {
      logger.info('==================================');
      logger.info(`App listening on localhost:${this.port} 🚀`);
      logger.info('==================================');
    });
  }

  private async initializeDatabase(): Promise<void> {
    await database.connect();
  }

  private makePayment() {
    setTimeout(() => {
      const paymentService = new PaymentService();
      paymentService.createPayment();
    }, 1000);
  }
}
