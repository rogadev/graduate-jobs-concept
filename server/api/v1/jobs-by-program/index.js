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

  return {
    searched: nid,
  }
})
