import ToggleButton from "@suid/material/ToggleButton";
import ToggleButtonGroup from "@suid/material/ToggleButtonGroup";
import Circle from "@suid/icons-material/Circle";
import RoundedCorner from "@suid/icons-material/RoundedCorner";
import RoundedCornerRounded from "@suid/icons-material/RoundedCornerRounded";
import RoundedCornerSharp from "@suid/icons-material/RoundedCornerSharp";
import HorizontalIcon from "@suid/icons-material/AlignHorizontalCenterRounded";
import VerticalIcon from "@suid/icons-material/AlignVerticalCenterRounded";
import styles from "./App.module.css";
import {
  customBorderRadius,
  customButtonColor,
  customSocialLayout,
  customTheme,
  setCustomBorderRadius,
  setCustomButtonColor,
  setCustomSocialLayout,
  setCustomTheme,
} from "./store";
import Logo from "../logo.svg";
import { MaterialUISwitch } from "./muiswitch";
import { createEffect } from "solid-js";

function Selectors() {
  return (
    <div class={styles["selectors-container"]}>
      <h2>Auth UI Solid.js</h2>
      <p>
        Customizable authentication UI component with custom themes and
        extensible styles to match your brand and aesthetic
      </p>
      <div class={styles.solidrow}>
        <img src={Logo} alt="Solid.js Logo" height={32} />
        <p>
          Currently available in Solid.js and{" "}
          <a href="https://supabase.com/docs/guides/auth/auth-helpers/auth-ui#predefined-themes">
            React
          </a>
        </p>
      </div>
      <div class={styles["toggles-grid"]}>
        <ColorToggles />
        <RadiusToggles />
        <AlignmentToggles />
      </div>
    </div>
  );
}

function ThemeToggle() {
  function handleToggle() {
    setCustomTheme((prev) => {
      return prev === "dark" ? "default" : "dark";
    });
  }


  return (
    <div>
      <h5>UI Theme</h5>
      <MaterialUISwitch
        checked={customTheme() === "dark" ? true : false}
        onChange={handleToggle}
      />
    </div>
  );
}

function AlignmentToggles() {
  function handleChange(e: MouseEvent, newAlignment: string) {
    if (newAlignment !== null) {
      setCustomSocialLayout(newAlignment);
    }
  }

  return (
    <div>
      <h5>Social Auth Layout</h5>
      <ToggleButtonGroup
        value={customSocialLayout()}
        onChange={handleChange}
        exclusive
      >
        <ToggleButton value={socialAlignment.horizontal}>
          <VerticalIcon style={{ color: "white" }} />
        </ToggleButton>
        <ToggleButton value={socialAlignment.vertical}>
          <HorizontalIcon style={{ color: "white" }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function RadiusToggles() {
  function handleChange(e: MouseEvent, newRadius: string) {
    if (newRadius !== null) {
      setCustomBorderRadius(newRadius);
    }
  }
  return (
    <div>
      <h5>Rounded Corners</h5>
      <ToggleButtonGroup
        value={customBorderRadius()}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value={radii.small}>
          <RoundedCornerSharp style={{ color: "white" }} />
        </ToggleButton>
        <ToggleButton value={radii.medium}>
          <RoundedCorner style={{ color: "white" }} />
        </ToggleButton>
        <ToggleButton value={radii.large}>
          <RoundedCornerRounded style={{ color: "white" }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

function ColorToggles() {
  function handleChange(e: MouseEvent, newColor: string) {
    if (newColor !== null) {
      setCustomButtonColor(newColor);
    }
  }

  return (
    <div>
      <h5>Brand Color</h5>
      <ToggleButtonGroup
        value={customButtonColor()}
        exclusive
        onChange={handleChange}
      >
        <ToggleButton value={colors.red}>
          <Circle style={{ color: colors.red }} />
        </ToggleButton>
        <ToggleButton value={colors.green}>
          <Circle style={{ color: colors.green }} />
        </ToggleButton>
        <ToggleButton value={colors.blue}>
          <Circle style={{ color: colors.blue }} />
        </ToggleButton>
        <ToggleButton value={colors.orange}>
          <Circle style={{ color: colors.orange }} />
        </ToggleButton>
      </ToggleButtonGroup>
    </div>
  );
}

export default Selectors;

const colors = {
  red: "rgb(202, 37, 37)",
  green: "rgb(65, 163, 35)",
  blue: "rgb(8, 107, 177)",
  orange: "rgb(235, 115, 29)",
};

const radii = {
  small: "5px",
  medium: "10px",
  large: "20px",
};

const socialAlignment = {
  horizontal: "horizontal",
  vertical: "vertical",
};

const theme = {
  light: "light",
  dark: "dark",
};
