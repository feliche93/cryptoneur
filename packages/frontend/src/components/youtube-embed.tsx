import { FC } from 'react'
import LiteYouTubeEmbed from 'react-lite-youtube-embed'
import 'react-lite-youtube-embed/dist/LiteYouTubeEmbed.css'

export interface YouTubeEmbedProps {
  id: string
  adNetwork?: boolean
  params?: string
  playlist?: boolean
  playlistCoverId?: string
  poster?: 'hqdefault' | 'mqdefault' | 'sddefault' | 'maxresdefault'
  title: string
  noCookie?: boolean
}
export const YouTubeEmbed: FC<YouTubeEmbedProps> = ({
  id,
  title,
  adNetwork = true,
  params,
  playlist = false,
  playlistCoverId,
  poster = 'maxresdefault',
  noCookie = true,
}) => {
  return (
    <div className="my-4">
      <LiteYouTubeEmbed
        id={id}
        adNetwork={adNetwork}
        params={params}
        playlist={playlist}
        playlistCoverId={playlistCoverId}
        poster={poster}
        title={title}
        noCookie={noCookie}
      />
    </div>
  )
}
