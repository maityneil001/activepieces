import { createAction, Property } from '@activepieces/pieces-framework';
import { httpClient, HttpMethod } from '@activepieces/pieces-common';
import { dCmmsAuth } from '../..';


export const getIncidentStatus = createAction({
  // auth: check https://www.activepieces.com/docs/developers/piece-reference/authentication,
  name: 'getIncidentStatus',
  displayName: 'Get Incident Status',
  description: 'Get the status of the incident you created',
  props: {
    caseId: Property.ShortText({
      displayName: 'Case Id',
      required: true,
      description: 'Case Id of the incident',
    }),
  },
  auth: dCmmsAuth,
  async run(context) {
    // Action logic here
    const { caseId: caseId } = context.propsValue;
    const res = await httpClient.sendRequest<string[]>({
      method: HttpMethod.GET,
      url: 'https://cmms.dreamzcmms.com/cmmsv2_api/api/Incidents?apiToken='+context.auth+'&caseID='+caseId,
      headers: {
        'Content-Type': 'application/json', // Pass API key in headers
      },
    });
    return res.body;
  },
});
