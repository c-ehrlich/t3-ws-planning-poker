import EventEmitter from 'events';
import { z } from 'zod';
import { createRoom } from '../../db/room/roomDbQueries';
import { t } from '../trpc';

interface MyEvents {
  join: (name: string) => void;
  leave: (name: string) => void;
  roomMembers: () => void;
}

declare interface MyEventEmitter {
  on<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  off<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  once<U extends keyof MyEvents>(event: U, listener: MyEvents[U]): this;
  emit<U extends keyof MyEvents>(
    event: U,
    ...args: Parameters<MyEvents[U]>
  ): boolean;
}
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MyEventEmitter extends EventEmitter {}

const ee = new MyEventEmitter();

export const roomRouter = t.router({
  createRoom: t.procedure.mutation(async ({ ctx }) => {
    const room = await createRoom({ prisma: ctx.prisma });
    return room;
  }),

  joinRoom: t.procedure
    .input(z.object({ publicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return 'TODO';
    }),

  leaveRoom: t.procedure
    .input(z.object({ publicId: z.string() }))
    .mutation(async ({ ctx, input }) => {
      return 'TODO';
    }),

  roomMembers: t.procedure
    .input(z.object({ publicId: z.string() }))
    .subscription(() => {
      return 'TODO';
    }),
});
