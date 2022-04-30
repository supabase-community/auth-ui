import React from 'react';
import {addons} from '@storybook/addons';
import { DARK_MODE_EVENT_NAME } from './constants';
import { store } from './Tool';

/**
 * Returns the current state of storybook's dark-mode
 */
export function useDarkMode(): boolean {
  const [isDark, setDark] = React.useState(store().current === 'dark');

  React.useEffect(() => {
    const chan = addons.getChannel();
    chan.on(DARK_MODE_EVENT_NAME, setDark);
    return () => chan.off(DARK_MODE_EVENT_NAME, setDark);
  }, []);

  return isDark;
}

export * from './constants';
