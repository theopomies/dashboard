import { IconButton } from "@chakra-ui/button";
import { Heading, HStack, Text, VStack } from "@chakra-ui/layout";
import { BiSkipNext, BiSkipPrevious, BiSquare } from "react-icons/bi";
import {
  ImVolumeHigh,
  ImVolumeLow,
  ImVolumeMedium,
  ImVolumeMute,
  ImVolumeMute2,
} from "react-icons/im";
import { AiFillPlayCircle, AiFillPauseCircle } from "react-icons/ai";
import { JSXElementConstructor, ReactElement, useState } from "react";
import {
  Slider,
  SliderTrack,
  SliderFilledTrack,
  SliderThumb,
} from "@chakra-ui/react";
import { WidgetCard } from "./WidgetCard";

export function SpotifyPlayer() {
  const [playing, setPlaying] = useState(true);
  const [hover, setHover] = useState(false);
  const [focus, setFocus] = useState(false);
  const [muted, setMuted] = useState(false);
  const [volume, setVolume] = useState(50);

  return (
    <WidgetCard rowSpan={2} colSpan={2} minHeight="14rem" name="player">
      <HStack h="100%" w="100%" justify="start" spacing={40}>
        <BiSquare size="10rem" />
        <HStack w="100%" justify="space-between">
          <VStack>
            <Heading size="lg">Titre</Heading>
            <Text color="brand.darkGray">Artiste(s)</Text>
            <HStack>
              <IconButton
                bg="transparent"
                color="brand.darkGray"
                _hover={{ bg: "transparent", color: "black" }}
                aria-label="previous"
                icon={<BiSkipPrevious size="2rem" />}
              />
              <IconButton
                onClick={() => setPlaying((playing) => !playing)}
                aria-label="pause/resume"
                bg="transparent"
                _hover={{ bg: "transparent", transform: "scale(1.05)" }}
                icon={
                  playing ? (
                    <AiFillPauseCircle size="3rem" />
                  ) : (
                    <AiFillPlayCircle size="3rem" />
                  )
                }
              />
              <IconButton
                bg="transparent"
                color="brand.darkGray"
                _hover={{ bg: "transparent", color: "black" }}
                aria-label="next"
                icon={<BiSkipNext size="2rem" />}
              />
            </HStack>
          </VStack>
          <HStack
            padding="1rem"
            onMouseEnter={() => setHover(true)}
            onMouseLeave={() => setHover(false)}
            w="10rem"
          >
            <IconButton
              aria-label="volume logo"
              icon={getVolumeIcon(volume, muted)}
              onClick={() => setMuted((muted) => !muted)}
              color="brand.darkGray"
              bg="transparent"
              _hover={{ bg: "transparent", color: "black" }}
            />
            <Slider
              aria-label="spotify volume"
              defaultValue={50}
              value={muted ? 0 : volume}
              onChange={(e) => {
                setVolume(e), setMuted(false);
              }}
              onFocus={() => setFocus(true)}
              onBlur={() => {
                setFocus(false);
              }}
            >
              <SliderTrack>
                <SliderFilledTrack
                  bg={hover || focus ? "brand.spotify" : "brand.lightGray"}
                />
              </SliderTrack>
              {(hover || focus) && <SliderThumb />}
            </Slider>
          </HStack>
        </HStack>
      </HStack>
    </WidgetCard>
  );
}

function getVolumeIcon(
  volume: number,
  muted: boolean
): ReactElement<any, string | JSXElementConstructor<any>> {
  const props = {
    size: "1.5rem",
  };
  if (muted) return <ImVolumeMute2 {...props} />;
  if (volume < 10) return <ImVolumeMute {...props} />;
  if (volume < 30) return <ImVolumeLow {...props} />;
  if (volume < 70) return <ImVolumeMedium {...props} />;
  return <ImVolumeHigh {...props} />;
}
