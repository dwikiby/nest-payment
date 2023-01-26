import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { TransactionSchema } from './schema/transaction.models';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/payment')
    //mongodb+srv://user:root@payment-apps.bjtple4.mongodb.net/?retryWrites=true&w=majority,
    MongooseModule.forRoot(
      'mongodb://mongo:v4qkOemQ3KNJ9qZIb59U@containers-us-west-75.railway.app:7861',
    ),
    MongooseModule.forFeature([
      {
        name: 'transaction',
        schema: TransactionSchema,
      },
    ]),
    TransactionModule,
  ],
  providers: [TransactionService],
  controllers: [TransactionController],
})
export class TransactionModule {}
