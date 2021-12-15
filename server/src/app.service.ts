import { Injectable } from '@nestjs/common';
import { Request } from 'express';
@Injectable()
export class AppService {
  getAbout(req: Request) {
    let ip = req.ip.split(':');

    return {
      client: {
        host: ip[ip.length - 1],
      },
      server: {
        current_time: new Date().getTime(),
        services: [
          {
            name: 'spotify',
            widgets: [
              {
                name: 'player',
                description: 'A spotify web player',
                params: [{ name: 'playerWidgetSongLink', type: 'string' }],
              },
            ],
          },
          {
            name: 'github',
            widgets: [
              {
                name: 'stars',
                description: 'Stars count for a given repo',
                params: [{ name: 'starsWidgetId', type: 'number' }],
              },
              {
                name: 'commits',
                description: 'Commits count for a given repo',
                params: [{ name: 'commitsWidgetId', type: 'number' }],
              },
              {
                name: 'calendar',
                description: 'Github activity calendar for logged user',
                params: [],
              },
            ],
          },
          {
            name: 'solana',
            widgets: [
              {
                name: 'balance',
                description: 'Solana balance of the logged user',
                params: [],
              },
              {
                name: 'rentExempt',
                description:
                  'Rent exempt amount calculations for a given buffer byte-size',
                params: [],
              },
            ],
          },
        ],
      },
    };
  }
}
