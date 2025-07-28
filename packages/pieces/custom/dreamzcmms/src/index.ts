
    import { createPiece, PieceAuth } from "@activepieces/pieces-framework";
    import {createNewIncident} from "./lib/actions/create-new-incident";
    import {getIncidentStatus} from "./lib/actions/get-incident-status";
    import {addIncidentNote} from "./lib/actions/add-incident-note";

    export const dCmmsAuth = PieceAuth.SecretText({
      displayName: 'API Key',
      required: true,
      description: 'Please provide the Api Key for your respective organization of DreamzCMMS',
    });
  

    export const dreamzcmms = createPiece({
      displayName: "Dreamzcmms",
      auth: dCmmsAuth,
      minimumSupportedRelease: '0.36.1',
      logoUrl: "https://dreamzcmms.com/wp-content/uploads/2024/12/dreamzcmms.jpg",
      authors: ['Dreamztech Solutions Inc'],
      actions: [createNewIncident, getIncidentStatus, addIncidentNote],
      triggers: [],
    });
    