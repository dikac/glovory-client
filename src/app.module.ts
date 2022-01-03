import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ClientsModule } from '@nestjs/microservices';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'glovoryService',
        transport: Transport.GRPC,
        options: {
          package: 'glovory',
          url: '0.0.0.0:5051',
          protoPath: join(__dirname, '..', 'protos/auth.proto'),
        },
      },
    ]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
