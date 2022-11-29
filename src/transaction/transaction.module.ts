import { Module } from '@nestjs/common';
import { TransactionService } from './transaction.service';
import { TransactionController } from './transaction.controller';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { TransactionSchema } from './schema/transaction.models';

@Module({
  imports: [
    // MongooseModule.forRoot('mongodb://localhost/payment'),
    MongooseModule.forRoot(
      'mongodb+srv://user:root@payment-apps.bjtple4.mongodb.net/?retryWrites=true&w=majority',
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
