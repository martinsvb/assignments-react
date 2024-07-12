import { Content } from '@prisma/client';

export class ContentEntity implements Content {
  readonly id: string;

  title: string;

  text: string;

  type: string;

  state: string | null;

  published: boolean | null;

  createdAt: Date;

  updatedAt: Date;

  constructor(data: Partial<ContentEntity>) {
    Object.assign(this, data);
  }
}
