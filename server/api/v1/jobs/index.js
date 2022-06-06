import unitGroups from './data/jobs.json'

export default defineEventHandler(async (event) => {
  const body = await useBody(event)
  return {
    test: body,
  }
})
