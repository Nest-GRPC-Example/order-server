import { Controller, Inject, Logger } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { OrderService } from './order.service';
import { ORDER_SERVICE_NAME, CreateOrderResponse } from './proto/order.pb';
import { CreateOrderRequestDto } from './order.dto';

@Controller('order')
export class OrderController {
  @Inject(OrderService)
  private readonly service: OrderService;
  private logger = new Logger('MSA-ORDER');

  @GrpcMethod(ORDER_SERVICE_NAME, 'CreateOrder')
  private async createOrder(
    data: CreateOrderRequestDto,
  ): Promise<CreateOrderResponse> {
    this.logger.log(JSON.stringify(data));
    return this.service.createOrder(data);
  }
}
