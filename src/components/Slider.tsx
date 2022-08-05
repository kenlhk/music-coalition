import { styled, Text } from "@nextui-org/react";
import * as SliderPrimitive from "@radix-ui/react-slider";

const StyledSlider = styled(SliderPrimitive.Root, {
  position: "relative",
  display: "flex",
  alignItems: "center",
  userSelect: "none",
  touchAction: "none",
  width: 200,

  '&[data-orientation="horizontal"]': {
    height: 20,
  },

  '&[data-orientation="vertical"]': {
    flexDirection: "column",
    width: 20,
    height: 100,
  },
});

const StyledTrack = styled(SliderPrimitive.Track, {
  backgroundColor: "#697177",
  position: "relative",
  flexGrow: 1,
  borderRadius: "9999px",

  '&[data-orientation="horizontal"]': { height: 3 },
  '&[data-orientation="vertical"]': { width: 3 },
});

const StyledRange = styled(SliderPrimitive.Range, {
  position: "absolute",
  backgroundColor: "white",
  borderRadius: "9999px",
  height: "100%",
});

const StyledThumb = styled(SliderPrimitive.Thumb, {
  all: "unset",
  display: "block",
  width: 20,
  height: 20,
  backgroundColor: "white",
  boxShadow: `0 2px 10px grey`,
  borderRadius: 10,
  "&:hover": { backgroundColor: "#0072F5" },
  "&:focus": { boxShadow: `0 0 0 5px black` },
});

interface SliderProps {
  value: number[];
  onValueChange: (value: number[]) => void;
  label?: string;
}

const Slider = (props: SliderProps) => {
  return (
    <div className="flex flex-col w-[200px]">
      <div className="flex justify-between">
        {props.label && <Text>{props.label}</Text>}
        <Text>{props.value[0]}</Text>
      </div>
      <div>
        <StyledSlider
          defaultValue={[50]}
          value={props.value}
          max={100}
          step={1}
          aria-label="Volume"
          onValueChange={props.onValueChange}
        >
          <StyledTrack>
            <StyledRange />
          </StyledTrack>
          <StyledThumb />
        </StyledSlider>
      </div>
    </div>
  );
};

export default Slider;
