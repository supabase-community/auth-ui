import { css } from "@stitches/core";
import { generateClassNames } from "../../../common/theming";
import { CLASS_NAMES, PREPENDED_CLASS_NAMES } from "../../constants";
import { Appearance, SocialButtonSize, SocialLayout } from "../../types";
import { JSXElement, JSX, Component, createMemo } from "solid-js";

const containerDefaultStyles = css({
  display: "flex",
  gap: "4px",
  variants: {
    direction: {
      horizontal: {
        flexDirection: "row",
        margin: "4px 0",
      },
      vertical: {
        flexDirection: "column",
        margin: "8px 0",
      },
    },
    gap: {
      small: {
        gap: "4px",
      },
      medium: {
        gap: "8px",
      },
      large: {
        gap: "16px",
      },
    },
  },
});

export interface ContainerProps extends JSX.HTMLAttributes<HTMLDivElement> {
  children: JSXElement;
  direction?: "horizontal" | "vertical" | SocialLayout | string;
  gap?: "small" | "medium" | "large";
  appearance?: Appearance;
}

const Container: Component<ContainerProps> = (props) => {
  const classNames = createMemo(() =>
    generateClassNames(
      "container",
      containerDefaultStyles({
        direction: props.direction as "horizontal" | "vertical",
        gap: props.gap,
      }),
      props.appearance
    )
  );

  return (
    <div
      {...props}
      style={props.appearance?.style?.container}
      class={classNames().join(" ")}
    >
      {props.children}
    </div>
  );
};

export { Container };
