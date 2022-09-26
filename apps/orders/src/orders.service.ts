import { Injectable } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { UpdateOrderRequest } from './dto/update-order.request';
import { OrdersRepository } from './repository/orders.repository';

@Injectable()
export class OrdersService {
  constructor(private readonly ordersRepository: OrdersRepository) {}

  async createOrder(request: CreateOrderRequest) {
    return await this.ordersRepository.create(request);
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
