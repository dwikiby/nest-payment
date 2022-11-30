import { Schema, Prop, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type TransactionDocument = Transaction & Document;

@Schema()
export class Transaction {
  @Prop()
  merchantkey: string;

  @Prop()
  merchantcode: string;

  @Prop()
  transid: string;

  @Prop()
  amount: string;

  @Prop({ default: 'MYR' })
  currency: string;

  @Prop({ default: Date() })
  date_added: Date;
}

export const TransactionSchema = SchemaFactory.createForClass(Transaction);
