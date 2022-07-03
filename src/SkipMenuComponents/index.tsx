import React from 'react';
import Menu from './Menu';
import { SkipMenuConfig } from './js/skipMenu';

const Bootstrap = React.lazy(() => import('./Bootstrap'));
const Patternfly = React.lazy(() => import('./Patternfly'));
const Full = React.lazy(() => import('./Full'));

const SkipMenu = (props: SkipMenuConfig) => (
  <>
    <React.Suspense fallback={<></>}>
      {props.theme === 'bootstrap' && <Bootstrap />}
      {props.theme === 'patternfly' && <Patternfly />}
      {props.theme === 'full' && <Full />}
    </React.Suspense>
    <Menu {...props} />
  </>
);

export default SkipMenu;
