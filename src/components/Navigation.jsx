import React, { useState } from "react";
import { Link } from "gatsby";

import Hamburger from "@components/layout/Hamburger";
import Arrow from "@components/Arrow";
import logo from "@assets/logo-revojs.svg";
import symbol from "@assets/logo-revojs-symbol.svg";
import { getEdition, getPages, currentEdition } from "@utils";

import "./navigation.scss";

const PartialMatchLink = ({ to, text, className, ...props }) => (
  <Link
    getProps={({ isPartiallyCurrent }) => {
      return isPartiallyCurrent
        ? { className: `${className} active` }
        : { className };
    }}
    to={to}
    {...props}
  >
    {text}
  </Link>
);

function renderPage(page, edition, isMainLink) {
  const name = page.name;
  const path = page.path || name.toLowerCase();
  const classNames = isMainLink ? "main-link" : "main-link secondary";
  const uri = isMainLink ? `/${edition}/${path}/` : `/${path}/`;

  if (page.hasSubpages) {
    return <PartialMatchLink to={uri} text={name} className={classNames} />;
  }

  return (
    <Link activeClassName="active" to={uri} className={classNames}>
      {name}
    </Link>
  );
}

export default props => {
  const [showMenu, toggleMenu] = useState(false);
  const isHome = (props.location && props.location.pathname === "/") || false;
  const edition = getEdition();
  const isPastEdition = edition !== currentEdition;

  const { main, secondary, tertiary } = getPages();

  return (
    <>
      <div
        className={`
          navigation
          ${showMenu ? "is-active" : ""}
          ${isHome ? "is-home" : ""}
          ${isPastEdition ? "is-past-edition" : ""}
        `}
      >
        <Logo edition={edition} currentEdition={currentEdition} />
        <nav>
          <Hamburger
            active={showMenu}
            id="toggle-primary-navigation"
            onClick={() => toggleMenu(!showMenu)}
          />

          <ul className="primary-navigation">
            {main.map(page => {
              return <li key={page.name}>{renderPage(page, edition, true)}</li>;
            })}

            <li>
              <ul className={`secondary-navigation`}>
                {[...secondary, ...tertiary].map(page => {
                  return (
                    <li key={page.name}>{renderPage(page, edition, false)}</li>
                  );
                })}
              </ul>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
};

function Logo({ edition, currentEdition }) {
  const isPastEdition = edition !== currentEdition;

  if (isPastEdition) {
    return (
      <div className="navigation-previous-edition">
        <Link to="/" title="go to homepage" className="navigation-logo-link">
          <Arrow className="navigation-to-current-edition" light={true}>
            View edition {currentEdition}
          </Arrow>
        </Link>
        <img
          src={symbol}
          alt="revo.js"
          height="40"
          className="navigation-logo"
        />
        <span className="navigation-edition">{edition}</span>
      </div>
    );
  }

  return (
    <Link to="/" title="go to homepage" className="navigation-logo-link">
      <img src={logo} alt="revo.js" height="40" className="navigation-logo" />
    </Link>
  );
}
