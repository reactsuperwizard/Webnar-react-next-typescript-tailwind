import { useEffect, useRef, useState } from "react";
import tw, { styled } from "twin.macro";

import ArrowImage from "../../assets/img/arrow.svg";
import ArrowRightImage from "../../assets/img/arrow-right.svg";
import { useAmpli } from "context";

type AdVideoProps = {
  pause?: boolean;
  videoId?: string;
};

export const AdVideo = ({ pause, videoId }: AdVideoProps) => {
  const videoRef = useRef(false);
  const ampli = useAmpli();

  useEffect(() => {
    if (pause) {
      document.getElementsByTagName("video")?.[0]?.pause();
    } else {
      document.getElementsByTagName("video")?.[0]?.play();
      videoRef.current = true;
    }
  }, [pause]);

  const onClickVideo = () => {
    if (!document.getElementsByTagName("video")?.[0]?.paused) {
      ampli.client.track({
        event_type: "play video",
        event_properties: {
          video_type: "lead_magnet",
          video_id: videoId,
        },
      });
    } else {
      ampli.client.track({
        event_type: "pause video",
        event_properties: {
          video_type: "lead_magnet",
          video_id: videoId,
        },
      });
    }
  };

  if (!videoId) return <div>No Video</div>;

  return (
    <VideoWrapper>
      <script
        src={`https://fast.wistia.com/embed/medias/${videoId}.jsonp`}
        async
      />
      <script
        charSet="ISO-8859-1"
        src="https://fast.wistia.com/assets/external/E-v1.js"
        async
      />

      <div
        className={`wistia_embed wistia_async_${videoId} videoFoam=true`}
        tw="min-h-[300px]"
        onClick={onClickVideo}
      />

      {/* Start Custom Play Button */}
      <div tw="absolute bottom-0 hidden">
        <div tw="flex justify-between">
          <ArrowImage />
          <ArrowRightImage />
        </div>
        <TitleWrapper>Click Here to Start the video</TitleWrapper>
      </div>
      {/* End Custom Play Button */}
    </VideoWrapper>
  );
};

const VideoWrapper = styled.div`
  ${tw`relative mx-auto overflow-hidden md:max-w-3xl rounded-xl`}

  filter: drop-shadow(0px 50px 75px rgba(139, 105, 197, 0.3));
  box-shadow: rgb(255 255 255 / 45%) 0px 0px 0px 3px,
    rgb(129 126 251 / 25%) 0px 1px 3px, rgb(98 70 234 / 29%) 0px 11px 24px -9px;
  & .w-video-wrapper {
    background: none !important;
  }
`;

const TitleWrapper = styled.div`
  ${tw`text-4xl font-normal leading-[150%]`}
  font-family: 'Rock Salt', cursive;
`;
