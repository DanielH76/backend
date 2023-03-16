import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/service/user.module';

@Module({
  imports: [UserModule, 
    MongooseModule.forRoot('mongodb://localhost:27017/nestjs')],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
