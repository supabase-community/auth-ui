import * as React from 'react';
import { themes, ThemeVars } from '@storybook/theming';
import { IconButton } from '@storybook/components';
import {
  STORY_CHANGED,
  SET_STORIES,
  DOCS_RENDERED
} from '@storybook/core-events';
import { API, useParameter } from '@storybook/api';
import equal from 'fast-deep-equal';
import {
  DARK_MODE_EVENT_NAME,
  UPDATE_DARK_MODE_EVENT_NAME
} from './constants';

import Sun from './icons/Sun';
import Moon from './icons/Moon';

const modes = ['light', 'dark'] as const;
type Mode = typeof modes[number];

interface DarkModeStore {
  /** The class target in the preview iframe */
  classTarget: string;
  /** The current mode the storybook is set to */
  current: Mode;
  /** The dark theme for storybook */
  dark: ThemeVars;
  /** The dark class name for the preview iframe */
  darkClass: string;
  /** The light theme for storybook */
  light: ThemeVars;
  /** The light class name for the preview iframe */
  lightClass: string;
  /** Apply mode to iframe */
  stylePreview: boolean;
}

const STORAGE_KEY = 'sb-addon-themes-3';
export const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

const defaultParams: Required<Omit<DarkModeStore, 'current'>> = {
  classTarget: 'body',
  dark: themes.dark,
  darkClass: 'dark',
  light: themes.light,
  lightClass: 'light',
  stylePreview: false,
};

/** Persist the dark mode settings in localStorage */
export const updateStore = (newStore: DarkModeStore) => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(newStore));
};

/** Add the light/dark class to an element */
const toggleDarkClass = (el: HTMLElement, { current, darkClass = defaultParams.darkClass, lightClass = defaultParams.lightClass }: DarkModeStore) => {
  if (current === 'dark') {
    el.classList.add(darkClass);
    el.classList.remove(lightClass);
  } else {
    el.classList.add(lightClass);
    el.classList.remove(darkClass);
  }
}

/** Update the preview iframe class */
const updatePreview = (store: DarkModeStore) => {
  const iframe = document.getElementById('storybook-preview-iframe') as HTMLIFrameElement;

  if (!iframe) {
    return;
  }

  const iframeDocument = iframe.contentDocument || iframe.contentWindow?.document;
  const target = iframeDocument?.querySelector(store.classTarget) as HTMLElement;

  if (!target) {
    return;
  }

  toggleDarkClass(target, store);
};

/** Update the manager iframe class */
const updateManager = (store: DarkModeStore) => {
  const manager = document.querySelector('body');

  if (!manager) {
    return;
  }

  toggleDarkClass(manager, store)
};

/** Update changed dark mode settings and persist to localStorage  */
export const store = (userTheme: Partial<DarkModeStore> = {}): DarkModeStore => {
  const storedItem = window.localStorage.getItem(STORAGE_KEY);

  if (typeof storedItem === 'string') {
    const stored: DarkModeStore = JSON.parse(storedItem);

    if (userTheme) {
      if (userTheme.dark && !equal(stored.dark, userTheme.dark)) {
        stored.dark = userTheme.dark;
        updateStore(stored);
      }

      if (userTheme.light && !equal(stored.light, userTheme.light)) {
        stored.light = userTheme.light;
        updateStore(stored);
      }
    }

    return stored;
  }

  return { ...defaultParams, ...userTheme } as DarkModeStore;
};

interface DarkModeProps {
  /** The storybook API */
  api: API;
}

/** A toolbar icon to toggle between dark and light themes in storybook */
export const DarkMode = ({ api }: DarkModeProps) => {
  const [isDark, setDark] = React.useState(prefersDark.matches);
  const darkModeParams = useParameter<Partial<DarkModeStore>>('darkMode', {});
  const { current: defaultMode, stylePreview, ...params } = darkModeParams

  const channel = api.getChannel();

  // Save custom themes on init
  const initialMode = React.useMemo(() => store(params).current, [params]);

  /** Set the theme in storybook, update the local state, and emit an event */
  const setMode = React.useCallback(
    (mode: Mode) => {
      const currentStore = store();
      api.setOptions({ theme: currentStore[mode] });
      setDark(mode === 'dark');
      api.getChannel().emit(DARK_MODE_EVENT_NAME, mode === 'dark');
      updateManager(currentStore)

      if (stylePreview) {
        updatePreview(currentStore);
      }
    },
    [api, stylePreview]
  );

  /** Update the theme settings in localStorage, react, and storybook */
  const updateMode = React.useCallback(
    (mode?: Mode) => {
      const currentStore = store();
      const current =
        mode || (currentStore.current === 'dark' ? 'light' : 'dark');

      updateStore({ ...currentStore, current });
      setMode(current);
    },
    [setMode]
  );

  /** Update the theme based on the color preference */
  function prefersDarkUpdate(event: MediaQueryListEvent) {
    updateMode(event.matches ? 'dark' : 'light');
  }

  /** Render the current theme */
  const renderTheme = React.useCallback(()  => {
    const { current = 'light' } = store();
    setMode(current);
  }, [setMode])

  /** When storybook params change update the stored themes */
  React.useEffect(() => {
    const currentStore = store();

    updateStore({ ...currentStore, ...darkModeParams });
    renderTheme()
  }, [darkModeParams, renderTheme])

  React.useEffect(() => {
    channel.on(STORY_CHANGED, renderTheme);
    channel.on(SET_STORIES, renderTheme);
    channel.on(DOCS_RENDERED, renderTheme);
    prefersDark.addListener(prefersDarkUpdate);

    return () => {
      channel.removeListener(STORY_CHANGED, renderTheme);
      channel.removeListener(SET_STORIES, renderTheme);
      channel.removeListener(DOCS_RENDERED, renderTheme);
      prefersDark.removeListener(prefersDarkUpdate);
    };
  });

  React.useEffect(() => {
    channel.on(UPDATE_DARK_MODE_EVENT_NAME, updateMode);

    return () => {
      channel.removeListener(UPDATE_DARK_MODE_EVENT_NAME, updateMode);
    };
  });

  // Storybook's first render doesn't have the global user params loaded so we
  // need the effect to run whenever defaultMode is updated
  React.useEffect(() => {
    // If a users has set the mode this is respected
    if (initialMode) {
      return;
    }

    if (defaultMode) {
      updateMode(defaultMode);
    } else if (prefersDark.matches) {
      updateMode('dark');
    }
  }, [defaultMode, updateMode, initialMode]);

  return (
    <IconButton
      key="dark-mode"
      active={isDark}
      title={
        isDark ? 'Change theme to light mode' : 'Change theme to dark mode'
      }
      onClick={() => updateMode()}
    >
      {isDark ? <Sun /> : <Moon />}
    </IconButton>
  );
};

export default DarkMode;
