import { useEffect, useRef, useState } from "react";
import "../styles/DemoVideo.css";

const PORTRAIT_QUERY = "(max-width: 640px)";
const assetBase = import.meta.env.BASE_URL + "demo/";
const cuts = {
  portrait: {
    video: assetBase + "manzil-demo-portrait.mp4",
    poster: assetBase + "manzil-demo-portrait.webp",
  },
  landscape: {
    video: assetBase + "manzil-demo-landscape.mp4",
    poster: assetBase + "manzil-demo-landscape.webp",
  },
};

export default function DemoVideo() {
  const player = useRef(null);
  const playButton = useRef(null);
  const [cut, setCut] = useState(null);
  const [playbackFailed, setPlaybackFailed] = useState(false);
  const showPlayer = cut !== null && !playbackFailed;

  useEffect(() => {
    if (showPlayer) player.current.focus({ preventScroll: true });
    if (playbackFailed) playButton.current.focus({ preventScroll: true });
  }, [showPlayer, playbackFailed]);

  const play = () => {
    // Keep the chosen edit and playback position even if the device rotates.
    const selected = cut ?? (matchMedia(PORTRAIT_QUERY).matches ? "portrait" : "landscape");
    const video = player.current;
    setCut(selected);
    setPlaybackFailed(false);
    video.src = cuts[selected].video;
    video.play().catch((error) => {
      // Leave the native play control available if the browser blocks scripted playback.
      if (error.name !== "NotAllowedError" && error.name !== "AbortError") {
        setPlaybackFailed(true);
      }
    });
  };

  return (
    <section className="demo-video" id="demo-video" tabIndex={-1} aria-labelledby="demo-video-title">
      <h2 id="demo-video-title">See Manzil AI in action</h2>
      <div className="demo-video__frame" data-cut={cut}>
        {!showPlayer && (
          <button className="demo-video__trigger" type="button" ref={playButton} onClick={play}>
            <picture>
              {!cut && <source media={PORTRAIT_QUERY} srcSet={cuts.portrait.poster} />}
              <img src={cuts[cut ?? "landscape"].poster} alt="" loading="lazy" />
            </picture>
            <span className="demo-video__play">{playbackFailed ? "Try again" : "Play demo"}</span>
          </button>
        )}
        <video
          ref={player}
          controls
          playsInline
          preload="none"
          hidden={!showPlayer}
          tabIndex={0}
          aria-label="Manzil AI demo video"
          onError={() => setPlaybackFailed(true)}
        />
      </div>
      {playbackFailed && (
        <p className="demo-video__error" role="status">
          The video couldn’t load. You can try again or <a href="#how">view the interactive example</a>.
        </p>
      )}
    </section>
  );
}
