/**
 * @api: api/v1/jobs-by-program
 * @author: Ryan Roga (www.roga.dev), Vancouver Island University (www.VIU.ca)
 * @license: None
 * @description: /jobs-by-program route for graduate jobs project.
 * @since: June 22, 2022
 */

// For use in error handling
import { sendError, createError } from 'h3'

// Programs "middle" table
import programs from '../../../data/programs.json'

/**
 * Handles errors in query parameter. Uses H3's error creation/handling to
 * respond with errors if found.
 * @param {CompatibilityEvent} event Nuxt's compatibility event object.
 * @param {String} query NID query to validate.
 */
const checkQuery = (event, query) => {
  let foundError = false
  const errorMessages = []
  // Handle missing query parameters
  if (!query) {
    foundError = true
    errorMessages.push('Query was not correctly sent with request.')
  }
  // Handle empty query parameters
  if (query === '') {
    foundError = true
    errorMessages.push('No NID provided in query parameters.')
  }
  // Handle query parameter type errors
  if (typeof query !== 'string') {
    foundError = true
    errorMessages.push('NID in query parameters is not of type String.')
  }
  // Handle parsing as number (should contain number)
  if (Number.isNaN(Number(query))) {
    foundError = true
    errorMessages.push(
      `Query parameter not valid, receiving (nid: '${query}'). Expects string to contain a number, only (YES '123' | NO '123A').`
    )
  }
  // If error(s), send error(s)
  if (foundError) {
    sendError(
      event,
      createError({
        statusCode: 400,
        statusMessage: errorMessages.join(' '),
        debug: false,
      })
    )
  }
}

const searchWithKeywords = async (credential, keywords, duration = false) => {
  console.log(
    'Searching jobs-by-credential for: ',
    credential,
    typeof keywords,
    duration
  )
  const { jobs, groups } = await $fetch(
    `/api/v1/jobs-by-credential?credential=${credential}&keywords=${keywords.join(
      ','
    )}`
  )
  return { jobs, groups }
}

/**
 * Takes in program NID as query parameter. Returns related jobs based on either NOC program search or credential search via api/v1/jobs-by-credential search.
 */
export default defineEventHandler(async (event) => {
  // Used to check query response times.
  const startTime = Date.now()
  // Query parameter
  const { nid } = useQuery(event) // typeof = string
  // Query parameter error handling
  checkQuery(event, nid)

  // ----------------------------------------------------------------
  let foundResults = false
  let jobResults = []
  let groupResults = []
  let jobCount = 0
  let groupCount = 0
  // ----------------------------------------------------------------

  // Find the program that matches the searched NID
  const program =
    programs.find((program) => program.nid === Number(nid)) ?? false

  // If no program found, return 404 not found
  if (!program) {
    sendError(
      event,
      createError({
        statusCode: 404,
        statusMessage: `No program found with NID: ${nid}. This may be because this NID is invalid, or it has not yet been connected to valid job searches. Contact web department for details.`,
        debug: false,
      })
    )
    // Log out the time it took to hit the error and return
    console.log('Returned in:', Date.now() - startTime, 'ms')
    return
  }
  // If program found, continue
  else {
    // Search for jobs and unit groups based on program search parameters
    const { jobs, groups } = await searchWithKeywords(
      program.credential,
      program.noc_search_keywords,
      program.duration
    )
    // add all jobs to jobResults
    for (const job of jobs) {
      foundResults = true
      jobResults.push(job)
      jobCount++
    }
    // add all groups to groupResults
    for (const group of groups) {
      foundResults = true
      groupResults.push(group)
      groupCount++
    }
  }
  // If we have found results, return them
  if (foundResults) {
    // Log out the time it took to find the results and return
    console.log(
      `Returned ${jobCount} jobs in ${groupCount} unit groups for program NID: ${nid} in:`,
      Date.now() - startTime,
      'ms'
    )
    return {
      jobs: Array.from(new Set(jobResults)),
      groups: Array.from(new Set(groupResults)),
    }
  }

  // Something unexpected went wrong if we're hitting this error
  console.log('Returned in:', Date.now() - startTime, 'ms')
  return sendError(
    createError({
      statusCode: 500,
      statusMessage: `Something went wrong searching for nid ${nid}.`,
      debug: true,
    })
  )
})
