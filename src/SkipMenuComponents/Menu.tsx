import React, { ReactElement } from 'react';
import { SkipMenu, SkipMenuConfig } from './js/skipMenu';

const Menu = (props: SkipMenuConfig): ReactElement => {
  const menuRef = React.useRef(null);

  React.useEffect(() => {
    const skipMenuProps: SkipMenuConfig = {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      attachTo: menuRef.current,
      reloadOnChange: true,
    };
    Object.keys(props).map((key) => {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      skipMenuProps[key] = props[key];
    });
    const skipMenu = new SkipMenu(skipMenuProps);
    skipMenu.init();

    return function cleanup() {
      skipMenu.remove();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // *** Return ***
  return <div data-testid='componentContent' ref={menuRef} />;
};

export default Menu;
