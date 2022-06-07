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
  async create(@MessageBody() createTicketDto: CreateTicketDto): Promise<WsResponse<string>> {
    this.ticketsService.create(createTicketDto)
    return { event: 'createTicketClient', data: 'created' };
  }

  @SubscribeMessage('findAllTickets')
  async findAll(): Promise<WsResponse<any>> {

    return { event: 'findAllTicketsClient', data: await this.ticketsService.findAll() };
  }

  @SubscribeMessage('findOneTicket')
  async findOne(@MessageBody() { id }: { id: string }): Promise<WsResponse<any>> {

    return { event: 'findOneTicketClient', data: await this.ticketsService.findOne(id) };
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
