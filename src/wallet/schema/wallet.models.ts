import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type WalletDocument = Wallet & Document;

@Schema()
export class Wallet {
  @Prop()
  walletid: string;
  @Prop({ required: true })
  userid: string;
  @Prop({ required: true })
  balance: number;
}
export const WalletSchema = SchemaFactory.createForClass(Wallet);
