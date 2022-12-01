import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { WalletUpdateDTO } from './dto/update-wallet.dto';
import { Wallet, WalletDocument } from './schema/wallet.models';
import { WalletDetail } from './wallet.interface';
import { WalletService } from './wallet.service';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuards } from 'src/auth/guard/jwt.guard';

@Controller('wallet')
export class WalletController {
  constructor(private readonly walletService: WalletService) {}

  // create wallet
  @UseGuards(JwtGuards)
  @Post()
  async createWallet(@Body() walletDto: WalletUpdateDTO) {
    return this.walletService.createWallet(walletDto);
  }

  //get data by wallet id
  @UseGuards(JwtGuards)
  @Get(':id')
  getWallet(@Param('id') id: string): Promise<WalletDetail | null> {
    return this.walletService.findById(id);
  }

  // get all wallet data
  @UseGuards(JwtGuards)
  @Get()
  readWallet() {
    return this.walletService.readWallet();
  }
  // update wallet
  @UseGuards(JwtGuards)
  @Patch(':id')
  async updateWallet(
    @Param('id') id: string,
    @Body() updateData: WalletUpdateDTO,
  ): Promise<Wallet> {
    return this.walletService.updateWallet(id, updateData);
  }

  // delete wallet
  @UseGuards(JwtGuards)
  @Delete(':id')
  async deleteWallet(@Param('id') id: string) {
    return this.walletService.deleteWallet(id);
  }
}
