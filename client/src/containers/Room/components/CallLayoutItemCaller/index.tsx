import { FC, useEffect, useRef, memo } from "react";
import { useSelector } from "react-redux";
import useResize from "use-resize-observer";
import Tooltip from "react-tooltip";
import { Mic, MicOff, Maximize } from "react-feather";

import {
  CallLayoutItemWrapper,
  CallLayoutItemDetails,
  CallLayoutItemAvatarVoiceDetect,
  CallLayoutItemAvatar,
  CallLayoutItemAvatarImg,
  CallLayoutItemNameWrapper,
  CallLayoutItemName,
  CallLayoutItemNameMic,
  CallLayoutItemVideoWrapper,
  CallLayoutItemVideo,
  CallLayoutItemVideoOverlay,
  CallLayoutItemVideoOverlayButton,
} from "../CallLayoutItem/styled";

import { RootState } from "../../../../store";
import { User } from "../../../../types/User";

interface PropTypes {
  user: User;
  videoStream: MediaStream | undefined;
}

const CallLayoutItemCaller: FC<PropTypes> = ({
  user,
  videoStream,
}: PropTypes) => {
  const { ref, width = 0, height = 0 } = useResize();
  const videoRef = useRef<HTMLVideoElement>(null);

  const status = useSelector((state: RootState) => state.room.status);

  function fullScreen() {
    if (videoRef.current) {
      videoRef.current.requestFullscreen();
    }
  }

  useEffect(() => {
    if (videoRef.current) {
      if (videoStream) {
        videoRef.current.srcObject = videoStream;
        videoRef.current.play();
      } else {
        videoRef.current.srcObject = null;
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [videoStream]);

  return (
    <CallLayoutItemWrapper ref={ref}>
      <CallLayoutItemDetails video={status.camera || status.shareScreen}>
        <CallLayoutItemAvatarVoiceDetect>
          <CallLayoutItemAvatar width={width} height={height}>
            <CallLayoutItemAvatarImg src={user.avatar} />
          </CallLayoutItemAvatar>
        </CallLayoutItemAvatarVoiceDetect>
      </CallLayoutItemDetails>

      <CallLayoutItemVideoWrapper video={status.camera || status.shareScreen}>
        <CallLayoutItemVideo controls={false} ref={videoRef} muted autoPlay />
        {status.shareScreen && (
          <>
            <CallLayoutItemVideoOverlay>
              <CallLayoutItemVideoOverlayButton
                data-tip="Full screen"
                onClick={fullScreen}
              >
                <Maximize />
              </CallLayoutItemVideoOverlayButton>
              <Tooltip place="top" type="dark" effect="solid" />
            </CallLayoutItemVideoOverlay>
          </>
        )}
      </CallLayoutItemVideoWrapper>

      <CallLayoutItemNameWrapper data-tip={user.name}>
        <CallLayoutItemName>{user.name}</CallLayoutItemName>
        <CallLayoutItemNameMic>
          {status.audio ? <Mic size={14} /> : <MicOff size={14} />}
        </CallLayoutItemNameMic>
      </CallLayoutItemNameWrapper>
      <Tooltip place="top" type="dark" effect="solid" />
    </CallLayoutItemWrapper>
  );
};

export default memo(CallLayoutItemCaller);
