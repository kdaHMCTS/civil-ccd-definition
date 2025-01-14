const {I} = inject();
const config = require('../../config.js');

module.exports = {

  fields: {
    witnessSelectionEvidence: {
      id: '#witnessSelectionEvidence',
      options: {
        witnessStatement: '#witnessSelectionEvidence-WITNESS_STATEMENT'
      }
    },

    witnessSelectionEvidenceRes: {
      id: '#witnessSelectionEvidenceRes',
      options: {
        witnessStatement: '#witnessSelectionEvidenceRes-WITNESS_STATEMENT'
      }
    },

    expertSelectionEvidence:{
      id: '#expertSelectionEvidence',
      options: {
        expertReport: '#expertSelectionEvidence-EXPERT_REPORT'
      }
    },

    expertSelectionEvidenceRes:{
      id: '#expertSelectionEvidenceRes',
      options: {
        expertReport: '#expertSelectionEvidenceRes-EXPERT_REPORT'
      }
    },

    trialSelectionEvidence:{
      id: '#trialSelectionEvidence',
      options: {
        authorities: '#trialSelectionEvidence-AUTHORITIES'
      }
    },

    trialSelectionEvidenceRes:{
      id: '#trialSelectionEvidenceRes',
      options: {
        authorities: '#trialSelectionEvidenceRes-AUTHORITIES'
      }
    },

    documentWitnessStatement:{
      id: '#documentWitnessStatement',
      button: '#documentWitnessStatement > div:nth-child(1) > button:nth-child(2)',
      name: '#documentWitnessStatement_0_witnessOptionName',
      day: '#witnessOptionUploadDate-day',
      month: '#witnessOptionUploadDate-month',
      year: '#witnessOptionUploadDate-year',
      document: '#documentWitnessStatement_0_witnessOptionDocument'
    },

    documentWitnessStatementRes:{
      id: '#documentWitnessStatementRes',
      button: '#documentWitnessStatementRes > div:nth-child(1) > button:nth-child(2)',
      name: '#documentWitnessStatementRes_0_witnessOptionName',
      day: '#witnessOptionUploadDate-day',
      month: '#witnessOptionUploadDate-month',
      year: '#witnessOptionUploadDate-year',
      document: '#documentWitnessStatementRes_0_witnessOptionDocument'
    },

    documentExpertReport:{
      id: '#documentExpertReport',
      button: '#documentExpertReport > div:nth-child(1) > button:nth-child(2)',
      name: '#documentExpertReport_0_expertOptionName',
      expertise: '#documentExpertReport_0_expertOptionExpertise',
      day: '#expertOptionUploadDate-day',
      month: '#expertOptionUploadDate-month',
      year: '#expertOptionUploadDate-year',
      document: '#documentExpertReport_0_expertDocument'
    },

    documentExpertReportRes:{
      id: '#documentExpertReportRes',
      button: '#documentExpertReportRes > div:nth-child(1) > button:nth-child(2)',
      name: '#documentExpertReportRes_0_expertOptionName',
      expertise: '#documentExpertReportRes_0_expertOptionExpertise',
      day: '#expertOptionUploadDate-day',
      month: '#expertOptionUploadDate-month',
      year: '#expertOptionUploadDate-year',
      document: '#documentExpertReportRes_0_expertDocument'
    },

    documentAuthorities:{
      id: '#documentAuthorities',
      button: '#documentAuthorities > div:nth-child(1) > button:nth-child(2)',
      document: '#documentAuthorities_0_documentUpload'
    },

    documentAuthoritiesRes:{
      id: '#documentAuthoritiesRes',
      button: '#documentAuthoritiesRes > div:nth-child(1) > button:nth-child(2)',
      document: '#documentAuthoritiesRes_0_documentUpload'
    }
  },

  async selectType(defendant){
    if(defendant) {
      await within(this.fields.witnessSelectionEvidenceRes.id, () => {
        I.click(this.fields.witnessSelectionEvidenceRes.options.witnessStatement);
      });
      await within(this.fields.expertSelectionEvidenceRes.id, () => {
        I.click(this.fields.expertSelectionEvidenceRes.options.expertReport);
      });
      await within(this.fields.trialSelectionEvidenceRes.id, () => {
        I.click(this.fields.trialSelectionEvidenceRes.options.authorities);
      });
    }
    else {
      await within(this.fields.witnessSelectionEvidence.id, () => {
        I.click(this.fields.witnessSelectionEvidence.options.witnessStatement);
      });
      await within(this.fields.expertSelectionEvidence.id, () => {
        I.click(this.fields.expertSelectionEvidence.options.expertReport);
      });
      await within(this.fields.trialSelectionEvidence.id, () => {
        I.click(this.fields.trialSelectionEvidence.options.authorities);
      });
    }
    await I.clickContinue();
  },

  async uploadYourDocument(file, defendant){
    await I.waitForText('Upload Your Documents');
    if(defendant) {
      await within(this.fields.documentWitnessStatementRes.id, () => {
        I.click(this.fields.documentWitnessStatementRes.button);
        I.fillField(this.fields.documentWitnessStatementRes.name, 'test name');
        I.fillField(this.fields.documentWitnessStatementRes.day, '1');
        I.fillField(this.fields.documentWitnessStatementRes.month, '1');
        I.fillField(this.fields.documentWitnessStatementRes.year, '2022');
        I.attachFile(this.fields.documentWitnessStatementRes.document, file);
      });
      await within(this.fields.documentExpertReportRes.id, () => {
        I.click(this.fields.documentExpertReportRes.button);
        I.fillField(this.fields.documentExpertReportRes.name, 'test name');
        I.fillField(this.fields.documentExpertReportRes.expertise, 'test expertise');
        I.fillField(this.fields.documentExpertReportRes.day, '1');
        I.fillField(this.fields.documentExpertReportRes.month, '1');
        I.fillField(this.fields.documentExpertReportRes.year, '2022');
        I.attachFile(this.fields.documentExpertReportRes.document, file);
      });
      await within(this.fields.documentAuthoritiesRes.id, () => {
        I.click(this.fields.documentAuthoritiesRes.button);
        I.attachFile(this.fields.documentAuthoritiesRes.document, file);
      });
    }
    else {
      await within(this.fields.documentWitnessStatement.id, () => {
        I.click(this.fields.documentWitnessStatement.button);
        I.fillField(this.fields.documentWitnessStatement.name, 'test name');
        I.fillField(this.fields.documentWitnessStatement.day, '1');
        I.fillField(this.fields.documentWitnessStatement.month, '1');
        I.fillField(this.fields.documentWitnessStatement.year, '2022');
        I.attachFile(this.fields.documentWitnessStatement.document, file);
      });
      await within(this.fields.documentExpertReport.id, () => {
        I.click(this.fields.documentExpertReport.button);
        I.fillField(this.fields.documentExpertReport.name, 'test name');
        I.fillField(this.fields.documentExpertReport.expertise, 'test expertise');
        I.fillField(this.fields.documentExpertReport.day, '1');
        I.fillField(this.fields.documentExpertReport.month, '1');
        I.fillField(this.fields.documentExpertReport.year, '2022');
        I.attachFile(this.fields.documentExpertReport.document, file);
      });
      await within(this.fields.documentAuthorities.id, () => {
        I.click(this.fields.documentAuthorities.button);
        I.attachFile(this.fields.documentAuthorities.document, file);
      });
    }
    await I.clickContinue();
  },

  async uploadADocument(caseId, defendant) {
    await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId);
    await I.waitForText('Summary');
    if (defendant) {
      await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/EVIDENCE_UPLOAD_RESPONDENT/EVIDENCE_UPLOAD_RESPONDENTEvidenceUpload');
    }
    else {
      await I.amOnPage(config.url.manageCase + '/cases/case-details/' + caseId + '/trigger/EVIDENCE_UPLOAD_APPLICANT/EVIDENCE_UPLOAD_APPLICANTEvidenceUpload');
    }
    await I.waitForText('Upload Your Documents');
    await I.click('Continue');
  }
};
