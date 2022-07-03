// Contains routing and any application wide items like headers, footers and navigation

import React, { ReactElement } from 'react';
import { BrowserRouter, HashRouter } from 'react-router-dom'; // Use `HashRouter as Router` when you can't control the URL ... like GitHub pages
import { Container, Card } from 'react-bootstrap';
import SkipMenu from './SkipMenuComponents/';

const Router =
  process.env.REACT_APP_USE_HASH_ROUTER === 'true' ? HashRouter : BrowserRouter;

import AppNavBar from './AppNavBar';
import AppRoutes from './AppRoutes';
import SetAxios from './components/SetAxios';

import './scss/index.scss';

const Header = (): ReactElement => (
  <header>
    <SkipMenu
      theme='bootstrap'
      useAccessKey
      landmarks='main, [role=search], nav, [role=navigation], section, [role=region],  form, aside, [role=complementary],  header, [role=banner], footer, [role=contentinfo]'
    />
    <Card bg='dark' text='white'>
      <Card.Body>
        <Card.Title>SkipMenu React Wrapper</Card.Title>
      </Card.Body>
    </Card>
  </header>
);

const Footer = (): ReactElement => (
  <footer>
    <Card bg='secondary' text='white' className='mt-3'>
      <Card.Body>
        <Card.Text>SkipMenuReact by Kim Doberstein</Card.Text>
      </Card.Body>
    </Card>
  </footer>
);

const App = (): ReactElement => {
  const basename = '';

  return (
    <Router basename={basename}>
      <SetAxios />
      <Header />
      <AppNavBar />
      <Container>
        <main>
          <AppRoutes />
        </main>
      </Container>
      <Footer />
    </Router>
  );
};

export default App;
