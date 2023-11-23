/* eslint-disable no-undef */
const Router = require('express')
// const{} = require('../middlewares/auth/auth.middleware');
const  candidateController = require('../controller/candidateController');
const router = Router();
router.use(Router.json());
router.get("/id/:id", candidateController.getCandidate);//done
// {
//     "id": "dbId"
// }
router.post("/filter/candidates", candidateController.getFilteredCandidates);//done
// {
//     "experience": { "min": 2, "max": 5 },
//     "location": "desired_location",
//     "salaryType": "annual/monthly/hourly",
//     "education": {
//       "schoolInstitution": "desired_school",
//       "degree": "desired_degree",
//       "fieldOfStudy": "desired_field_of_study"
//     },
//     "availability": {
//       "noticePeriod": "30 days",
//       "employmentType": "part-time/full-time/contract/internship",
//       "immediateAvailability": true,
//       "onSite": true,
//       "relocate": true
//     },
//     "industryDomain": "desired_domain",
//     "certifications": ["desired_certification_1", "desired_certification_2"],
//     "itSkills": ["desired_it_skill_1", "desired_it_skill_2"],
//     "diversity": "male/female/all",
//     "age": 30,
//     "lastActive": "1 day/8 days/15 days/1 month/6 months"
// }
  
router.post("/sort/candidates", candidateController.getSortedCandidates);//done
// {
//     "sortBy": "experience/salary/education",
//     "sortOrder": "asc/desc"
//   }
router.post("/search/candidates", candidateController.getCandidatesBySearch);//zoho api hit for this query
// {
//     "skills": ["SAP"],
//     "designation": "SAP architect"
//   }
router.post("/form/candidates", candidateController.getCandidates);//done
// {
//     "skills": ["desired_skill_1", "desired_skill_2"],
//     "designation": "desired_designation",
//     "experience": { "min": 2, "max": 5 },
//     "location": "current_location",
//     "salaryType": "annual/monthly/hourly",
//     "otherRequirements": "specific_requirements",
//     "education": {
//       "schoolInstitution": "school_name",
//       "degree": "degree_name",
//       "fieldOfStudy": "field_of_study"
//     },
//     "availability": {
//       "noticePeriod": "30 days",
//       "employmentType": "part-time/full-time/contract/internship",
//       "immediateAvailability": true,
//       "onSite": true,
//       "relocate": true
//     },
//     "industryDomain": "desired_domain",
//     "certifications": ["certification_1", "certification_2"],
//     "itSkills": ["it_skill_1", "it_skill_2"],
//     "diversity": "male/female/all",
//     "age": 30,
//     "lastActive": "1 day/8 days/15 days/1 month/6 months"
//   }
  

module.exports = router;