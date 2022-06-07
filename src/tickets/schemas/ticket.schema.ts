import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TicketDocument = Ticket & Document;

@Schema()
export class Ticket {
  @Prop({ required: true })
  title: string;

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  status: string;

  @Prop({ required: true })
  priority: string;

  // @Prop({ required: true })
  // createdAt: Date;
}

export const TicketSchema = SchemaFactory.createForClass(Ticket);