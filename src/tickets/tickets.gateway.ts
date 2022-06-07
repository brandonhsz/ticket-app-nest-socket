import { WebSocketGateway, SubscribeMessage, MessageBody, WsResponse, ConnectedSocket, WebSocketServer, } from '@nestjs/websockets';
import { TicketsService } from './tickets.service';
import { CreateTicketDto } from './dto/create-ticket.dto';
import { UpdateTicketDto } from './dto/update-ticket.dto';
import { Socket, Server } from 'socket.io';

@WebSocketGateway({ namespace: 'tickets', cors: true })
export class TicketsGateway {
  constructor(private readonly ticketsService: TicketsService) { }

  @WebSocketServer() wss: Server

  @SubscribeMessage('createTicket')
  async create(@MessageBody() createTicketDto: CreateTicketDto) {
    console.log("create");
    this.ticketsService.create(createTicketDto)
    return this.wss.emit('ticket', await this.ticketsService.findAll());
  }

  @SubscribeMessage('findAllTickets')
  async findAll() {
    console.log("findAll");
    return this.wss.emit('ticket', await this.ticketsService.findAll());
  }

  @SubscribeMessage('findOneTicket')
  async findOne(@MessageBody() { id }: { id: string }) {
    console.log("findOne");
    return this.wss.emit('ticket', await this.ticketsService.findOne(id));
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
