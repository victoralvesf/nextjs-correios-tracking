import rastrojs from 'rastrojs'

type TracksType = {
  locale: string;
  status: string;
  observation: string | null;
  trackedAt: string;
}

export type TrackType = {
  isInvalid?: boolean | null;
  error?: string;
  code: string;
  type: string;
  tracks: TracksType[];
  isDelivered: boolean;
  postedAt: string;
  updatedAt: string;
}

function capitalize(s: string) {
  if (typeof s !== 'string') return s
  return s.charAt(0).toUpperCase() + s.slice(1)
}

function capitalizeFirstLetters(s: string) {
  const words = s.split(' ')

  for(let i = 0; i < words.length; i++) {
    words[i] = capitalize(words[i])
  }

  return words.join(' ')
}

function formatLocale(locale: string) {
  let words = locale.trim()
  const length = words.length

  if (words[length - 1] === '/') {
    words = capitalize(words.substring(0, length - 2))
  } else {
    words = capitalize(words)
    words = words.substring(0, length - 2) + words.slice(length - 2).toUpperCase()
  }

  return words
}

function formatDate(data: Date) {
  const date = new Date(data).toLocaleString('pt-BR')

  return date.split(' ').join(' - ')
}

export async function getPackageStatus(code: string) {
  const [track] = await rastrojs.track(code)

  if (track.isInvalid) {
    return track
  }

  const tracks = track.tracks.map(item => {
    const { locale, observation, status } = item

    return {
      locale: formatLocale(locale),
      observation: capitalize(observation),
      status: capitalize(status),
      trackedAt: formatDate(item.trackedAt)
    }
  })

  return {
    code: track.code,
    type: capitalizeFirstLetters(track.type),
    tracks: tracks.reverse(),
    isDelivered: track.isDelivered,
    postedAt: formatDate(track.postedAt),
    updatedAt: formatDate(track.updatedAt)
  }
}