import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class InventoryService {
  private readonly logger = new Logger(InventoryService.name);
  getHello(): string {
    return 'Hello World!';
  }

  async inventory(data: any) {
    this.logger.log('Inventory...', data);
  }
}
