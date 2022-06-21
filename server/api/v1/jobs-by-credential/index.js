import { sendError, createError } from 'h3'

// Bring in unit groups (316 groups)
import unitGroups from '../../../data/noc2016_v1_3.json'

/**
 * Event hanlder for the jobs-by-credential endpoint.
 */
export default defineEventHandler(async (event) => {
  const query = useQuery(event) //  query properties expected: duration?, credential, keywords

  // ERROR HANDLING
  // Should we not receive a "credential" or "keywords" in our query, respond with error and return
  if ((!query.credential ?? true) && (!query.keywords ?? true)) {
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: 'Query was not correctly sent with request.',
        debug: false,
      })
    )
    return
  }

  // Using our query object, find related groups and return
  return findRelatedUnitGroups(
    query.credential,
    query.keywords,
    query.duration ?? false
  )
})

/**
 *
 * @param {String} credential
 * @param {Array<String>} keywords
 * @param {String} duration
 */
function findRelatedUnitGroups(credential, keywords, duration = false) {
  const initialKeywordsSearchArray = keywords.trim().toLowerCase().split(',')

  const relatedJobs = [] // Used to push our found related jobs to.

  // Filter unit groups to only those related to our search - will return as "groups" in our outbound object
  const relatedGroups = unitGroups.reduce((matchedGroups, unitGroup) => {
    const educationalRequirements = unitGroup.education
    const eduReqString = educationalRequirements.join(' ').toLowerCase() // stringified for faster searching using regex

    // True if matched with at least 1 of the keywords is in the employment requirements
    const unitGroupHasKeywordMatch = initialKeywordsSearchArray.some(
      (keyword) => {
        return eduReqString.match(new RegExp(keyword, 'gi'))
      }
    )

    // Add nothing to accumulator and return if there is no keyword his in this unit group.
    if (!unitGroupHasKeywordMatch) return matchedGroups

    // Consider duration and educational requirements.
    let credentialKeywords = duration ? [duration, credential] : [credential]

    // formatting
    credentialKeywords = credentialKeywords.map((keyword) =>
      keyword.toLowerCase().trim()
    )

    // Improvement to help find diploma credentials - NOC2016 uses "college program" instead of "diploma" a lot.
    if (credentialKeywords.includes('diploma'))
      credentialKeywords = ['college program', 'college or other program']

    if (credentialKeywords.includes('certificate'))
      credentialKeywords = ['certificate', 'beauty school programs']

    // Matches if all educational requirements are met. Iterating over each educational requirement individually for best results.
    const unitGroupHasCredentialMatch = credentialKeywords.some((keyword) => {
      for (const requirement of educationalRequirements) {
        if (requirement.match(new RegExp(keyword, 'gi'))) {
          return true
        }
      }
    })

    // Add nothing to accumulator and return if there is no keyword his in this unit group.
    if (!unitGroupHasCredentialMatch) return matchedGroups

    const jobs = unitGroup.examples

    // Add each of our job objects to our list of applicable jobs for later use outside this block.
    jobs.forEach((job) => {
      relatedJobs.push({
        noc: unitGroup.noc,
        title: job,
      })
    })

    // Add our unit group to our list of related groups.
    const newMatch = {
      noc: unitGroup.noc,
      title: unitGroup.group,
      duties: unitGroup.duties,
      education: unitGroup.education,
      requirements: unitGroup.requirements,
      experience: unitGroup.experience,
      requires_experience: unitGroup.requires_experience,
    }

    return [...matchedGroups, newMatch]
  }, [])

  return {
    groups: relatedGroups,
    jobs: relatedJobs,
  }
}
