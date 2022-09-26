import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { lastValueFrom } from 'rxjs';
import { INVENTORY_SERVICE } from './constants/services';
import { CreateOrderRequest } from './dto/create-order.request';
import { UpdateOrderRequest } from './dto/update-order.request';
import { OrdersRepository } from './repository/orders.repository';

@Injectable()
export class OrdersService {
  constructor(
    private readonly ordersRepository: OrdersRepository,
    @Inject(INVENTORY_SERVICE) private inventoryClient: ClientProxy,
  ) {}

  async createOrder(request: CreateOrderRequest) {
    const session = await this.ordersRepository.startTransaction();
    try {
      const order = await this.ordersRepository.create(request);
      await lastValueFrom(
        this.inventoryClient.emit('order_created', {
          order,
        }),
      );

      await session.commitTransaction();
      return order;
    } catch (err) {
      await session.abortTransaction();
      throw err;
    }
  }

  async getOrders() {
    return await this.ordersRepository.find({});
  }

  async getOrderId(id: string) {
    return await this.ordersRepository.findOne({ _id: id });
  }

  async updateOrder(id: string, requestUpdate: UpdateOrderRequest) {
    const updateOrder = await this.ordersRepository.findOneAndUpdate(
      { _id: id },
      UpdateOrderRequest,
    );

    return updateOrder;
  }
}
