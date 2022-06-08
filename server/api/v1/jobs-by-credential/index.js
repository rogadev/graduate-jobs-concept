// Bring in unit groups (316 groups)
import unitGroups from '../data/jobs.json'

/**
 * Event hanlder for the jobs-by-credential endpoint.
 */
export default defineEventHandler(async (event) => {
  const query = useQuery(event) //  duration?, credential, [keywords]

  const search = {}

  if (query.duration) {
    // we are searching for duration AND credential AND 1 or more keywords
    search.duration = query.duration
    search.credential = query.credential
    search.keywords = new Array(query.keywords)
  } else {
    // we are searching only for credential AND 1 or more keywords
    search.credential = query.credential
    search.keywords = new Array(query.keywords)
  }

  const relatedGroups = findRelatedUnitGroups(
    search.credential,
    search.keywords,
    search.duration
  )

  // TODO - Search through relatedGroups, get an array of related job objects including job titles and noc codes.

  // TODO - Return our results object
})

/**
 *
 * @param {String} credential
 * @param {Array<String>} keywords
 * @param {String} duration
 */
function findRelatedUnitGroups(credential, keywords, duration = false) {
  // TODO - Search unitGroups for related credential and any match of one or ore keywords.
  // TODO - If searching for duration, filter found unitGroups for related duration. Add to results.
}
