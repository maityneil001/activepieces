import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { dCmmsAuth } from '../..';

export const createNewIncident = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'createNewIncident',
  displayName: 'Create New Incident',
  description: 'Report a new incident into DreamzCmms',
  props: {
    title: Property.ShortText({
      displayName: 'Incident Title',
      required: true,
      description: 'The title of the incient',
    }),
    description: Property.LongText({
      displayName: 'Incident Description',
      required: true,
      description: 'The description of the incient',
    }),
     requesterEmail: Property.ShortText({
      displayName: 'Requester Email',
      required: true,
      description: 'Email or Username of the customer or employee',
    }),
    priority: Property.ShortText({
      displayName: 'Incident Priority',
      required: false,
      description: 'The description of the incient',
    }),
   
  },
  auth: dCmmsAuth,
  async run(context) {
    
    const { title: title, description, priority, requesterEmail } = context.propsValue;
    const payload = JSON.stringify({
        "apiKey": context.auth,
        "title": title,
        "description":description,
        "priority": priority,
        "requesterEmail": requesterEmail
    })

    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: 'https://cmms.dreamzcmms.com/cmmsv2_api/api/CreateRequest',
      headers: {
        'Content-Type': 'application/json', // Pass API key in headers
      },
      body: payload,
    });
    return res.body;
  },
});
