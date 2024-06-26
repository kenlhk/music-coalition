import { styled } from "@nextui-org/react";
import * as TabsPrimitive from "@radix-ui/react-tabs";

const StyledTabs = styled(TabsPrimitive.Root, {
  display: "flex",
  flexDirection: "column",
  width: "100%",
});

const StyledList = styled(TabsPrimitive.List, {
  flexShrink: 0,
  display: "flex",
  // borderBottom: `1px solid #0072F5`,
});

const StyledTrigger = styled(TabsPrimitive.Trigger, {
  all: "unset",
  fontFamily: "inherit",
  backgroundColor: "#697177",
  padding: "0 20px",
  height: 45,
  flex: 1,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: 15,
  lineHeight: 1,
  userSelect: "none",
  "&:first-child": { borderTopLeftRadius: 20 },
  "&:last-child": { borderTopRightRadius: 20 },
  // "&:hover": { backgroundColor: "#EAF4FF" },
  "&[data-state='active']": {
    backgroundColor: "#0072F5",
    // border: "solid 2px #FFFFFF",
  },
});

const StyledContent = styled(TabsPrimitive.Content, {
  flexGrow: 1,
  padding: 20,
  backgroundColor: "#16181A",
  borderBottomLeftRadius: 20,
  borderBottomRightRadius: 20,
  outline: "none",
});

export const Tabs = StyledTabs;
export const TabsList = StyledList;
export const TabsTrigger = StyledTrigger;
export const TabsContent = StyledContent;
