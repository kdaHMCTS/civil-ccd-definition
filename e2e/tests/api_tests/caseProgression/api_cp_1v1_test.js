/* eslint-disable no-unused-vars */

const config = require('../../../config.js');
const mpScenario = 'ONE_V_ONE';

Feature('CCD 1v1 API test @api-cp-1v1, @api-cp');

Scenario('Hearing notice, sdo, dj claim', async ({I, api}) => {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario);
  await api.addCaseNote(config.adminUser);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser, mpScenario);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.amendRespondent1ResponseDeadline(config.systemupdate);
  await api.defaultJudgment(config.applicantSolicitorUser);

});

AfterSuite(async  ({api}) => {
  await api.cleanUp();
});