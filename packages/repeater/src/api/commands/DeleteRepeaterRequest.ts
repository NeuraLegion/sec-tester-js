import { HttpRequest } from '@sec-tester/bus';

export class DeleteRepeaterRequest extends HttpRequest {
  constructor(payload: { repeaterId: string }) {
    super({
      url: `/api/v1/repeaters/${payload.repeaterId}`,
      method: 'DELETE',
      payload: undefined,
      expectReply: false
    });
  }
}
