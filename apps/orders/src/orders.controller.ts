import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateOrderRequest } from './dto/create-order.request';
import { UpdateOrderRequest } from './dto/update-order.request';
import { OrdersService } from './orders.service';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get()
  async getOrders() {
    return this.ordersService.getOrders();
  }

  @Post()
  async createOrder(@Body() request: CreateOrderRequest) {
    return this.ordersService.createOrder(request);
  }

  @Get(':_id')
  async getOrder(@Param('_id') id: string) {
    return this.ordersService.getOrderId(id);
  }

  @Patch(':_id')
  async getOrderAndUpdate(
    @Param('_id') id: string,
    @Body() request: UpdateOrderRequest,
  ) {
    return this.ordersService.updateOrder(id, request);
  }
}
