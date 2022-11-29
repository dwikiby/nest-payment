import { Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Transaction, TransactionDocument } from './schema/transaction.models';
import * as crypto from 'crypto';
import { TransactionUpdateDTO } from './dto/update-transaction.dto';
import { SignatureDTO } from './dto/signature.dto';

@Injectable()
export class TransactionService {
  constructor(
    @InjectModel('transaction')
    private readonly transactionModel: Model<TransactionDocument>,
  ) {}
  // create transaction
  async createTransaction(transaction): Promise<Transaction> {
    const newTransaction = new this.transactionModel(transaction);
    return newTransaction.save();
  }
  // get data transaction
  async readTransaction() {
    return this.transactionModel.find({}).then((transaction) => {
      return transaction;
    });
  }
  // update transaction
  async updateTransaction(id, data): Promise<Transaction> {
    return this.transactionModel.findByIdAndUpdate(id, data, { new: true });
  }
  // delete transaction
  async deleteTransaction(id) {
    return this.transactionModel.findByIdAndRemove(id);
  }

  // signature encrypt
  async hashSignature(fullstring: string): Promise<string> {
    let hash = crypto.createHash('sha256').update(fullstring).digest('hex');
    return hash;
  }

  async signature(
    signatureDto: SignatureDTO,
  ): Promise<{ SignatureResult: string } | null> {
    const { fullstring } = signatureDto;

    const hashSignature = await this.hashSignature(fullstring);
    return { SignatureResult: hashSignature };
  }
}
