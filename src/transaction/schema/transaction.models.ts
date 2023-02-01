import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop({ required: true })
  merchantkey: string;

  @Prop({ required: true })
  merchantcode: string;

  @Prop({ required: true })
  transid: string;

  @Prop({ required: true })
  amount: string;

  @Prop({ default: 'MYR' })
  currency: string;

  @Prop({ default: Date() })
  date_added: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
