import { css } from "@stitches/core";
import { generateClassNames } from "../../../common/theming";
import { CLASS_NAMES } from "../../constants";
import { Appearance } from "../../types";
import { JSXElement, JSX, Component } from "solid-js";

const dividerDefaultStyles = css({
  background: "$dividerBackground",
  display: "block",
  margin: "16px 0",
  height: "1px",
  width: "100%",
});

interface DividerProps extends JSX.HTMLAttributes<HTMLDivElement> {
  appearance?: Appearance;
}

const Divider: Component<DividerProps> = (props) => {
  const classNames = generateClassNames(
    "divider",
    dividerDefaultStyles(),
    props.appearance
  );

  return (
    <div
      {...props}
      style={props.appearance?.style?.divider}
      class={classNames.join(" ")}
    />
  );
};

export { Divider };
