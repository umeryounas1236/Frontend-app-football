import React from "react";

const Aside = () => {
  return (
    <aside id="sidebar" className="sidebar">
      <ul className="sidebar-nav" id="sidebar-nav">
        <li className="nav-item">
          <a href="/football" className="nav-link ">
            <i className="bi bi-grid"></i>
            <span>Football Dashboard</span>
          </a>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#components-nav"
            data-bs-toggle="collapse"
            href="#"
          >
            <i className="bi bi-menu-button-wide"></i>
            <span>Football</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="components-nav"
            className="nav-content collapse "
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="/football/tournaments">
                <i className="bi bi-circle"></i>
                <span>Tournaments</span>
              </a>
            </li>
            <li>
              <a href="/football/contestgroups">
                <i className="bi bi-circle"></i>
                <span>ContestGroups</span>
              </a>
            </li>
            <li>
              <a href="/football/competitors">
                <i className="bi bi-circle"></i>
                <span>Competitors</span>
              </a>
            </li>
            <li>
              <a href="/football/players">
                <i className="bi bi-circle"></i>
                <span>Players</span>
              </a>
            </li>
            <li>
              <a href="/football/matches">
                <i className="bi bi-circle"></i>
                <span>Matches</span>
              </a>
            </li>
            <li>
              <a href="/football/coaches">
                <i className="bi bi-circle"></i>
                <span>Coaches</span>
              </a>
            </li>
            <li>
              <a href="/football/officials">
                <i className="bi bi-circle"></i>
                <span>Officials</span>
              </a>
            </li>
            <li>
              <a href="/football/venues">
                <i className="bi bi-circle"></i>
                <span>Venues</span>
              </a>
            </li>
          </ul>
        </li>

        <li className="nav-item">
          <a
            className="nav-link collapsed"
            data-bs-target="#forms-nav"
            data-bs-toggle="collapse"
            href="#"
            aria-expanded="false"
          >
            <i className="bi bi-journal-text"></i>
            <span>Common</span>
            <i className="bi bi-chevron-down ms-auto"></i>
          </a>
          <ul
            id="forms-nav"
            className="nav-content collapse"
            data-bs-parent="#sidebar-nav"
          >
            <li>
              <a href="/countries">
                <i className="bi bi-circle"></i>
                <span>Countries</span>
              </a>
            </li>
            <li>
              <a href="/seasons">
                <i className="bi bi-circle"></i>
                <span>Seasons</span>
              </a>
            </li>
          </ul>
        </li>
      </ul>
    </aside>
  );
};

export default Aside;
