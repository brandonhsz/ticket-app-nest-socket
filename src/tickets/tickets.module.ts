import { Module } from '@nestjs/common';
import { TicketsService } from './tickets.service';
import { TicketsGateway } from './tickets.gateway';
import { MongooseModule } from '@nestjs/mongoose';
import { TicketSchema } from './schemas/ticket.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: 'Ticket', schema: TicketSchema },
    ])
  ],
  providers: [TicketsGateway, TicketsService]
})
export class TicketsModule { }
