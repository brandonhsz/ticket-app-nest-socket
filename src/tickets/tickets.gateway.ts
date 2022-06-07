import { WebSocketGateway, SubscribeMessage, MessageBody, WsResponse } from '@nestjs/websockets';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';

@WebSocketGateway({
  cors: true,
})
export class TicketsGateway {
  constructor(private readonly ticketsService: TicketsService) { }

  @SubscribeMessage('createTicket')
  create(@MessageBody() createTicketDto: CreateTicketDto): WsResponse<string> {
    this.ticketsService.create(createTicketDto)
    return { event: 'createTicketClient', data: 'created' };
  }

  @SubscribeMessage('findAllTickets')
  findAll() {
    return this.ticketsService.findAll();
  }

  @SubscribeMessage('findOneTicket')
  findOne(@MessageBody() id: number) {
    return this.ticketsService.findOne(id);
  }

  @SubscribeMessage('updateTicket')
  update(@MessageBody() updateTicketDto: UpdateTicketDto) {
    return this.ticketsService.update(updateTicketDto.id, updateTicketDto);
  }

  @SubscribeMessage('removeTicket')
  remove(@MessageBody() id: number) {
    return this.ticketsService.remove(id);
  }
}
