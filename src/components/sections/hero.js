import React, { useState, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import styled from 'styled-components';
import { navDelay, loaderDelay } from '@utils';
import { usePrefersReducedMotion } from '@hooks';
import { IconJavascript, IconPython, IconCSharp } from '@components/icons';
// import { email } from '@config';

const StyledHeroSection = styled.section`
  ${({ theme }) => theme.mixins.flexCenter};
  flex-direction: column;
  align-items: flex-start;
  min-height: 100vh;
  padding: 0;

  @media (max-width: 480px) and (min-height: 700px) {
    padding-bottom: 10vh;
  }

  h1 {
    margin: 0 0 30px 4px;
    color: var(--green);
    font-family: var(--font-mono);
    font-size: clamp(var(--fz-sm), 5vw, var(--fz-md));
    font-weight: 400;

    @media (max-width: 480px) {
      margin: 0 0 20px 2px;
    }
  }

  h3 {
    margin-top: 10px;
    color: var(--slate);
    line-height: 0.9;
  }

  p {
    margin: 20px 0 0;
    max-width: 540px;
  }

  .email-link {
    ${({ theme }) => theme.mixins.bigButton};
    margin-top: 50px;
  }
  .icongrid {
    display: grid;
    grid-template-columns: repeat(3, 1fr);
    grid-gap: 10px;
    grid-auto-rows: minmax(100px, auto);
  }
  .uno {
    grid-column: 1 / 2;
    grid-row: 1;
  }
  .dos {
    grid-column: 2 / 3;
    grid-row: 1;
  }
  .tres {
    grid-column: 2 / 3;
    grid-row: 1;
  }
`;

const Hero = () => {
  const [isMounted, setIsMounted] = useState(false);
  const prefersReducedMotion = usePrefersReducedMotion();

  useEffect(() => {
    if (prefersReducedMotion) {
      return;
    }

    const timeout = setTimeout(() => setIsMounted(true), navDelay);
    return () => clearTimeout(timeout);
  }, []);
  const one = <h1>Hi, my name is</h1>;
  const two = <h2 className="big-heading">Brandom Ledesma!</h2>;
  const three = <h3 className="big-heading">I do things for the web.</h3>;
  const four = (
    <>
      <p>
        I’m a web Developer and Nanotechnology Engineer, I love to know how things work. <br />
        Now, I’m focused on building and designing useful, up-to-date technologies and I believe in learning continuous.
        The programming languages in which I can develop well are: <span>JavaScript, Python and C#.</span>
      </p>
    </>
  );
  const js = (
    <>
      <div className="icongrid">
        <IconJavascript className="uno"></IconJavascript>
        <IconPython className="dos"></IconPython>
        <IconCSharp className="tres"></IconCSharp>
      </div>
    </>
  );
  const five = (
    <a className="email-link" href="https://github.com/Zurybr" target="_blank" rel="noreferrer">
      Check out my Github!
    </a>
  );

  const items = [one, two, three, four, js, five];

  return (
    <StyledHeroSection>
      {prefersReducedMotion ? (
        <>
          {items.map((item, i) => (
            <div key={i}>{item}</div>
          ))}
        </>
      ) : (
        <TransitionGroup component={null}>
          {isMounted &&
            items.map((item, i) => (
              <CSSTransition key={i} classNames="fadeup" timeout={loaderDelay}>
                <div style={{ transitionDelay: `${i + 1}00ms` }}>{item}</div>
              </CSSTransition>
            ))}
        </TransitionGroup>
      )}
    </StyledHeroSection>
  );
};

export default Hero;
