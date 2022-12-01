import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { WalletDocument, Wallet } from './schema/wallet.models';
import { WalletDetail } from './wallet.interface';

@Injectable()
export class WalletService {
  constructor(
    @InjectModel('Wallet') private readonly walletModel: Model<WalletDocument>,
  ) {}

  async readWallet() {
    return this.walletModel.find({}).then((wallet) => {
      return wallet;
    });
  }

  // wallet detail
  _getWalletDetail(wallet: WalletDocument): WalletDetail {
    return {
      id: wallet._id,
      userid: wallet.userid,
      balance: wallet.balance,
    };
  }
  // find wallet by user id
  async findById(id: string): Promise<WalletDetail | null> {
    const wallet = await this.walletModel.findById(id).exec();
    if (!wallet) return null;
    return this._getWalletDetail(wallet);
  }
  // create wallet
  async createWallet(wallet): Promise<Wallet> {
    const newWallet = new this.walletModel(wallet);
    return newWallet.save();
  }
  // update wallet
  async updateWallet(id, data): Promise<Wallet> {
    return this.walletModel.findByIdAndUpdate(id, data, { new: true });
  }
  // delete wallet
  async deleteWallet(id) {
    return this.walletModel.findByIdAndRemove(id);
  }
}
