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

/**
 * Takes in program NID as query parameter. Returns related jobs based on either NOC program search or credential search via api/v1/jobs-by-credential search.
 */
export default defineEventHandler(async (event) => {
  // Query parameter
  const { nid } = useQuery(event) // typeof = string
  // Query parameter error handling
  checkQuery(event, nid)

  let foundResults = false
  let jobResults = []
  let groupResults = []
  let jobCount = 0
  let groupCount = 0
  // Search for program NID in programs middle table
  for (const program of programs) {
    if (program.nid === Number(nid)) {
      foundResults = true

      const { jobs, groups } = await $fetch(
        `/api/v1/jobs-by-credential?credential=${
          program.credential
        }&keywords=${program.noc_search_keywords.join(',')}`
      )
      for (const job of jobs) {
        jobResults.push(job)
        jobCount++
      }
      for (const group of groups) {
        groupResults.push(group)
        groupCount++
      }
    }
  }
  if (foundResults) {
    console.log(
      `Found ${jobCount} jobs in ${groupCount} unit groups for program NID: ${nid}`
    )
    return {
      jobs: Array.from(new Set(jobResults)),
      groups: Array.from(new Set(groupResults)),
    }
  }

  // Respond
  return {
    searched: nid,
  }
})
