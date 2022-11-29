import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { SignatureDTO } from './dto/signature.dto';
import { TransactionUpdateDTO } from './dto/update-transaction.dto';
import { Transaction } from './schema/transaction.models';
import { TransactionService } from './transaction.service';
import { UseGuards } from '@nestjs/common/decorators';
import { JwtGuards } from 'src/auth/guard/jwt.guard';

@Controller('transaction')
export class TransactionController {
  constructor(private readonly transactionService: TransactionService) {}

  // create data transaction
  @UseGuards(JwtGuards)
  @Post()
  async createTransaction(@Body() transactionDto: Transaction) {
    return this.transactionService.createTransaction(transactionDto);
  }
  // get data
  @UseGuards(JwtGuards)
  @Get()
  readTransaction() {
    return this.transactionService.readTransaction();
  }
  // update data
  @UseGuards(JwtGuards)
  @Patch(':id')
  async updateTransaction(
    @Param('id') id: string,
    @Body() updateData: TransactionUpdateDTO,
  ): Promise<Transaction> {
    return this.transactionService.updateTransaction(id, updateData);
  }
  // delete data
  @UseGuards(JwtGuards)
  @Delete(':id')
  async deleteTransaction(@Param('id') id: string) {
    return this.transactionService.deleteTransaction(id);
  }

  // signature testing
  @Post('signature')
  signature(
    @Body() signature: SignatureDTO,
  ): Promise<{ SignatureResult: string } | null> {
    return this.transactionService.signature(signature);
  }
}
