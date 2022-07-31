import React, { ReactElement, useRef, useEffect, useState } from 'react';
import { SkipMenu, SkipMenuConfig } from './js/skipMenu';

// Because React 18 in strict mode will call useEffect twice, this function will
// ensure that the code is only run once.
// This prevents the skip menu from being loaded twice.

const useEffectOnce = (effect: () => void | (() => void)) => {
  const destroyFunc = useRef<void | (() => void)>();
  const effectCalled = useRef(false);
  const renderAfterCalled = useRef(false);
  const [val, setVal] = useState<number>(0);

  if (effectCalled.current) {
    renderAfterCalled.current = true;
  }

  useEffect(() => {
    // only execute the effect first time around
    if (!effectCalled.current) {
      destroyFunc.current = effect();
      effectCalled.current = true;
    }

    // this forces one render after the effect is run
    setVal(val + 1);

    return () => {
      // if the comp didn't render since the useEffect was called,
      // we know it's the dummy React cycle
      if (!renderAfterCalled.current) {
        return;
      }
      if (destroyFunc.current) {
        destroyFunc.current();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};

const Menu = (props: SkipMenuConfig): ReactElement => {
  const menuRef = React.useRef(null);

  const [skipMenu, setSkipMenu] = React.useState<SkipMenu | null>(null);

  useEffectOnce(() => {
    if (!skipMenu) {
      const skipMenuProps: SkipMenuConfig = {
        attachTo: menuRef.current,
        reloadOnChange: true,
      };
      Object.keys(props).map((key) => {
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        skipMenuProps[key] = props[key];
      });
      const newSkipMenu = new SkipMenu(skipMenuProps);
      newSkipMenu.init();
      setSkipMenu(newSkipMenu);
    }

    return function cleanup() {
      if (skipMenu !== null) {
        skipMenu.remove();
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  });

  // *** Return ***
  return <div data-testid='componentContent' ref={menuRef} />;
};

export default Menu;
