module.exports = {
  name: 'Legal Advisor Small Claims Track Directions',
  type: 'LegalAdvisorSmallClaimsTrackDirections',
  task_title: 'Legal Advisor Small Claims Track Directions',
  location_name: 'Central London County Court',
  location: '192280',
  execution_type: 'Case Management Task',
  jurisdiction: 'CIVIL',
  region: '4',
  case_type_id: 'CIVIL',
  case_category: 'Civil',
  auto_assigned: false,
  case_management_category: 'Civil',
  work_type_id: 'decision_making_work',
  work_type_label: 'Decision-making work',
  permissions: { values: [ 'Read', 'Own', 'Manage', 'Cancel', 'Complete', 'Claim', 'Assign', 'Unassign' ] },
  description: '[Directions - Legal Adviser Small Claims Track](/cases/case-details/${[CASE_REFERENCE]}/trigger/CREATE_SDO/CREATE_SDOSmallClaims)',
  role_category: 'LEGAL_OPERATIONS'
};
