import {
  WebSocketGateway, WebSocketServer, SubscribeMessage,
  OnGatewayConnection, OnGatewayDisconnect, MessageBody, ConnectedSocket,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { Logger } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { MessagingService } from './messaging.service';

@WebSocketGateway({
  namespace: '/ws',
  cors: { origin: '*' },
})
export class MessagingGateway implements OnGatewayConnection, OnGatewayDisconnect {
  @WebSocketServer()
  server: Server;

  private readonly logger = new Logger(MessagingGateway.name);
  private userSockets = new Map<string, string[]>(); // userId -> socketIds

  constructor(
    private messagingService: MessagingService,
    private jwtService: JwtService,
  ) {}

  async handleConnection(client: Socket) {
    try {
      const token = client.handshake.auth?.token || client.handshake.query?.token;
      if (!token) {
        client.disconnect();
        return;
      }

      const payload = this.jwtService.verify(token as string);
      const userId = payload.sub;
      client.data.userId = userId;

      // Kullanıcıyı kendi odasına ekle
      client.join(`user:${userId}`);

      // Socket kaydını tut
      const sockets = this.userSockets.get(userId) || [];
      sockets.push(client.id);
      this.userSockets.set(userId, sockets);

      this.logger.log(`Kullanıcı bağlandı: ${userId}`);
    } catch {
      client.disconnect();
    }
  }

  handleDisconnect(client: Socket) {
    const userId = client.data.userId;
    if (userId) {
      const sockets = this.userSockets.get(userId) || [];
      this.userSockets.set(userId, sockets.filter((s) => s !== client.id));
      this.logger.log(`Kullanıcı ayrıldı: ${userId}`);
    }
  }

  @SubscribeMessage('send_message')
  async handleMessage(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversation_id: string; content: string },
  ) {
    const senderId = client.data.userId;
    const message = await this.messagingService.sendMessage(
      data.conversation_id,
      senderId,
      data.content,
    );

    // Mesajı konuşma odasına gönder
    this.server.to(`conversation:${data.conversation_id}`).emit('new_message', message);

    return message;
  }

  @SubscribeMessage('join_conversation')
  handleJoinConversation(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversation_id: string },
  ) {
    client.join(`conversation:${data.conversation_id}`);
  }

  @SubscribeMessage('typing')
  handleTyping(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversation_id: string },
  ) {
    client.to(`conversation:${data.conversation_id}`).emit('user_typing', {
      user_id: client.data.userId,
      conversation_id: data.conversation_id,
    });
  }

  @SubscribeMessage('mark_read')
  async handleMarkRead(
    @ConnectedSocket() client: Socket,
    @MessageBody() data: { conversation_id: string },
  ) {
    await this.messagingService.markAsRead(data.conversation_id, client.data.userId);
  }
}
