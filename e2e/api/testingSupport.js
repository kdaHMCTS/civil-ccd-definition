const config = require('../config.js');
const idamHelper = require('./idamHelper');
const restHelper = require('./restHelper');
const {retry} = require('./retryHelper');

let incidentMessage;

const MAX_RETRIES = 60;
const RETRY_TIMEOUT_MS = 5000;

module.exports =  {
  waitForFinishedBusinessProcess: async caseId => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/case/${caseId}/business-process`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }, null, 'GET')
        .then(async response => await response.json()).then(response => {
          let businessProcess = response.businessProcess;
          if (response.incidentMessage) {
            incidentMessage = response.incidentMessage;
          } else if (businessProcess && businessProcess.status !== 'FINISHED') {
            throw new Error(`Ongoing business process: ${businessProcess.camundaEvent}, case id: ${caseId}, status: ${businessProcess.status},`
              + ` process instance: ${businessProcess.processInstanceId}, last finished activity: ${businessProcess.activityId}`);
          }
      });
    }, MAX_RETRIES, RETRY_TIMEOUT_MS);
    if (incidentMessage)
      throw new Error(`Business process failed for case: ${caseId}, incident message: ${incidentMessage}`);
  },

  assignCaseToDefendant: async (caseId, caseRole = 'RESPONDENTSOLICITORONE', user = config.defendantSolicitorUser) => {
    const authToken = await idamHelper.accessToken(user);

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/assign-case/${caseId}/${caseRole}`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}` },
        {},
        'POST')
        .then(response => {
          if (response.status === 200) {
            console.log( 'Role created successfully');
          } else if (response.status === 409) {
            console.log('Role already exists!');
          } else  {
            console.log('response..', response);
            throw new Error(`Error occurred with status : ${response.status}`);
          }
        });
    });
  },

  assignCaseToLRSpecDefendant: async (caseId, caseRole = 'RESPONDENTSOLICITORONE', user = config.defendantSolicitorUser) => {
      const authToken = await idamHelper.accessToken(user);

      await retry(() => {
        return restHelper.request(
          `${config.url.civilService}/testing-support/assign-case/${caseId}/${caseRole}`,
          {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${authToken}` },
          {},
          'POST')
          .then(response => {
            if (response.status === 200) {
              console.log( 'Role created successfully');
            } else if (response.status === 409) {
              console.log('Role already exists!');
            } else  {
              throw new Error(`Error occurred with status : ${response.status}`);
            }
          });
      });
    },

  unAssignUserFromCases: async (caseIds, user) => {
    const authToken = await idamHelper.accessToken(user);

    await retry(() => {
      return restHelper.request(
        `${config.url.civilService}/testing-support/unassign-user`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`
        },
        {
          caseIds
        },
        'POST')
        .then(response => {
          if (response.status === 200) {
            caseIds.forEach(caseId => console.log( `User unassigned from case [${caseId}] successfully`));
          }
          else  {
            throw new Error(`Error occurred with status : ${response.status}`);
          }
        });
    });
  },

  checkToggleEnabled: async (toggle) => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);

    if(toggle === 'hearing-and-listing-sdo'){
      return false;
    }

    if(toggle === 'case-flags'){
      return false;
    }

    return await restHelper.request(
        `${config.url.civilService}/testing-support/feature-toggle/${toggle}`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }, null, 'GET')
        .then(async response =>  {
          if (response.status === 200) {
            const json = await response.json();
            return json.toggleEnabled;
          } else {
            throw new Error(`Error when checking toggle occurred with status : ${response.status}`);
          }
          }
        );
  },

  checkNoCToggleEnabled: async () => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);

       return await restHelper.request(
        `${config.url.civilService}/testing-support/feature-toggle/noc`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }, null, 'GET')
         .then(async response =>  {
             if (response.status === 200) {
               const json = await response.json();
               return json.toggleEnabled;
             } else {
               throw new Error(`Error when checking toggle occurred with status : ${response.status}`);
             }
           }
         );
  },

  checkHnlToggleEnabled: async () => {
    return false;
    // const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);
    //
    // return await restHelper.request(
    //   `${config.url.civilService}/testing-support/feature-toggle/hearing-and-listing-sdo`,
    //   {
    //     'Content-Type': 'application/json',
    //     'Authorization': `Bearer ${authToken}`,
    //   }, null, 'GET')
    //   .then(async response =>  {
    //       if (response.status === 200) {
    //         const json = await response.json();
    //         return json.toggleEnabled;
    //       } else {
    //         throw new Error(`Error when checking toggle occurred with status : ${response.status}`);
    //       }
    //     }
    //   );
  },

  checkCourtLocationDynamicListIsEnabled: async () => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);

       return await restHelper.request(
        `${config.url.civilService}/testing-support/feature-toggle/court-locations`,
        {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${authToken}`,
        }, null, 'GET')
         .then(async response =>  {
             if (response.status === 200) {
               const json = await response.json();
               return json.toggleEnabled;
             } else {
               throw new Error(`Error when checking toggle occurred with status : ${response.status}`);
             }
           }
         );
  },

  checkCertificateOfServiceIsEnabled: async () => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);

    return await restHelper.request(
      `${config.url.civilService}/testing-support/feature-toggle/isCertificateOfServiceEnabled`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }, null, 'GET')
      .then(async response =>  {
          if (response.status === 200) {
            const json = await response.json();
            return json.toggleEnabled;
          } else {
            throw new Error(`Error when checking toggle occurred with status : ${response.status}`);
          }
        }
      );
  },

  checkCaseFlagsEnabled: () => {
    return false;
  },

  updateCaseData: async (caseId, caseData, user = config.applicantSolicitorUser) => {
    const authToken = await idamHelper.accessToken(user);

    await restHelper.retriedRequest(
      `${config.url.civilService}/testing-support/case/${caseId}`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`,
      }, caseData, 'PUT');
  },

  uploadDocument: async () => {
    const authToken = await idamHelper.accessToken(config.applicantSolicitorUser);
    let response = await restHelper.request(
      `${config.url.civilService}/testing-support/upload/test-document`,
      {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${authToken}`
      },
      {},
      'POST');

    return await response.json();
  }

};
