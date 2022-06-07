import { Test, TestingModule } from '@nestjs/testing';
import { TicketsGateway } from './tickets.gateway';
import { TicketsService } from './tickets.service';

describe('TicketsGateway', () => {
  let gateway: TicketsGateway;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TicketsGateway, TicketsService],
    }).compile();

    gateway = module.get<TicketsGateway>(TicketsGateway);
  });

  it('should be defined', () => {
    expect(gateway).toBeDefined();
  });
});
