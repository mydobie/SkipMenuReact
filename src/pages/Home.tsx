import React, { ReactElement } from 'react';
import { Row, Col, Card } from 'react-bootstrap';

import { Github } from 'react-bootstrap-icons';

// *** Main component ***
const Home = (): ReactElement => (
  <Row data-testid='homePageContainer'>
    <Col>
      <Card bg='light' text='dark' className='mt-3 mb-3'>
        <Card.Body>
          <h1>SkipMenu React Wrapper </h1>
          <p>
            React wrapper for SkipMenu menu so it can easily be added to a React
            application. Read more at the{' '}
            <a href='https://github.com/mydobie/skipMenu'>SkipMenu website</a>
          </p>
          <p>
            <a
              href='https://github.com/mydobie/skipMenuReact'
              className='btn btn-outline-secondary'
            >
              <Github /> View me on GitHub!
            </a>
          </p>
        </Card.Body>
      </Card>
      <h2>How do I add it to my application?</h2>
      <p>
        Add it to your application like any other application. It recommended
        that it is added at highest (App) level of the application inside a
        header or navigation so can always be available.
      </p>

      <Card bg='light' text='dark' className='mt-3 mb-3 code-block'>
        <Card.Body>
          <code>
            &lt;SkipMenu theme=&apos;bootstrap&apos; useAccessKey / &gt;
          </code>
        </Card.Body>
      </Card>

      <h2>Props</h2>
      <p>
        The same options are available as in the{' '}
        <a href='https://github.com/mydobie/skipMenu#options'>
          skipMenu options
        </a>
        , but just pass them as props.
      </p>
      <p>
        By default <code>reloadOnChange</code> is always set to{' '}
        <code>true</code> so it will stay up to date with page changes.
        skipMenuReact will automatically attach the menu for you, so there is
        not a need to set the <code>attachTo</code> prop.
      </p>

      <h3>Theme prop</h3>
      <p>
        There is a `theme` prop that will determine which styles will be
        applied. The available themes are:
      </p>
      <ul>
        <li>
          <code>bootstrap</code> = Use on pages that already have the Bootstrap
          CSS framework.
        </li>
        <li>
          <code>patternfly</code> = Use on pages that already have the
          Patternfly CSS framework.
        </li>
        <li>
          <code>full</code> = Use to apply all styles needed to replicate the
          Bootstrap version.
        </li>
      </ul>
      <p>
        If no theme is set, then no styles will be applied. Note that in this
        case, the skipMenu may not function correctly.
      </p>
    </Col>
  </Row>
);

export default Home;
