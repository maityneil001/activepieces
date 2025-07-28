import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { dCmmsAuth } from '../..';

export const addIncidentNote = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'addIncidentNote',
  displayName: 'Add Incident Note',
  description: 'Add a note to your incident',
  props: {
    caseId: Property.ShortText({
      displayName: 'Case Id',
      required: true,
      description: 'Case Id of the incident',
    }),
    note: Property.ShortText({
      displayName: 'Note',
      required: true,
      description: 'Note your wnat to add to your Incident',
    }),
  },
  async run(context) {
    // Action logic here
    const { caseId: caseId, note } = context.propsValue;
    const payload = JSON.stringify({
        "apiKey": context.auth,
        "caseID": caseId,
        "isActive": 1,
        "note": note
    });
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.POST,
      url: 'https://cmms.dreamzcmms.com/cmmsv2_api/api/IncidentNote',
      headers: {
        'Content-Type': 'application/json', // Pass API key in headers
      },
      body: payload
    });
    return res.body;


  },
});
