import { SroCorreios, Tracking } from 'sro-correios'

export type TrackingType = {
  code: string
  category?: {
    name: string | undefined
    description: string | undefined
  }
  events?: {
    locality: string | null
    status: string
    origin: string
    destination: string | null
    trackedAt: string
  }[]
  isDelivered?: boolean
  postedAt?: string
  updatedAt?: string
  isInvalid?: boolean
  error?: string
}

function formatDate(data: Date) {
  const date = new Date(data).toLocaleString('pt-BR')

  return date.split(' ').join(' - ')
}

export async function getPackageStatus(code: string): Promise<TrackingType | Tracking> {
  const correios = new SroCorreios()

  const [track] = await correios.track(code)

  if (track.isInvalid) {
    return track
  }

  const tracks = track.events.map(event => {
    return {
      ...event,
      trackedAt: formatDate(event.trackedAt)
    }
  })

  return {
    ...track,
    postedAt: formatDate(track.postedAt),
    updatedAt: formatDate(track.updatedAt),
    events: tracks
  }
}