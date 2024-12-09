export interface MessageAttachment {
  url: string;
  type: string;
  name: string;
}

export interface MessageMetadata {
  read: boolean;
  readAt?: Date;
  isSystemMessage: boolean;
}

export interface Message {
  _id: string;
  project: string;
  sender: string;
  recipient: string;
  content: string;
  attachments?: MessageAttachment[];
  metadata: MessageMetadata;
  parentMessage?: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface CreateMessageInput {
  projectId: string;
  recipientId: string;
  content: string;
  attachments?: MessageAttachment[];
  parentMessageId?: string;
}

export interface UpdateMessageInput {
  messageId: string;
  content?: string;
  attachments?: MessageAttachment[];
  metadata?: Partial<MessageMetadata>;
}
