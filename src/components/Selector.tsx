import * as SelectPrimitive from "@radix-ui/react-select";
import { styled } from "@stitches/react";
import { BiCheck, BiChevronDown, BiChevronUp } from "react-icons/bi";

const StyledTrigger = styled(SelectPrimitive.SelectTrigger, {
  all: "unset",
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
  borderRadius: 4,
  padding: "0 15px",
  fontSize: 15,
  textTransform: "capitalize",
  lineHeight: 1,
  height: 35,
  gap: 5,
  backgroundColor: "#697177",
  color: "White",
  boxShadow: `0 2px 10px black`,
  "&:hover": { backgroundColor: "#0072F5" },
  "&:focus": { boxShadow: `0 0 0 2px black` },
  "&[data-placeholder]": { color: "White" },
});

const StyledIcon = styled(SelectPrimitive.SelectIcon, {
  color: "White",
});

const StyledContent = styled(SelectPrimitive.Content, {
  overflow: "auto",
  backgroundColor: "#697177",
  borderRadius: 6,
  zIndex: 40,
  boxShadow:
    "0px 10px 38px -10px rgba(22, 23, 24, 0.35), 0px 10px 20px -15px rgba(22, 23, 24, 0.2)",
});

const StyledViewport = styled(SelectPrimitive.Viewport, {
  padding: 5,
});

interface Props {
  children?: React.ReactNode;
}

const Content = ({ children, ...props }: Props) => {
  return (
    <SelectPrimitive.Portal>
      <StyledContent {...props}>{children}</StyledContent>
    </SelectPrimitive.Portal>
  );
};

const StyledItem = styled(SelectPrimitive.Item, {
  all: "unset",
  fontSize: 15,
  textTransform: "capitalize",
  lineHeight: 1,
  color: "White",
  borderRadius: 3,
  display: "flex",
  alignItems: "center",
  height: 25,
  padding: "0 35px 0 25px",
  position: "relative",
  userSelect: "none",

  "&[data-disabled]": {
    color: "Pink",
    pointerEvents: "none",
  },

  "&[data-highlighted]": {
    backgroundColor: "#0072F5",
    color: "White",
  },
});

const StyledLabel = styled(SelectPrimitive.Label, {
  padding: "0 25px",
  fontSize: 15,
  lineHeight: "25px",
  color: "White",
  fontWeight: "bold",
});

const StyledSeparator = styled(SelectPrimitive.Separator, {
  height: 1,
  backgroundColor: "White",
  margin: 5,
});

const StyledItemIndicator = styled(SelectPrimitive.ItemIndicator, {
  position: "absolute",
  left: 0,
  width: 25,
  display: "inline-flex",
  alignItems: "center",
  justifyContent: "center",
});

const scrollButtonStyles = {
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  height: 25,
  backgroundColor: "#697177",
  color: "White",
  cursor: "default",
};

const StyledScrollUpButton = styled(
  SelectPrimitive.ScrollUpButton,
  scrollButtonStyles
);

const StyledScrollDownButton = styled(
  SelectPrimitive.ScrollDownButton,
  scrollButtonStyles
);

// Exports
const Select = SelectPrimitive.Root;
const SelectTrigger = StyledTrigger;
const SelectValue = SelectPrimitive.Value;
const SelectIcon = StyledIcon;
const SelectContent = Content;
const SelectViewport = StyledViewport;
const SelectGroup = SelectPrimitive.Group;
const SelectItem = StyledItem;
const SelectItemText = SelectPrimitive.ItemText;
const SelectItemIndicator = StyledItemIndicator;
const SelectLabel = StyledLabel;
const SelectSeparator = StyledSeparator;
const SelectScrollUpButton = StyledScrollUpButton;
const SelectScrollDownButton = StyledScrollDownButton;

interface SelectorProps {
  category: string;
  choices: string[];
  value: string;
  onValueChange: (value: string) => void;
}

const Selector = (props: SelectorProps) => {
  return (
    <Select onValueChange={props.onValueChange}>
      <SelectTrigger aria-label={props.category}>
        <SelectValue
          placeholder={props.value ? props.value : `Select a ${props.category}`}
        />
        <SelectIcon>
          <BiChevronDown />
        </SelectIcon>
      </SelectTrigger>
      <SelectContent>
        <SelectScrollUpButton>
          <BiChevronUp />
        </SelectScrollUpButton>
        <SelectViewport>
          <SelectGroup>
            <SelectLabel>{props.category}</SelectLabel>
            <SelectSeparator />
            {props.choices.map((choice, index) => (
              <SelectItem value={choice} key={index}>
                <SelectItemText>{choice}</SelectItemText>
                <SelectItemIndicator>
                  <BiCheck />
                </SelectItemIndicator>
              </SelectItem>
            ))}
          </SelectGroup>
        </SelectViewport>
        <SelectScrollDownButton>
          <BiChevronDown />
        </SelectScrollDownButton>
      </SelectContent>
    </Select>
  );
};

export default Selector;
