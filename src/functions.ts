/**
 * Function to return an error to the user
 * @param {Error} Error object from try/catch
 * @param {number} HTTP status code to return to user
 * @return {Response} Response to be sent to browser
 */
export function returnError(e: Error, status: number): Response {
  return new Response(
    JSON.stringify({
      Status: status,
      Message: e.message,
      ShortUrl: null,
    }),
    {
      status: status,
      statusText: 'Server error',
      headers: { 'Content-Type': 'application/json' },
    },
  )
}

export function getHeaders(request: Request): string {
  return JSON.stringify({
    ip: request.headers.get('CF-Connecting-IP') || '',
    ray: request.headers.get('CF-RAY') || '',
    country: request.headers.get('CF-IPCountry') || '',
  })
}

export async function addLocation(
  key: string,
  data: string,
  metadata: JSON,
): Promise<void> {
  const secondsFromNow = 86400
  return LOCATIONS.put(key, data, {
    expirationTtl: secondsFromNow,
    metadata: JSON.stringify(metadata),
  })
}

export async function getLocation(time: Date): Promise<string | null> {
  const timestamp = time.toString()
  return LOCATIONS.get(timestamp, { type: 'text' })
}

import GeoJSON from 'geojson'
export async function getGeoData(): Promise<typeof GeoJSON> {
  // Get all the previous visitors
  const allKV = await LOCATIONS.list()

  const data: Array<object> = []

  allKV.keys.forEach((row) => {
    const meta = JSON.parse(row.metadata as string)
    data.push(meta)
  })

  // @ts-ignore
  return GeoJSON.parse(data)
}
