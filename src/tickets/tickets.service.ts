import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Injectable } from '@nestjs/common';

import { CreateTicketDto } from '../tickets/dto/create-ticket.dto';
import { UpdateTicketDto } from '../tickets/dto/update-ticket.dto';

import { Ticket, TicketDocument } from './schemas/ticket.schema';

@Injectable()
export class TicketsService {

  constructor(@InjectModel('Ticket') private readonly ticketModel: Model<TicketDocument>) { }

  async create(createTicketDto: CreateTicketDto) {
    const createdTicket = new this.ticketModel(createTicketDto);
    return createdTicket.save();
  }

  async findAll() {
    const tickets = await this.ticketModel.find().exec();
    return tickets;
  }

  async findOne(id: string) {
    const ticket = await this.ticketModel.findOne({ _id: id }).exec();
    return ticket;
  }

  async update(id: number, updateTicketDto: UpdateTicketDto) {
    return `This action updates a #${id} ticket`;
  }

  async remove(id: number) {
    return `This action removes a #${id} ticket`;
  }
}
