const config = require('../../../config.js');

const mpScenario = 'ONE_V_ONE';
const judgeUser = config.judgeUserWithRegionId1;
const legalAdvUser = config.tribunalCaseworkerWithRegionId4;
// to use on local because the idam images are different
// const judgeUser = config.judgeUserWithRegionId1Local;
// const legalAdvUser = config.tribunalCaseworkerWithRegionId1Local;
const claimAmountJudge = '11000';
const claimAmountAdvisor = '100';
let fastTrackDirectionsTask;
let smallClaimDirectionsTask;
let transferOfflineSdoTask;
if (config.runWAApiTest) {
  fastTrackDirectionsTask = require('../../../../wa/tasks/fastTrackDirectionsTask.js');
  smallClaimDirectionsTask = require('../../../../wa/tasks/smallClaimDirectionsTask.js');
  transferOfflineSdoTask = require('../../../../wa/tasks/transferOfflineSdo.js');
}

Feature('CCD 1v1 API test @api-sdo');

async function prepareClaim(api, claimAmount) {
  await api.createClaimWithRepresentedRespondent(config.applicantSolicitorUser, mpScenario, claimAmount);
  await api.amendClaimDocuments(config.applicantSolicitorUser);
  await api.notifyClaim(config.applicantSolicitorUser);
  await api.notifyClaimDetails(config.applicantSolicitorUser);
  await api.defendantResponse(config.defendantSolicitorUser, mpScenario);
  await api.claimantResponse(config.applicantSolicitorUser, mpScenario, 'AWAITING_APPLICANT_INTENTION', 'FOR_SDO');
}

Scenario('1v1 full defence unspecified - judge draws small claims WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'CREATE_SMALL');
  }
});

Scenario('1v1 full defence unspecified - judge draws fast track WITH sum of damages', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'CREATE_FAST');
  }
});

Scenario('1v1 full defence unspecified - judge draws small claims WITHOUT sum of damages', async ({ api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'CREATE_SMALL_NO_SUM');
  }
});


Scenario('1v1 full defence unspecified - judge draws fast track WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'CREATE_FAST_NO_SUM');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});

Feature('CCD 1v1 API test @e2e-nightly');

Scenario('1v1 full defence unspecified - legal advisor draws small claims WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'CREATE_SMALL_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws small claims WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'CREATE_SMALL');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws fast track WITH sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'CREATE_FAST');
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws fast track WITHOUT sum of damages', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'CREATE_FAST_NO_SUM');
  }
});

Scenario('1v1 full defence unspecified - judge draws disposal order', async ({ api, WA}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    if (config.runWAApiTest) {
      const caseId = await api.getCaseId();
      const task = await api.retrieveTaskDetails(config.judgeUserWithRegionId1, caseId, config.waTaskIds.fastTrackDirections);
      WA.validateTaskInfo(task, fastTrackDirectionsTask);
    }
    await api.createSDO(judgeUser);
  }
});

Scenario('1v1 full defence unspecified - legal advisor draws disposal order', async ({api, WA}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    if (config.runWAApiTest) {
      const caseId = await api.getCaseId();
      // TODO not sure which one is for this case
      const task = await api.retrieveTaskDetails(legalAdvUser, caseId, config.waTaskIds.legalAdvisorDirections);
      WA.validateTaskInfo(task, smallClaimDirectionsTask);
    }
    await api.createSDO(legalAdvUser);
  }
});

Scenario('1v1 full defence unspecified - judge declares SDO unsuitable', async ({api, WA}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountJudge);
    await api.createSDO(judgeUser, 'UNSUITABLE_FOR_SDO');
    if (config.runWAApiTest) {
      const caseId = await api.getCaseId();
      const task = await api.retrieveTaskDetails(config.hearingCenterAdminWithRegionId1, caseId, config.waTaskIds.notSuitableSdo);
      WA.validateTaskInfo(task, transferOfflineSdoTask);
    }
  }
});

// skip while ccd-data-store says legalAdvUser has no permission to run this event
Scenario.skip('1v1 full defence unspecified - legal advisor declares SDO unsuitable', async ({api}) => {
  // sdo requires judicial_referral, which is not past preview
  if (['preview', 'demo'].includes(config.runningEnv)) {
    await prepareClaim(api, claimAmountAdvisor);
    await api.createSDO(legalAdvUser, 'UNSUITABLE_FOR_SDO');
  }
});

AfterSuite(async ({api}) => {
  await api.cleanUp();
});
