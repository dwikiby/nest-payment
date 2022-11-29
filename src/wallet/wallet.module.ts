import { Module } from '@nestjs/common';
import { WalletController } from './wallet.controller';
import { WalletService } from './wallet.service';
import { MongooseModule } from '@nestjs/mongoose/dist';
import { WalletSchema } from './schema/wallet.models';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Wallet', schema: WalletSchema }]),
    WalletModule,
  ],
  controllers: [WalletController],
  providers: [WalletService],
})
export class WalletModule {}
