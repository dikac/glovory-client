import { Controller, Get, Inject, Param, Query } from '@nestjs/common';
import { AppService } from './app.service';
import { ClientGrpc } from '@nestjs/microservices';
import { lastValueFrom, Observable } from 'rxjs';
import { AddressModel } from './adress';
import { LoginRequest } from './auth';
import { Metadata } from '@grpc/grpc-js';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService,
    @Inject('glovoryService') private client: ClientGrpc,
  ) {}

  @Get('address/list')
  getHello(@Query('user_id') userId): Promise<{ addresses: AddressModel[] }> {
    const login = (this.client.getService('Auth') as any).login(<LoginRequest>{
      username: 'Hello',
      password: 'Hello',
    }) as Observable<any>;

    return lastValueFrom(login).then((data) => {
      const metadata = new Metadata();
      metadata.add('authorization', 'bearer GlovoryBearerAuth');

      const list = (this.client.getService('Address') as any).list(
        {
          user_id: userId,
        },
        metadata,
      ) as Observable<any>;

      return lastValueFrom(list);
    });
  }
}
