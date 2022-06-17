import unitGroups from '../../../data/jobs.json'

/**
 * Find only jobs that require no experience.
 * @param  {Array.<string>} matches Expects usually 2 inputs: certificate/diploma/degree and area of focus (ex. 'computer engineering'). Add tangentially relevant search terms as needed (ex. 'computer science').
 * @returns {Array.<string>} An array of relevant job titles accoring to NOC.
 */
function findJobsWithoutExperience(...matches) {
  return {
    message: 'This route is no longer in use. Please use /jobs-by-credential',
  }
  return [
    ...unitGroups.reduce((relatedJobs, unitGroup) => {
      // Search through each unit group for the employment requirements section
      const employmentRequirements = unitGroup.details.find((detail) => {
        return detail.section === 'Employment requirements'
      })

      // Creates one long string of all the employment requirement details for us to search through.
      const allDetails = employmentRequirements.details.join(' ')

      // Matches only if the job requirements does NOT include "years of experience"
      const isMatch = matches.every((match) => {
        if (!allDetails.match(new RegExp('years of experience', 'gi'))) {
          return allDetails.match(new RegExp(match, 'gi'))
        }
      })

      // Add job title to relatedJobs if the job requirements does NOT include "years of experience"
      if (isMatch) {
        const jobs = unitGroup.details.find((detail) => {
          return detail.section === 'Illustrative example(s)'
        })
        jobs.details.forEach((job) => relatedJobs.add(job))
      }

      return relatedJobs
    }, new Set()),
  ]
}

/**
 * Find only jobs that require years of experience.
 * @param  {Array.<string>} matches Expects usually 2 inputs: certificate/diploma/degree and area of focus (ex. 'computer engineering'). Add tangentially relevant search terms as needed (ex. 'computer science').
 * @returns {Array.<string>} An array of relevant job titles accoring to NOC.
 */
function findJobsRequiringExperience(...matches) {
  return [
    ...unitGroups.reduce((relatedJobs, unitGroup) => {
      // Search through each unit group for the employment requirements section
      const employmentRequirements = unitGroup.details.find((detail) => {
        return detail.section === 'Employment requirements'
      })

      // Creates one long string of all the employment requirement details for us to search through.
      const allDetails = employmentRequirements.details.join(' ')

      // Matches only if the job requirements includes "years of experience"
      const isMatch = matches.every((match) => {
        if (allDetails.match(new RegExp('years of experience', 'gi'))) {
          return allDetails.match(new RegExp(match, 'gi'))
        }
      })

      // Add job title to relatedJobs if the job requirements includes "years of experience"
      if (isMatch) {
        const examples = unitGroup.details.find((detail) => {
          return detail.section === 'Illustrative example(s)'
        })
        examples.details.forEach((job) => relatedJobs.add(job))
      }

      return relatedJobs
    }, new Set()),
  ]
}

export default defineEventHandler(async (event) => {
  const { credential, field } = useQuery(event)
  const searchTerms = [credential, field]
  return {
    after_graduation: findJobsWithoutExperience(...searchTerms),
    with_experience: findJobsRequiringExperience(...searchTerms),
  }
})
