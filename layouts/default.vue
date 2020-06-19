<template>
  <div>
    <input
      id="page-sidebarstate"
      type="checkbox"
      class="Page-sidebarState"
      v-model="sidebarOpen"
      @change="updateBodyClass()">
    <div class="Page">
      <div class="Page-sidebar u-backgroundColor--light u-colorDark">

          <label
            class="Page-close"
            for="page-sidebarstate">
            Close
          </label>

        <div class="Page-sidebarContent">
          <nuxt-link
            v-for="(navitem, index) in $store.state.settings.primaryNavigation"
            :key="index"
            :to="'/' + navitem.link"
            class="MobileNavigation-link"
            @click.native="closeSidebar">
            {{ navitem.title }}
          </nuxt-link>

          <span
            class="MobileNavigation-link Navigation-contact"
            @click="closeSidebar(); toggleContactModal()">
            Contact Us
          </span>

          <div class="sidebar__socials-container">
            <a
              href="https://twitter.com/designisdead"
              target="_blank"
              rel="noopener"
              title="Visit our twitter page"
              class="sidebar__social-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="19.045" height="15.468" viewBox="0 0 19.045 15.468" class="svg-icon">
                <path d="M17.088 3.855c.012.169.012.338.012.508A11.03 11.03 0 015.994 15.468 11.03 11.03 0 010 13.719a8.075 8.075 0 00.943.048 7.817 7.817 0 004.846-1.668 3.91 3.91 0 01-3.65-2.707 4.922 4.922 0 00.737.06A4.128 4.128 0 003.9 9.319 3.9 3.9 0 01.773 5.486v-.048a3.931 3.931 0 001.764.5A3.909 3.909 0 011.329.713a11.1 11.1 0 008.049 4.084 4.406 4.406 0 01-.1-.894 3.907 3.907 0 016.755-2.671A7.685 7.685 0 0018.51.289a3.893 3.893 0 01-1.71 2.152 7.825 7.825 0 002.248-.6 8.391 8.391 0 01-1.96 2.014z" />
              </svg>
            </a>
            <a
              href="https://www.facebook.com/DesignisDead/"
              target="_blank"
              rel="noopener"
              title="Visit our facebook page"
              class="sidebar__social-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="8.535" height="15.937" viewBox="0 0 8.535 15.937" class="svg-icon">
                <path d="M7.976 8.964l.443-2.884H5.652V4.209A1.442 1.442 0 017.278 2.65h1.258V.195A15.342 15.342 0 006.303 0a3.521 3.521 0 00-3.769 3.882v2.2H0v2.882h2.534v6.972h3.118V8.964z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/company/design-is-dead"
              target="_blank"
              rel="noopener"
              title="Visit our linkedin page"
              class="sidebar__social-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="14.434" height="14.434" viewBox="0 0 14.434 14.434" class="svg-icon">
                <path d="M3.231 14.435H.238V4.8h2.993zM1.733 3.483a1.741 1.741 0 111.733-1.75 1.748 1.748 0 01-1.733 1.75zm12.7 10.951h-2.988v-4.69c0-1.118-.023-2.552-1.556-2.552-1.556 0-1.794 1.215-1.794 2.471v4.772H5.106V4.8h2.87v1.312h.042a3.144 3.144 0 012.831-1.556c3.029 0 3.585 1.994 3.585 4.585v5.294z" />
              </svg>
            </a>
            <a
              href="https://www.instagram.com/design.is.dead/"
              target="_blank"
              rel="noopener"
              title="Visit our instagram page"
              class="sidebar__social-wrapper">
              <svg xmlns="http://www.w3.org/2000/svg" width="17.846" height="17.842" viewBox="0 0 17.846 17.842" class="svg-icon">
                <path d="M8.925 4.346A4.575 4.575 0 1013.5 8.921a4.567 4.567 0 00-4.575-4.575zm0 7.549a2.974 2.974 0 112.974-2.974 2.979 2.979 0 01-2.974 2.974zm5.829-7.733a1.067 1.067 0 11-1.067-1.07 1.065 1.065 0 011.067 1.07zm3.03 1.083a5.28 5.28 0 00-1.441-3.738A5.315 5.315 0 0012.605.062c-1.473-.084-5.888-.084-7.362 0A5.307 5.307 0 001.505 1.5 5.3 5.3 0 00.062 5.238c-.084 1.473-.084 5.888 0 7.362a5.28 5.28 0 001.443 3.738 5.322 5.322 0 003.738 1.441c1.473.084 5.888.084 7.362 0a5.28 5.28 0 003.738-1.441 5.315 5.315 0 001.441-3.738c.084-1.473.084-5.884 0-7.358zm-1.9 8.938a3.011 3.011 0 01-1.7 1.7c-1.174.466-3.961.358-5.259.358s-4.089.1-5.259-.358a3.011 3.011 0 01-1.7-1.7c-.466-1.174-.358-3.961-.358-5.259s-.103-4.092.361-5.262a3.011 3.011 0 011.7-1.7c1.174-.466 3.961-.358 5.259-.358s4.089-.1 5.259.358a3.011 3.011 0 011.7 1.7c.466 1.174.358 3.961.358 5.259s.101 4.089-.365 5.259z" />
              </svg>
            </a>
          </div>

          <a
            href="https://goo.gl/maps/cV1npJ3qzMp"
            target="_blank"
            rel="noopener"
            class="Page-sidebarContentFooter">
            <icon
              type="navigate"
              size="large"/>
            <span>
              <strong>Design is Dead</strong><br>
              Rue Middelbourg 64 B<br>
              1170 Brussels, Belgium
            </span>
          </a>
        </div>
      </div>

      <div class="Page-main u-backgroundColor--light">
        <label
          class="Page-overlay"
          for="page-sidebarstate"/>
        <div class="Page-header">
          <div class="Page-headerContent">
            <nuxt-link
              :to="'/'"
              title="Back to homepage">
              <svg class="Page-logo">
                <use
                  xlink:href="#svg-logo"
                  href="#svg-logo"/>
              </svg>
            </nuxt-link>
            <label
              class="Page-hamburger"
              for="page-sidebarstate">
              <span>Open menu</span>
            </label>
            <div class="Navigation">
              <nuxt-link
                v-for="(navitem, index) in $store.state.settings.primaryNavigation"
                :key="index"
                :to="'/' + navitem.link"
                :class="{ 'Navigation-link--border': navitem.border }"
                class="Navigation-link">
                {{ navitem.title }}
              </nuxt-link>
              <span
                class="Navigation-link Navigation-contact"
                @click="closeSidebar; toggleContactModal();">
                Contact Us
              </span>
            </div>
          </div>
        </div>
        <div class="Page-content">
          <main class="main-content">
            <nuxt/>
          </main>
        </div>
      </div>
    </div>

    <div class="DraftMode" v-if="draftMode">
      draft content
    </div>

    <svg style="display: none;">
      <!-- Close -->
      <symbol
        id="svg-close"
        viewBox="0 0 100 100">
        <path
          fill="currentColor"
          d="M57.48,5.3H42.52C14.84,5.3,1,19.514,1,50.186c0,29.176,14.775,44.511,41.52,44.511H57.48
            C85.161,94.696,99,80.857,99,50.186C99,21.01,84.226,5.3,57.48,5.3z M79.645,75.427c-4.403,4.642-11.653,6.896-22.164,6.896H42.52
            c-9.819,0-17.146-2.495-21.776-7.419c-4.891-5.199-7.37-13.516-7.37-24.719c0-11.926,2.368-20.501,7.037-25.486
            c4.429-4.728,11.661-7.026,22.109-7.026H57.48c12.512,0,29.146,3.371,29.146,32.512C86.627,62.051,84.277,70.543,79.645,75.427z"/>
        <polygon
          fill="currentColor"
          points="64.398,28.602 50.001,42.999 35.603,28.602 28.604,35.6 43.001,49.998 28.604,64.396 35.603,71.395 50.001,56.997
            64.398,71.395 71.396,64.396 56.999,49.998 71.396,35.6"/>
      </symbol>

      <!-- Search -->
      <symbol
        id="svg-search"
        viewBox="0 0 18.207 17.582">
        <circle
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-miterlimit="10"
          cx="11.036"
          cy="7.171"
          r="5.829"/>
        <line
          fill="none"
          stroke="currentColor"
          stroke-width="2"
          stroke-miterlimit="10"
          x1="0.707"
          y1="16.875"
          x2="6.02"
          y2="11.563"/>
      </symbol>

      <!-- Twitter -->
      <symbol
        id="svg-twitter"
        viewBox="0 0 612 612">
        <path
          fill="currentColor"
          d="M612,116.258c-22.525,9.981-46.694,16.75-72.088,19.772c25.929-15.527,45.777-40.155,55.184-69.411
			c-24.322,14.379-51.169,24.82-79.775,30.48c-22.907-24.437-55.49-39.658-91.63-39.658c-69.334,0-125.551,56.217-125.551,125.513
			c0,9.828,1.109,19.427,3.251,28.606C197.065,206.32,104.556,156.337,42.641,80.386c-10.823,18.51-16.98,40.078-16.98,63.101
			c0,43.559,22.181,81.993,55.835,104.479c-20.575-0.688-39.926-6.348-56.867-15.756v1.568c0,60.806,43.291,111.554,100.693,123.104
			c-10.517,2.83-21.607,4.398-33.08,4.398c-8.107,0-15.947-0.803-23.634-2.333c15.985,49.907,62.336,86.199,117.253,87.194
			c-42.947,33.654-97.099,53.655-155.916,53.655c-10.134,0-20.116-0.612-29.944-1.721c55.567,35.681,121.536,56.485,192.438,56.485
			c230.948,0,357.188-191.291,357.188-357.188l-0.421-16.253C573.872,163.526,595.211,141.422,612,116.258z"/>
      </symbol>

      <!-- Facebook -->
      <symbol
        id="svg-facebook"
        viewBox="88.428 12.828 107.543 207.085">
        <path
          fill="currentColor"
          d="M158.232 219.912v-94.461h31.707l4.747-36.813h-36.454V65.134c0-10.658 2.96-17.922 18.245-17.922l19.494-.009V14.278c-3.373-.447-14.944-1.449-28.406-1.449-28.106 0-47.348 17.155-47.348 48.661v27.149H88.428v36.813h31.788v94.461l38.016-.001z"/>
      </symbol>

      <!-- LinkedIn -->
      <symbol
        id="svg-linkedin"
        viewBox="0 5 1036 990">
        <path
          fill="currentColor"
          d="M0 120c0-33.334 11.667-60.834 35-82.5C58.333 15.833 88.667 5 126 5c36.667 0 66.333 10.666 89 32 23.333 22 35 50.666 35 86 0 32-11.333 58.666-34 80-23.333 22-54 33-92 33h-1c-36.667 0-66.333-11-89-33S0 153.333 0 120zm13 875V327h222v668H13zm345 0h222V622c0-23.334 2.667-41.334 8-54 9.333-22.667 23.5-41.834 42.5-57.5 19-15.667 42.833-23.5 71.5-23.5 74.667 0 112 50.333 112 151v357h222V612c0-98.667-23.333-173.5-70-224.5S857.667 311 781 311c-86 0-153 37-201 111v2h-1l1-2v-95H358c1.333 21.333 2 87.666 2 199 0 111.333-.667 267.666-2 469z"/>
      </symbol>

      <!-- Instagram -->
      <symbol
        id="svg-instagram"
        viewBox="0 0 16 16">
        <path fill="#8585cc" d="M3.8,0.5C2,0.5,0.5,2,0.5,3.8v7.5c0,1.8,1.5,3.3,3.3,3.3h7.5c1.8,0,3.3-1.5,3.3-3.3V3.8 c0-1.8-1.5-3.3-3.3-3.3H3.8z"></path>
        <path fill="#8d8dd8" d="M0.5,3.8v7.5c0,1.8,1.5,3.3,3.3,3.3h7.5c1.8,0,3.3-1.5,3.3-3.3V3.8c0-0.2,0-0.4-0.1-0.6 C12.1,1.8,9.4,1,6.5,1C4.6,1,2.7,1.4,1,2C0.7,2.5,0.5,3.1,0.5,3.8z"></path>
        <path fill="#bd82f4" d="M0.5,11.2c0,1.8,1.5,3.3,3.3,3.3h7.5c1.8,0,3.3-1.5,3.3-3.3V5.6C12.3,4,9.5,3,6.5,3 c-2.2,0-4.2,0.5-6,1.4V11.2z"></path>
        <path fill="#f97dcd" d="M0.5,11.2c0,1.8,1.5,3.3,3.3,3.3h7.5c1.8,0,3.3-1.5,3.3-3.3v-3c-2.1-2-4.9-3.2-8-3.2 c-2.2,0-4.3,0.6-6,1.7V11.2z"></path>
        <path fill="#fc9c95" d="M0.5,11.2c0,1.8,1.5,3.3,3.3,3.3h7.5c1.8,0,3.2-1.4,3.3-3.1C12.8,8.7,9.9,7,6.5,7 c-2.3,0-4.4,0.8-6,2.1V11.2z"></path>
        <path fill="#ffc49c" d="M0.6,11.9c0.3,1.5,1.6,2.6,3.2,2.6h7.5c0.9,0,1.6-0.3,2.2-0.9C12.3,10.9,9.6,9,6.5,9 C4.1,9,1.9,10.1,0.6,11.9z"></path>
        <path fill="#ffde8d" d="M1.7,13.8c0.6,0.4,1.3,0.7,2,0.7h7.5c0.1,0,0.2,0,0.4,0c-0.8-2-2.8-3.5-5.1-3.5 C4.5,11,2.7,12.1,1.7,13.8z"></path>
        <path fill="#fff69f" d="M3.8,14.5h5.6C8.7,13.6,7.7,13,6.5,13c-1.2,0-2.2,0.6-2.9,1.5C3.7,14.5,3.7,14.5,3.8,14.5z"></path>
        <path fill="#8b75a1" d="M11.5,1C12.9,1,14,2.1,14,3.5v8c0,1.4-1.1,2.5-2.5,2.5h-8C2.1,14,1,12.9,1,11.5v-8C1,2.1,2.1,1,3.5,1 H11.5 M11.5,0h-8C1.6,0,0,1.6,0,3.5v8C0,13.4,1.6,15,3.5,15h8c1.9,0,3.5-1.6,3.5-3.5v-8C15,1.6,13.4,0,11.5,0L11.5,0z"></path>
        <path fill="#fff" d="M7.5,10C6.1,10,5,8.9,5,7.5S6.1,5,7.5,5S10,6.1,10,7.5S8.9,10,7.5,10z M7.5,6C6.7,6,6,6.7,6,7.5 S6.7,9,7.5,9S9,8.3,9,7.5S8.3,6,7.5,6z"></path>
        <path fill="#fff" d="M9.5,13h-4C3.6,13,2,11.4,2,9.5v-4C2,3.6,3.6,2,5.5,2h4C11.4,2,13,3.6,13,5.5v4 C13,11.4,11.4,13,9.5,13z M5.5,3C4.1,3,3,4.1,3,5.5v4C3,10.9,4.1,12,5.5,12h4c1.4,0,2.5-1.1,2.5-2.5v-4C12,4.1,10.9,3,9.5,3H5.5z"></path>
        <path fill="#fff" d="M10.5 4A0.5 0.5 0 1 0 10.5 5A0.5 0.5 0 1 0 10.5 4Z"></path>
      </symbol>

      <!-- DID logo -->
      <symbol
        id="svg-logo"
        viewBox="0 0 526.58 96.1">
        <path
          fill="currentColor"
          d="M172.4,48.05a37.35,37.35,0,0,1-.28,5.23c-.39,2.66-1.52,4.51-3.37,5.55a14.07,14.07,0,0,1-6.61,1.23h-7.61V36h7.61a13.93,13.93,0,0,1,6.61,1.24c1.85,1,3,2.88,3.37,5.54A37.45,37.45,0,0,1,172.4,48.05Zm-3.65,0a34.38,34.38,0,0,0-.21-4.92,3.64,3.64,0,0,0-1.69-2.74,9.92,9.92,0,0,0-4.71-.81h-4v16.9h4a10.09,10.09,0,0,0,4.71-.79,3.6,3.6,0,0,0,1.69-2.75A33.66,33.66,0,0,0,168.75,48.05Z"/>
        <path
          fill="currentColor"
          d="M199,60.06h-16V36h16v3.54H186.68v6.48h10.81v3.3H186.68v7.16H199Z"/>
        <path
          fill="currentColor"
          d="M227.09,53a6.54,6.54,0,0,1-2.75,5.5,9.65,9.65,0,0,1-6.06,1.93q-8.35,0-9.78-7.88l3.62-.62a6,6,0,0,0,2,3.79,6.73,6.73,0,0,0,4.18,1.13,6.45,6.45,0,0,0,3.44-.89,3.32,3.32,0,0,0,1.72-3q0-2.34-3.61-3.44l-6.71-1.93a5.54,5.54,0,0,1-3.62-5.34,5.64,5.64,0,0,1,2.55-4.92,9.66,9.66,0,0,1,5.54-1.52,9.94,9.94,0,0,1,5.51,1.35,10.46,10.46,0,0,1,3.55,4.44l-3.31,1.51a8.06,8.06,0,0,0-2.24-3,6.36,6.36,0,0,0-3.51-.75q-4.44,0-4.44,2.85,0,1.86,3.62,2.83a51.11,51.11,0,0,1,6.71,2.09A6.11,6.11,0,0,1,227.09,53Z"/>
        <path fill="currentColor" d="M242,60.06h-3.75V36H242Z"/>
        <path
          fill="currentColor"
          d="M271.6,60.06h-2l-1.37-2.2a6.35,6.35,0,0,1-5.34,2.51,8.44,8.44,0,0,1-7.53-3.82,15.08,15.08,0,0,1-2.17-8.5,14.92,14.92,0,0,1,2.2-8.54,8.68,8.68,0,0,1,7.67-3.78A8.44,8.44,0,0,1,267.74,37a16.64,16.64,0,0,1,3.62,3.31l-2.82,2.3c-1.75-2.2-3.56-3.3-5.45-3.3q-6.22,0-6.23,8.74t6.06,8.74a4.49,4.49,0,0,0,4-2.06,7.88,7.88,0,0,0,1.24-4.54h-6V46.6h9.47Z"/>
        <path fill="currentColor" d="M300.85,60.06h-3.34L287.29,43.44V60.06h-3.65V36H287l10.26,16.62V36h3.61Z"/>
        <path fill="currentColor" d="M333.69,60.06h-3.75V36h3.75Z"/>
        <path
          fill="currentColor"
          d="M362.44,53a6.52,6.52,0,0,1-2.76,5.5,9.6,9.6,0,0,1-6.05,1.93q-8.37,0-9.78-7.88l3.61-.62a6.12,6.12,0,0,0,2,3.79,6.76,6.76,0,0,0,4.19,1.13,6.45,6.45,0,0,0,3.44-.89,3.32,3.32,0,0,0,1.72-3q0-2.34-3.62-3.44l-6.71-1.93a5.54,5.54,0,0,1-3.61-5.34,5.64,5.64,0,0,1,2.55-4.92,9.64,9.64,0,0,1,5.54-1.52,10,10,0,0,1,5.51,1.35A10.52,10.52,0,0,1,362,41.65l-3.3,1.51a8.17,8.17,0,0,0-2.24-3,6.38,6.38,0,0,0-3.51-.75q-4.44,0-4.44,2.85,0,1.86,3.61,2.83a51.52,51.52,0,0,1,6.72,2.09A6.13,6.13,0,0,1,362.44,53Z"/>
        <path
          fill="currentColor"
          d="M408.18,48.05a37.67,37.67,0,0,1-.27,5.23c-.39,2.66-1.52,4.51-3.37,5.55a14.12,14.12,0,0,1-6.62,1.23h-7.6V36h7.6a14,14,0,0,1,6.62,1.24c1.85,1,3,2.88,3.37,5.54A37.77,37.77,0,0,1,408.18,48.05Zm-3.64,0a34.38,34.38,0,0,0-.21-4.92,3.64,3.64,0,0,0-1.69-2.74,9.94,9.94,0,0,0-4.72-.81H394v16.9h3.95a10.11,10.11,0,0,0,4.72-.79,3.6,3.6,0,0,0,1.69-2.75A33.66,33.66,0,0,0,404.54,48.05Z"/>
        <path fill="currentColor" d="M434.14,60.06h-16V36h16v3.54H421.79v6.48h10.8v3.3h-10.8v7.16h12.35Z"/>
        <path fill="currentColor" d="M464.23,60.06h-3.92l-2.69-6.74h-9.29l-2.68,6.74h-3.93l9.54-24h3.44Zm-8-10.22L453,41.58l-3.27,8.26Z"/>
        <path
          fill="currentColor"
          d="M490.54,48.05a37.35,37.35,0,0,1-.28,5.23c-.39,2.66-1.52,4.51-3.37,5.55a14.07,14.07,0,0,1-6.61,1.23h-7.61V36h7.61a13.93,13.93,0,0,1,6.61,1.24c1.85,1,3,2.88,3.37,5.54A37.45,37.45,0,0,1,490.54,48.05Zm-3.65,0a34.38,34.38,0,0,0-.21-4.92A3.66,3.66,0,0,0,485,40.39a9.94,9.94,0,0,0-4.72-.81h-4v16.9h4a10.11,10.11,0,0,0,4.72-.79,3.62,3.62,0,0,0,1.68-2.75A33.66,33.66,0,0,0,486.89,48.05Z"/>
        <path
          fill="currentColor"
          d="M102.34,53.15a10,10,0,0,1,1.44.21l1.13.15.25,0A11.45,11.45,0,0,0,115,34l-.19-.2c-1.95-1.83.05-2.8-3.31-4s-2.61.71-5,1a10.6,10.6,0,0,0-4.1,1,3.19,3.19,0,0,1-4.33-1.43,13.54,13.54,0,0,0-4-4.44L94,25.81c-2.24-1.47-.44-2.9-4-3.5s-2.48,1.23-4.81,1.91l-.37.1-.4.12a12.8,12.8,0,0,0-4.71,2.75c-1.47,1.35-3.17,1.49-4.89-.09a11.49,11.49,0,0,0-5.68-3c-2.19-.71-1.2-2.42-4.68-1.83s-1.65,2-3.84,3.43a13.91,13.91,0,0,0-4.23,4.59c-1.31,2.2-3.41,1.69-4.48,1.3A12.49,12.49,0,0,0,48,30.79c-2.37-.28-1.61-2.2-5-1s-1.36,2.18-3.31,4l-.19.2a11.46,11.46,0,0,0,8,19.69,11.63,11.63,0,0,0,1.88-.17l.25,0c.39,0,.81-.12,1.23-.19a9.12,9.12,0,0,1,1.23-.17h.49a3.38,3.38,0,0,1,.72.1,6,6,0,0,1,4.24,4.38,8.89,8.89,0,0,1-.67,7.11,7.86,7.86,0,0,1-3.14,2.55C51.4,68.5,49.34,69.36,48,70s-.69,2.18,1,1.88a166.23,166.23,0,0,1,28-2.75A153.32,153.32,0,0,1,105.34,72c2,.47,2.38-1.15,1.23-1.78s-3.47-1.79-6-3A7.26,7.26,0,0,1,97.78,65c-1.33-1.72-1.7-4.67-.88-7.41C97.81,54.58,100.14,53,102.34,53.15ZM107,34.47a7.77,7.77,0,1,1-7.77,7.77A7.77,7.77,0,0,1,107,34.47ZM47.5,50a7.77,7.77,0,1,1,7.77-7.77A7.77,7.77,0,0,1,47.5,50ZM66.63,27.88a8.14,8.14,0,0,1,8.17,8,8,8,0,1,1-16,0A7.85,7.85,0,0,1,66.63,27.88Zm21.86,32.6c-2.17,2.91-6.69,2.87-11,2.87-4.06,0-8.5.26-11.07-2.5a11.71,11.71,0,0,1-2.5-4.66,18.45,18.45,0,0,1-.46-2.26c-.51-4.39,1.46-5.21,4.54-5.67,6-.9,6.54-3.42,9.3-3.42s3.32,2.68,9,3.38c3,.36,5.42,1.22,4.78,5.33a25.13,25.13,0,0,1-.51,2.64A12.7,12.7,0,0,1,88.49,60.48Zm-.76-16.6a8,8,0,0,1-8-8,8.15,8.15,0,0,1,8.17-8,7.85,7.85,0,0,1,7.83,8A8,8,0,0,1,87.73,43.88Z"/>
      </symbol>

      <!-- Knuckles -->
      <symbol
        id="svg-knuckles"
        viewBox="0 0 100 61">
        <path
          fill="currentColor"
          d="M14.461,59.2c0.825-2.102,3.405-2.551,5.278-3.441
		c1.841-0.876,4.195-1.754,5.507-3.213c4.019-4.468,1.548-13.749-3.441-14.684c-2.275-0.427-4.793,0.711-7.113,0.688
		C3.452,38.436-1.843,27.13,2.53,18.587c0.904-1.766,2.756-2.908,3.671-4.359c0.609-0.969,0.544-2.387,1.376-3.213
		c0.594-0.589,2.54-1.46,3.901-1.376c1.311,0.082,1.936,1.2,3.213,1.606c1.002,0.319,2.718,0.327,4.129,0.688
		c5.621,1.439,5.337-0.443,8.261-3.9c1.137-1.344,3.436-2.593,4.131-3.442c0.569-0.697,0.997-2.495,1.835-2.983
		c0.95-0.553,2.657-0.783,4.129-0.459c0.972,0.214,1.583,1.355,2.983,2.065c1.182,0.598,2.648,0.642,3.671,1.147
		c2.39,1.18,3.475,3.822,6.195,3.901c2.3,0.066,3.544-2.302,6.195-3.671c1.147-0.592,2.459-0.689,3.442-1.147
		c2.431-1.133,3.869-3.723,7.802-1.606c0.664,2.883,2.943,3.305,5.047,5.507c1.733,1.814,2.722,5.129,4.818,5.507
		c1.289,0.232,2.439-0.64,4.361-1.147c1.36-0.36,2.706-0.165,3.67-0.459c1.283-0.392,2.01-1.506,3.213-1.606
		c1.439-0.12,2.596,0.711,4.13,1.376c1.796,5.647,7.082,6.943,6.195,15.604c-0.54,5.286-5.258,11.822-13.309,11.932
		c-2.194,0.03-4.639-1.077-7.113-0.688c-4.968,0.779-7.886,9.253-3.9,14.226c1.673,2.087,5.565,3.388,8.719,5.048
		c0.738,0.388,2.376,1.273,2.295,2.064c-0.213,2.103-6.32,0.242-7.801,0c-17.346-2.831-38.159-2.901-55.528-0.229
		C19.69,59.367,16.656,61.035,14.461,59.2z M37.636,26.847c3.471,0.021,7.702-2.565,8.949-5.965
		c2.154-5.873-1.684-10.716-4.819-12.162c-1.406-0.648-3.864-0.898-5.507-0.688C25.429,9.416,25.522,26.772,37.636,26.847z
		 M53.927,13.08c-3.752,7.451,2.811,14.279,9.408,13.767C75.66,25.891,74.03,6.432,61.499,8.032
		C57.396,8.556,54.755,11.439,53.927,13.08z M5.512,25.7C6.546,39.031,28.42,35,23.41,21.341c-1.304-3.555-5.508-5.99-9.637-5.507
		C8.772,16.417,5.094,20.305,5.512,25.7z M76.185,26.159c1.391,11.763,20.354,9.579,18.355-2.982
		c-0.677-4.262-5.103-8.01-10.325-7.343C78.893,16.514,75.533,20.646,76.185,26.159z M43.143,30.978
		c-3.987,1.474-7.534,1.219-8.949,3.211c-2.852,4.016,1.935,12.317,3.901,13.768c4.383,3.233,19.908,2.606,23.635,0.23
		c2.04-1.302,7.011-10.172,4.129-14.227c-1.581-2.225-5.858-1.438-9.637-2.983c-3.061-1.254-4.054-3.44-7.342-2.753
		C46.626,28.695,45.774,30.004,43.143,30.978z"/>
      </symbol>

      <symbol
        id="svg-navigate"
        viewBox="0 0 100 100">
        <path
          fill="currentColor"
          d="M50,1C22.9,1,1,22.9,1,50s21.9,49,49,49s49-21.9,49-49S77.1,1,50,1z M50,80.2V50H19.9l52.7-22.6L50,80.2z"/>
      </symbol>

    </svg>

    <script
      type="text/plain"
      class="optanon-category-2">
      // console.log('optanon-category-2 accepted');


    </script>

    <script
      type="text/plain"
      class="optanon-category-4">
      // console.log('optanon-category-4 accepted');


    </script>

    <!-- Start VWO Asynchronous Code -->
    <script type='text/javascript'>
      var _vwo_code=(function(){
        var account_id=413983,
          settings_tolerance=2000,
          library_tolerance=2500,
          use_existing_jquery=false,
          /* DO NOT EDIT BELOW THIS LINE */
          f=false,d=document;return{use_existing_jquery:function(){return use_existing_jquery;},library_tolerance:function(){return library_tolerance;},finish:function(){if(!f){f=true;var a=d.getElementById('_vis_opt_path_hides');if(a)a.parentNode.removeChild(a);}},finished:function(){return f;},load:function(a){var b=d.createElement('script');b.src=a;b.type='text/javascript';b.innerText;b.onerror=function(){_vwo_code.finish();};d.getElementsByTagName('head')[0].appendChild(b);},init:function(){settings_timer=setTimeout('_vwo_code.finish()',settings_tolerance);var a=d.createElement('style'),b='body{opacity:0 !important;filter:alpha(opacity=0) !important;background:none !important;}',h=d.getElementsByTagName('head')[0];a.setAttribute('id','_vis_opt_path_hides');a.setAttribute('type','text/css');if(a.styleSheet)a.styleSheet.cssText=b;else a.appendChild(d.createTextNode(b));h.appendChild(a);this.load('//dev.visualwebsiteoptimizer.com/j.php?a='+account_id+'&u='+encodeURIComponent(d.URL)+'&r='+Math.random());return settings_timer;}};}());_vwo_settings_timer=_vwo_code.init();
    </script>
    <!-- End VWO Asynchronous Code -->

    <!-- facebook analytics -->
    <script
      type="text/plain"
      class="optanon-category-4">
      window.fbAsyncInit = function () {
      FB.init({
      appId: '879905388836438',
      xfbml: true,
      version: 'v2.10'
      });

      FB.AppEvents.logPageView();

      };

      (function (d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) {
      return;
      }
      js = d.createElement(s);
      js.id = id;
      js.src = 'https://connect.facebook.net/en_US/sdk.js';
      fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));


    </script>
    <!-- facebook analytics end -->

    <!-- active campaign -->
    <script type="text/javascript">
      (function(e,t,o,n,p,r,i){e.visitorGlobalObjectAlias=n;e[e.visitorGlobalObjectAlias]=e[e.visitorGlobalObjectAlias]||function(){(e[e.visitorGlobalObjectAlias].q=e[e.visitorGlobalObjectAlias].q||[]).push(arguments)};e[e.visitorGlobalObjectAlias].l=(new Date).getTime();r=t.createElement('script');r.src=o;r.async=true;i=t.getElementsByTagName('script')[0];i.parentNode.insertBefore(r,i)})(window,document,'https://prism.app-us1.com/prism.js','vgo');
      vgo('setAccount', '223882243');
      vgo('setTrackByDefault', true);

      vgo('process');
    </script>
    <!-- active campaign end -->

    <!-- OneTrust Cookies Consent Notice start -->
    <script src="https://cdn.cookielaw.org/consent/bcac9bb5-c797-4328-8714-24d5cbb1ad83.js" type="text/javascript" charset="UTF-8"></script>
    <script type="text/javascript">
      function OptanonWrapper() {

      }
    </script>
    <!-- OneTrust Cookies Consent Notice end -->

    <!-- Contact form modal (ActiveCampaign) -->
    <transition name="fade">
      <div
        v-if="contactModalOpen"
        class="contact-modal--container">
        <contact @closeContactModal="toggleContactModal()"></contact>
      </div>
    </transition>
    <GlobalEvents @toggleContactModal="toggleContactModal()"></GlobalEvents>
  </div>
</template>

<script>

  const body = process.client ? document.querySelectorAll('body')[0] : null;
  export default {
    data: () => ({
      sidebarOpen: false,
      contactModalOpen: false,
    }),
    methods: {
      closeSidebar() {
        this.sidebarOpen = false;
        this.updateBodyClass();
      },
      updateBodyClass() {
        this.sidebarOpen ? body.classList.add('body--sidebarOpened') : body.classList.remove('body--sidebarOpened');
      },
      toggleContactModal() {
        this.contactModalOpen ? this.contactModalOpen = false : this.contactModalOpen = true
        this.contactModalOpen ? (
          document.querySelector('body').style.overflow = 'hidden',
          document.querySelector('body').style.height = '100%',
          document.querySelector('html').style.overflow = 'hidden',
          document.querySelector('html').style.height = '100%'
        ) : (
          document.querySelector('html').removeAttribute('style'),
          document.querySelector('body').removeAttribute('style')
        )
      },
      updateHeaderMenuClass() {
        const headerMenu = document.querySelector('.Page-header')
        window.scrollY > 100 && window.innerWidth > 1000 ? (
          headerMenu.classList.add('header--opaque')
        ) : (
          headerMenu.classList.remove('header--opaque')
        )
      }
    },
    computed: {
      draftMode() {
        return this.$store.state.settings.editMode;
      }
    },
    mounted: function() {
      window.addEventListener('scroll', this.updateHeaderMenuClass)
    },
    destroyed: function() {
      window.removeEventListener('scroll', this.updateHeaderMenuClass)
    }
  };
</script>

<style lang="scss">
  @import "../assets/scss/styles";

  $pageSidebarMinimumWidth: 310px;

  .fade-enter-active, .fade-leave-active {
    transition: opacity .5s;
  }

  .contact-modal--container {
    position: fixed;
    z-index: 1;
    left: 0;
    top: 0;
    width: 100%;
    height: 100%;
    background-color: rgb(0,0,0);
    background-color: rgba(0,0,0,0.9);
    overflow-y: auto;
    -webkit-overflow-scrolling: touch;
  }

  .body--sidebarOpened {
    overflow: hidden;
  }

  .Page-sidebarState {
    display: none;
  }

  .Page-sidebar {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    color: white;
    z-index: 10;
    padding: 0 20px;
    width: $pageSidebarMinimumWidth;
    transform: translate3d($pageSidebarMinimumWidth, 0, 0);
    transition: 0.45s cubic-bezier(0.86, 0, 0.07, 1) transform;
    will-change: transform;
    &:before {
      content: " ";
      position: absolute;
      width: 100%;
      height: 100%;
      top: 0;
      left: 0;
      box-shadow: 0px 0px 30px 0px rgba(0, 0, 0, 0.4);
      opacity: 0;
      transition: 0.45s cubic-bezier(0.86, 0, 0.07, 1) opacity;
      will-change: opacity;
      z-index: -1;

      .Page-sidebarState:checked + .Page & {
        opacity: 1;
      }
    }

    .Page-sidebarState:checked + .Page & {
      transform: translate3d(0, 0, 0);
    }
  }

  .Page-sidebarContent {
    display: flex;
    height: 100%;
    justify-content: flex-end;
    align-items: flex-start;
    flex-direction: column;
    padding-top: 64px;
  }

  .Page-hamburger {
    width: 40px;
    height: 40px;
    cursor: pointer;
    user-select: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

    span {
      display: block;
      text-indent: -9999px;
      width: 30px;
      height: 3px;
      background: color('secondaryColor');
      margin: 4px 0;
    }

    &:before,
    &:after {
      display: block;
      content: " ";
      width: 30px;
      height: 3px;
      background: color('secondaryColor');
      transition: 0.3s cubic-bezier(0.6, 0, 0.2, 1) transform;
      will-change: transform;
    }

    &:before {
      .Page-sidebarState:checked + .Page & {
        transform: translateX(-10px);
      }
    }

    &:after {
      .Page-sidebarState:checked + .Page & {
        transform: translateX(10px);
      }
    }
    @media screen and (min-width: size("large")) {
      display: none;
    }
  }

  .Page-overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 0;
    height: 100vh;
    cursor: pointer;
    background: black;
    opacity: 0;
    transition: 0.25s ease opacity, 0s 0.25s width;
    z-index: 9;
    .Page-sidebarState:checked + .Page & {
      opacity: 0.03;
      width: 100vw;
      transition: 0.25s ease opacity, 0s 0s width;
    }
  }

  .Page-header {
    position: fixed;
    width: 100%;
    z-index: 1;
    top: 0;
    transition: background-color .5s, box-shadow .5s;

    @media screen and (max-width: size('large') - 1) {
      background-color: color('snowColor');
      height: 64px;
    }
  }

  .header--opaque {
    background-color: color('primaryColor');
    box-shadow: 0 5px 20px rgba(0, 0, 0, 0.05);
  }

  .Page-logo {
    color: color('textLight');
    width: 240px;
    height: 41px;
    margin-left: -20px;
    margin-top: 12px;
    @media screen and (min-width: size("large")) {
      width: 300px;
      height: 45px;
    }

    @media screen and (max-width: size('large') - 1) {
      color: color('primaryColor');
      margin-top: 0;
    }
  }

  .Page-content {
    position: relative;
    z-index: 0;
    background-color: color('primaryColor');
  }

  .Page-headerContent {
    display: flex;
    justify-content: space-between;
    max-width: size("huge");
    margin: 0 auto;
    height: 100%;
    padding: 0 50px;

    @media screen and (max-width: size('large') - 1) {
      align-items: center;
    }

    @media screen and (max-width: size('medium')) {
      padding: 0 24px;
    }
  }

  .Navigation {
    display: none;
    text-align: right;
    @media screen and (min-width: size("large")) {
      display: block;
    }
  }

  .Navigation-link {
    display: inline-block;
    padding: 30px 5px 15px;
    text-decoration: none !important;
    transition: 0.25s ease opacity;
    opacity: 1;
    text-transform: uppercase;
    font-size: 0.85rem;
    border: 1px solid transparent;
    color: color('textLight');

    &.nuxt-link-active {
      opacity: 1;
      font-weight: bold;
      background-color: color('secondaryColor');
    }

    &:hover:not(.nuxt-link-active) {
      opacity: 0.5;
    }
  }

  .Navigation-link--border {
    border-color: black;
  }

  .MobileNavigation-link {
    display: block;
    padding-top: $spacer/3;
    text-transform: uppercase;
    font-size: 24px;
    color: color('primaryColor');
    transition: 0.25s ease opacity;
    will-change: opacity;
    &:hover {
      text-decoration: none;
      color: color('secondaryColor');
    }

    &:first-child {
      margin-top: auto;
    }

    &.nuxt-link-active {
      color: color('secondaryColor');
    }
  }

  .Navigation-contact {
    cursor: pointer;
    user-select: none;
  }

  .Page-close {
    cursor: pointer;
    position: absolute;
    top: $spacer/4;
    right: 24px;
    width: 40px;
    height: 40px;
    text-indent: -9999px;
    &:before,
    &:after {
      position: absolute;
      content: " ";
      display: block;
      background: color('secondaryColor');
      will-change: transform;
      top: 50%;
      left: 50%;
      width: 26px;
      height: 2px;
      margin-top: -1.5px;
      margin-left: -12px;
    }

    &:before {
      transition: 0.3s 0.2s cubic-bezier(0.6, 0, 0.2, 1) transform;
      transform: rotate(45deg) translateX(-50px);
      .Page-sidebarState:checked + .Page & {
        transform: rotate(45deg) translateX(0);
      }
    }

    &:after {
      transition: 0.3s 0.25s cubic-bezier(0.6, 0, 0.2, 1) transform;
      transform: rotate(-45deg) translateX(50px);
      .Page-sidebarState:checked + .Page & {
        transform: rotate(-45deg) translateX(0);
      }
    }
  }

  .sidebar__socials-container {
    display: flex;
    align-items: center;
    margin-top: 45px;
  }

  .sidebar__social-wrapper {
    margin-right: 8px;
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background-color: color('primaryColor');
    display: flex;
    justify-content: center;
    align-items: center;

    .svg-icon {
      fill: color('light');
      height: 16px;
    }
  }

  a.Page-sidebarContentFooter {
    color: #ccc;
    font-size: 14px;
    border-top: 1px solid #ddd;
    padding: 20px 0 20px 20px;
    background: color(black);
    margin: 45px -20px 0 -20px;
    width: calc(100% + 40px);
    height: 110px;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    > span {
      padding-left: $spacer/2;
      display: inline-block;
      line-height: 1.4;
    }
  }

  .DraftMode {
    position: fixed;
    bottom: 0;
    left: 0;
    background: white;
    z-index: 99999999999;
    background: #09B3AF;
    color: white;
    font-size: 12px;
    padding: 3px 5px;
  }

  #optanon *, #optanon *:before, #optanon *:after {
    -webkit-box-sizing: content-box;
    -moz-box-sizing: content-box;
    box-sizing: content-box;
  }

  #optanon, #optanon *, #optanon div, #optanon span, #optanon ul, #optanon li, #optanon a, #optanon p, .optanon-alert-box-wrapper * {
    font-family: Arial, sans-serif;
    background: none;
    border: none;
  }

  ._form_18 {
    ._form-content {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
    }

    ._inline-style {
      float: none;
    }

    ._form_element {
      margin-bottom: 20px!important;
    }

    ._form-label {
      color: color('primaryColor');
      font-family: $font-primary!important;
      font-family: $font-primary!important;
      font-weight: normal!important;
    }

    ._field11 {
      display: none;
    }

    input[type=text] {
      border: none!important;
      border-radius: 0!important;
      width: 200px!important;
      height: 42px!important;
      font-size: 16px!important;
      color: color('primaryColor')!important;
      font-family: $font-primary!important;

      &::placeholder {
        color: color('medium')!important;
      }
    }

    ._field27 {
      display: flex;
      flex-wrap: wrap;
      width: 320px;

      ._form-label {
        flex: 100%;
        line-height: 1;
      }
    }

    ._checkbox-radio {
      display: flex;
      align-items: center;
      margin-right: 10px;
      height: 42px;

      label {
        font-size: 16px!important;
        font-weight: normal!important;
        color: color('primaryColor')!important;
        font-family: $font-primary!important;
      }
    }

    input[type=radio] {
      margin-right: 6px;
    }

    ._button-wrapper {
      margin: 0;
      flex: 100%;
    }

    #_form_18_submit {
      display: block;
      margin: 0 auto;
      background: transparent!important;
      border-radius: 0!important;
      border: 1px solid color('primaryColor')!important;
      color: color('primaryColor')!important;
      text-transform: uppercase!important;
      font-size: 12px!important;
      height: 42px!important;
      padding-left: 28px!important;
      padding-right: 28px!important; 
      font-family: $font-primary!important;
    }
  }
</style>
