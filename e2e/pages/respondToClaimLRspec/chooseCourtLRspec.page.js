const {I} = inject();
const {checkCourtLocationDynamicListIsEnabled} = require('./../../api/testingSupport');
const config = require('./../../config');

module.exports = {
  fields: function(mpScenario) {
    switch (mpScenario) {
      case 'ClaimantResponse': {
        return {
          oldFields: {
            chooseCourtLocation: {
              id: '#applicant1DQRequestedCourt_responseCourtCode'
            },
            reasonForHearingAtSpecificCourt: '#applicant1DQRequestedCourt_reasonForHearingAtSpecificCourt'
          },
          fields: {
            responseCourtLocations: {
              id: 'select[id$="applicant1DQRequestedCourt_responseCourtLocations"]',
              options: {
                preferredCourt: config.claimantSelectedCourt
              }
            },
            reasonForHearingAtSpecificCourt: '#applicant1DQRequestedCourt_reasonForHearingAtSpecificCourt'
          }
        };
      }

     case 'DefendantResponse2': {
        return {
          oldFields: {
            chooseCourtLocation: {
              id: '#responseClaimCourtLocation2Required_radio',
              options: {
                yes: 'Yes',
                no: 'No'
              }
            },
          },
          fields: {
            responseCourtLocations: {
              id: 'select[id$="respondent2DQRequestedCourt_responseCourtLocations"]',
              options: {
                preferredCourt: config.defendant2SelectedCourt
              }
            },
            reasonForHearingAtSpecificCourt: '#respondent2DQRequestedCourt_reasonForHearingAtSpecificCourt'
          }
        };
       }

      case 'DefendantResponse':
      default: {
        return {
          oldFields: {
            chooseCourtLocation: {
              id: '#responseClaimCourtLocationRequired_radio',
              options: {
                yes: 'Yes',
                no: 'No'
              }
            }
          },
          fields: {
            responseCourtLocations: {
              id: 'select[id$="respondent1DQRequestedCourt_responseCourtLocations"]',
              options: {
                preferredCourt: config.defendantSelectedCourt
              }
            },
            reasonForHearingAtSpecificCourt: '#respondent1DQRequestedCourt_reasonForHearingAtSpecificCourt'
          }
        };
      }
    }
  },

  async chooseCourt(mpScenario) {
    let isCourtListEnabled = await checkCourtLocationDynamicListIsEnabled();
    if (!isCourtListEnabled) {
      I.waitForElement(this.fields(mpScenario).oldFields.chooseCourtLocation.id);
      await I.runAccessibilityTest();
      if (mpScenario == 'ClaimantResponse') {
        I.fillField(this.fields(mpScenario).oldFields.chooseCourtLocation.id, '343');
        I.fillField(this.fields(mpScenario).oldFields.reasonForHearingAtSpecificCourt, 'Some reason');

      } else {
        await within(this.fields(mpScenario).oldFields.chooseCourtLocation.id, () => {
          I.click(this.fields(mpScenario).oldFields.chooseCourtLocation.options.no);
        });
      }
    }
    else {
      I.waitForElement(this.fields(mpScenario).fields.responseCourtLocations.id);
      await I.runAccessibilityTest();
      I.selectOption(this.fields(mpScenario).fields.responseCourtLocations.id,
      this.fields(mpScenario).fields.responseCourtLocations.options.preferredCourt);
      I.fillField(this.fields(mpScenario).fields.reasonForHearingAtSpecificCourt, 'Some reason');
    }
    await I.clickContinue();
  }
};
