import { addLocation, getHeaders } from './functions'
import html from './html'
export async function handleRequest(request: Request): Promise<Response> {
  const timestamp = new Date().toISOString()
  const headers = JSON.parse(getHeaders(request))

  // Save the current vistor to KV
  await addLocation(headers.ray, timestamp, headers)

  const body = await html
  return new Response(body, {
    headers: {
      'content-type': 'text/html;charset=UTF-8',
    },
  })
}
