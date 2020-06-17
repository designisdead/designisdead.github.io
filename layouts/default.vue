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

          <p class="Page-sidebarContentSocial">
            <a
              href="https://twitter.com/designisdead"
              target="_blank"
              rel="noopener"
              title="Visit our twitter page"
              class="u-color--twitter">
              <icon
                type="twitter"
                size="small"/>
            </a>
            &nbsp;
            <a
              href="https://www.facebook.com/DesignisDead/"
              target="_blank"
              rel="noopener"
              title="Visit our facebook page"
              class="u-color--facebook">
              <icon
                type="facebook"
                size="small"/>
            </a>
            &nbsp;
            <a
              href="https://www.linkedin.com/company/design-is-dead"
              target="_blank"
              rel="noopener"
              title="Visit our linkedin page"
              class="u-color--linkedin">
              <icon
                type="linkedin"
                size="small"/>
            </a>
            &nbsp;
            <a
              href="https://www.instagram.com/design.is.dead/"
              target="_blank"
              rel="noopener"
              title="Visit our instagram page"
              class="u-color--instagram">
              <icon
                type="instagram"
                size="small"/>
            </a>
          </p>

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

    <wrapper
      size="large"
      :blok="{
        backgroundcolor: 'u-backgroundColor--textLight',
        layout: 'shrinked'
      }">

      <div class="job-form__wrapper">
        <style>
          #_form_18_ { font-size:14px; line-height:1.6; font-family:arial, helvetica, sans-serif; margin:0; }
          #_form_18_ * { outline:0; }
          ._form_hide { display:none; visibility:hidden; }
          ._form_show { display:block; visibility:visible; }
          #_form_18_._form-top { top:0; }
          #_form_18_._form-bottom { bottom:0; }
          #_form_18_._form-left { left:0; }
          #_form_18_._form-right { right:0; }
          #_form_18_ input[type="text"],#_form_18_ input[type="date"],#_form_18_ textarea { padding:6px; height:auto; border:#979797 1px solid; border-radius:4px; color:#000; font-size:14px; -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box; }
          #_form_18_ textarea { resize:none; }
          #_form_18_ ._submit { -webkit-appearance:none; cursor:pointer; font-family:arial, sans-serif; font-size:14px; text-align:center; background:#030303; border:0; color:#fff; padding:10px; }
          #_form_18_ ._close-icon { cursor:pointer; background-image:url('https://d226aj4ao1t61q.cloudfront.net/esfkyjh1u_forms-close-dark.png'); background-repeat:no-repeat; background-size:14.2px 14.2px; position:absolute; display:block; top:11px; right:9px; overflow:hidden; width:16.2px; height:16.2px; }
          #_form_18_ ._close-icon:before { position:relative; }
          #_form_18_ ._form-body { margin-bottom:30px; }
          #_form_18_ ._form-image-left { width:150px; float:left; }
          #_form_18_ ._form-content-right { margin-left:164px; }
          #_form_18_ ._form-branding { color:#fff; font-size:10px; clear:both; text-align:left; margin-top:30px; font-weight:100; }
          #_form_18_ ._form-branding ._logo { display:block; width:130px; height:14px; margin-top:6px; background-image:url('https://d226aj4ao1t61q.cloudfront.net/hh9ujqgv5_aclogo_li.png'); background-size:130px auto; background-repeat:no-repeat; }
          #_form_18_ ._form-label,#_form_18_ ._form_element ._form-label { font-weight:bold; margin-bottom:5px; display:block; }
          #_form_18_._dark ._form-branding { color:#333; }
          #_form_18_._dark ._form-branding ._logo { background-image:url('https://d226aj4ao1t61q.cloudfront.net/jftq2c8s_aclogo_dk.png'); }
          #_form_18_ ._form_element { position:relative; margin-bottom:10px; font-size:0; max-width:100%; }
          #_form_18_ ._form_element * { font-size:14px; }
          #_form_18_ ._form_element._clear { clear:both; width:100%; float:none; }
          #_form_18_ ._form_element._clear:after { clear:left; }
          #_form_18_ ._form_element input[type="text"],#_form_18_ ._form_element input[type="date"],#_form_18_ ._form_element select,#_form_18_ ._form_element textarea:not(.g-recaptcha-response) { display:block; width:100%; -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box; }
          #_form_18_ ._field-wrapper { position:relative; }
          #_form_18_ ._inline-style { float:left; }
          #_form_18_ ._inline-style input[type="text"] { width:150px; }
          #_form_18_ ._inline-style:not(._clear) + ._inline-style:not(._clear) { margin-left:20px; }
          #_form_18_ ._form_element img._form-image { max-width:100%; }
          #_form_18_ ._clear-element { clear:left; }
          #_form_18_ ._full_width { width:100%; }
          #_form_18_ ._form_full_field { display:block; width:100%; margin-bottom:10px; }
          #_form_18_ input[type="text"]._has_error,#_form_18_ textarea._has_error { border:#f37c7b 1px solid; }
          #_form_18_ input[type="checkbox"]._has_error { outline:#f37c7b 1px solid; }
          #_form_18_ ._error { display:block; position:absolute; font-size:14px; z-index:10000001; }
          #_form_18_ ._error._above { padding-bottom:4px; bottom:39px; right:0; }
          #_form_18_ ._error._below { padding-top:4px; top:100%; right:0; }
          #_form_18_ ._error._above ._error-arrow { bottom:0; right:15px; border-left:5px solid transparent; border-right:5px solid transparent; border-top:5px solid #f37c7b; }
          #_form_18_ ._error._below ._error-arrow { top:0; right:15px; border-left:5px solid transparent; border-right:5px solid transparent; border-bottom:5px solid #f37c7b; }
          #_form_18_ ._error-inner { padding:8px 12px; background-color:#f37c7b; font-size:14px; font-family:arial, sans-serif; color:#fff; text-align:center; text-decoration:none; -webkit-border-radius:4px; -moz-border-radius:4px; border-radius:4px; }
          #_form_18_ ._error-inner._form_error { margin-bottom:5px; text-align:left; }
          #_form_18_ ._button-wrapper ._error-inner._form_error { position:static; }
          #_form_18_ ._error-inner._no_arrow { margin-bottom:10px; }
          #_form_18_ ._error-arrow { position:absolute; width:0; height:0; }
          #_form_18_ ._error-html { margin-bottom:10px; }
          .pika-single { z-index:10000001 !important; }
          #_form_18_ input[type="text"].datetime_date { width:69%; display:inline; }
          #_form_18_ select.datetime_time { width:29%; display:inline; height:32px; }
          @media all and (min-width:320px) and (max-width:667px) { ::-webkit-scrollbar { display:none; }
          #_form_18_ { margin:0; width:100%; min-width:100%; max-width:100%; box-sizing:border-box; }
          #_form_18_ * { -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box; font-size:1em; }
          #_form_18_ ._form-content { margin:0; width:100%; }
          #_form_18_ ._form-inner { display:block; min-width:100%; }
          #_form_18_ ._form-title,#_form_18_ ._inline-style { margin-top:0; margin-right:0; margin-left:0; }
          #_form_18_ ._form-title { font-size:1.2em; }
          #_form_18_ ._form_element { margin:0 0 20px; padding:0; width:100%; }
          #_form_18_ ._form-element,#_form_18_ ._inline-style,#_form_18_ input[type="text"],#_form_18_ label,#_form_18_ p,#_form_18_ textarea:not(.g-recaptcha-response) { float:none; display:block; width:100%; }
          #_form_18_ ._row._checkbox-radio label { display:inline; }
          #_form_18_ ._row,#_form_18_ p,#_form_18_ label { margin-bottom:0.7em; width:100%; }
          #_form_18_ ._row input[type="checkbox"],#_form_18_ ._row input[type="radio"] { margin:0 !important; vertical-align:middle !important; }
          #_form_18_ ._row input[type="checkbox"] + span label { display:inline; }
          #_form_18_ ._row span label { margin:0 !important; width:initial !important; vertical-align:middle !important; }
          #_form_18_ ._form-image { max-width:100%; height:auto !important; }
          #_form_18_ input[type="text"] { padding-left:10px; padding-right:10px; font-size:16px; line-height:1.3em; -webkit-appearance:none; }
          #_form_18_ input[type="radio"],#_form_18_ input[type="checkbox"] { display:inline-block; width:1.3em; height:1.3em; font-size:1em; margin:0 0.3em 0 0; vertical-align:baseline; }
          #_form_18_ button[type="submit"] { padding:20px; font-size:1.5em; }
          #_form_18_ ._inline-style { margin:20px 0 0 !important; }
          }
          #_form_18_ { position:relative; text-align:left; margin:25px auto 0; padding:20px; -webkit-box-sizing:border-box; -moz-box-sizing:border-box; box-sizing:border-box; *zoom:1; background:transparent !important; border:0px solid #b0b0b0 !important; -moz-border-radius:0px !important; -webkit-border-radius:0px !important; border-radius:0px !important; color:#000 !important; }
          #_form_18_ ._form-title { font-size:22px; line-height:22px; font-weight:600; margin-bottom:0; }
          #_form_18_:before,#_form_18_:after { content:" "; display:table; }
          #_form_18_:after { clear:both; }
          #_form_18_._inline-style { width:auto; display:inline-block; }
          #_form_18_._inline-style input[type="text"],#_form_18_._inline-style input[type="date"] { padding:10px 12px; }
          #_form_18_._inline-style button._inline-style { position:relative; top:27px; }
          #_form_18_._inline-style p { margin:0; }
          #_form_18_._inline-style ._button-wrapper { position:relative; margin:27px 12.5px 0 20px; }
          #_form_18_ ._form-thank-you { position:relative; left:0; right:0; text-align:center; font-size:18px; }
          @media all and (min-width:320px) and (max-width:667px) { #_form_18_._inline-form._inline-style ._inline-style._button-wrapper { margin-top:20px !important; margin-left:0 !important; }
          }

          #_form_18_ ._x03259613 label { display:none; }
          #_form_18_ ._x04713497 label { display:none; }
          </style>
          <div style="text-align: center;">
            <form method="POST" action="https://designisdead.activehosted.com/proc.php" id="_form_18_" class="_form _form_18 _inline-form _inline-style _dark" novalidate>
              <input type="hidden" name="u" value="18" />
              <input type="hidden" name="f" value="18" />
              <input type="hidden" name="s" />
              <input type="hidden" name="c" value="0" />
              <input type="hidden" name="m" value="0" />
              <input type="hidden" name="act" value="sub" />
              <input type="hidden" name="v" value="2" />
              <div class="_form-content">
                <div class="_form_element _x22102590 _inline-style _clear" >
                  <div class="_html-code">
                    <p>
                      <span>
                        Hello Design is Dead I'm...
                      </span>
                      <span>
                        and I'm interested in:
                      </span>
                    </p>
                  </div>
                </div>
                <div class="_form_element _x04713497 _inline-style " >
                  <label class="_form-label">
                    Full Name
                  </label>
                  <div class="_field-wrapper">
                    <input type="text" name="fullname" placeholder="Type your name" />
                  </div>
                </div>
                <div class="_form_element _x03259613 _inline-style " >
                  <label class="_form-label">
                    Email*
                  </label>
                  <div class="_field-wrapper">
                    <input type="text" name="email" placeholder="Your email*" required/>
                  </div>
                </div>
                <div class="_form_element _field11 _inline-style " >
                  <input type="hidden" name="field[11]" value="" />
                </div>
                <div class="_form_element _field27 _inline-style " >
                  <label class="_form-label">
                    and I&#039;m interested in:*
                  </label>
                  <div class="_row _checkbox-radio">
                    <input id="field_27Job" type="radio" name="field[27]" value="Job"  required>
                    <span>
                      <label for="field_27Job">
                        Job
                      </label>
                    </span>
                    </div>
                    <div class="_row _checkbox-radio">
                      <input id="field_27Internship" type="radio" name="field[27]" value="Internship"  >
                      <span>
                        <label for="field_27Internship">
                          Internship
                        </label>
                      </span>
                      </div>
                      <div class="_row _checkbox-radio">
                        <input id="field_27Spontaneous contact" type="radio" name="field[27]" value="Spontaneous contact"  >
                        <span>
                          <label for="field_27Spontaneous contact">
                            Spontaneous contact
                          </label>
                        </span>
                        </div>
                      </div>
                      <div class="_button-wrapper _inline-style">
                        <button id="_form_18_submit" class="_submit" type="submit">
                          Contact us
                        </button>
                      </div>
                      <div class="_clear-element">
                      </div>
                    </div>
                    <div class="_form-thank-you" style="display:none;">
                    </div>
                  </form>
                </div><script type="text/javascript">
          window.cfields = {"11":"job","27":"and_im_interested_in"};
          window._show_thank_you = function(id, message, trackcmp_url) {
            var form = document.getElementById('_form_' + id + '_'), thank_you = form.querySelector('._form-thank-you');
            form.querySelector('._form-content').style.display = 'none';
            thank_you.innerHTML = message;
            thank_you.style.display = 'block';
            if (typeof(trackcmp_url) != 'undefined' && trackcmp_url) {
              // Site tracking URL to use after inline form submission.
              _load_script(trackcmp_url);
            }
            if (typeof window._form_callback !== 'undefined') window._form_callback(id);
          };
          window._show_error = function(id, message, html) {
            var form = document.getElementById('_form_' + id + '_'), err = document.createElement('div'), button = form.querySelector('button'), old_error = form.querySelector('._form_error');
            if (old_error) old_error.parentNode.removeChild(old_error);
            err.innerHTML = message;
            err.className = '_error-inner _form_error _no_arrow';
            var wrapper = document.createElement('div');
            wrapper.className = '_form-inner';
            wrapper.appendChild(err);
            button.parentNode.insertBefore(wrapper, button);
            document.querySelector('[id^="_form"][id$="_submit"]').disabled = false;
            if (html) {
              var div = document.createElement('div');
              div.className = '_error-html';
              div.innerHTML = html;
              err.appendChild(div);
            }
          };
          window._load_script = function(url, callback) {
            var head = document.querySelector('head'), script = document.createElement('script'), r = false;
            script.type = 'text/javascript';
            script.charset = 'utf-8';
            script.src = url;
            if (callback) {
              script.onload = script.onreadystatechange = function() {
                if (!r && (!this.readyState || this.readyState == 'complete')) {
                  r = true;
                  callback();
                }
              };
            }
            head.appendChild(script);
          };
          (function() {
            if (window.location.search.search("excludeform") !== -1) return false;
            var getCookie = function(name) {
              var match = document.cookie.match(new RegExp('(^|; )' + name + '=([^;]+)'));
              return match ? match[2] : null;
            }
            var setCookie = function(name, value) {
              var now = new Date();
              var time = now.getTime();
              var expireTime = time + 1000 * 60 * 60 * 24 * 365;
              now.setTime(expireTime);
              document.cookie = name + '=' + value + '; expires=' + now + ';path=/';
            }
                var addEvent = function(element, event, func) {
              if (element.addEventListener) {
                element.addEventListener(event, func);
              } else {
                var oldFunc = element['on' + event];
                element['on' + event] = function() {
                  oldFunc.apply(this, arguments);
                  func.apply(this, arguments);
                };
              }
            }
            var _removed = false;
            var form_to_submit = document.getElementById('_form_18_');
            var allInputs = form_to_submit.querySelectorAll('input, select, textarea'), tooltips = [], submitted = false;

            var getUrlParam = function(name) {
              var regexStr = '[\?&]' + name + '=([^&#]*)';
              var results = new RegExp(regexStr, 'i').exec(window.location.href);
              return results != undefined ? decodeURIComponent(results[1]) : false;
            };

            for (var i = 0; i < allInputs.length; i++) {
              var regexStr = "field\\[(\\d+)\\]";
              var results = new RegExp(regexStr).exec(allInputs[i].name);
              if (results != undefined) {
                allInputs[i].dataset.name = window.cfields[results[1]];
              } else {
                allInputs[i].dataset.name = allInputs[i].name;
              }
              var fieldVal = getUrlParam(allInputs[i].dataset.name);

              if (fieldVal) {
                if (allInputs[i].dataset.autofill === "false") {
                  continue;
                }
                if (allInputs[i].type == "radio" || allInputs[i].type == "checkbox") {
                  if (allInputs[i].value == fieldVal) {
                    allInputs[i].checked = true;
                  }
                } else {
                  allInputs[i].value = fieldVal;
                }
              }
            }

            var remove_tooltips = function() {
              for (var i = 0; i < tooltips.length; i++) {
                tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
              }
              tooltips = [];
            };
            var remove_tooltip = function(elem) {
              for (var i = 0; i < tooltips.length; i++) {
                if (tooltips[i].elem === elem) {
                  tooltips[i].tip.parentNode.removeChild(tooltips[i].tip);
                  tooltips.splice(i, 1);
                  return;
                }
              }
            };
            var create_tooltip = function(elem, text) {
              var tooltip = document.createElement('div'), arrow = document.createElement('div'), inner = document.createElement('div'), new_tooltip = {};
              if (elem.type != 'radio' && elem.type != 'checkbox') {
                tooltip.className = '_error';
                arrow.className = '_error-arrow';
                inner.className = '_error-inner';
                inner.innerHTML = text;
                tooltip.appendChild(arrow);
                tooltip.appendChild(inner);
                elem.parentNode.appendChild(tooltip);
              } else {
                tooltip.className = '_error-inner _no_arrow';
                tooltip.innerHTML = text;
                elem.parentNode.insertBefore(tooltip, elem);
                new_tooltip.no_arrow = true;
              }
              new_tooltip.tip = tooltip;
              new_tooltip.elem = elem;
              tooltips.push(new_tooltip);
              return new_tooltip;
            };
            var resize_tooltip = function(tooltip) {
              var rect = tooltip.elem.getBoundingClientRect();
              var doc = document.documentElement, scrollPosition = rect.top - ((window.pageYOffset || doc.scrollTop)  - (doc.clientTop || 0));
              if (scrollPosition < 40) {
                tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _below';
              } else {
                tooltip.tip.className = tooltip.tip.className.replace(/ ?(_above|_below) ?/g, '') + ' _above';
              }
            };
            var resize_tooltips = function() {
              if (_removed) return;
              for (var i = 0; i < tooltips.length; i++) {
                if (!tooltips[i].no_arrow) resize_tooltip(tooltips[i]);
              }
            };
            var validate_field = function(elem, remove) {
              var tooltip = null, value = elem.value, no_error = true;
              remove ? remove_tooltip(elem) : false;
              if (elem.type != 'checkbox') elem.className = elem.className.replace(/ ?_has_error ?/g, '');
              if (elem.getAttribute('required') !== null) {
                if (elem.type == 'radio' || (elem.type == 'checkbox' && /any/.test(elem.className))) {
                  var elems = form_to_submit.elements[elem.name];
                  if (!(elems instanceof NodeList || elems instanceof HTMLCollection) || elems.length <= 1) {
                    no_error = elem.checked;
                  }
                  else {
                    no_error = false;
                    for (var i = 0; i < elems.length; i++) {
                      if (elems[i].checked) no_error = true;
                    }
                  }
                  if (!no_error) {
                    tooltip = create_tooltip(elem, "Please select an option.");
                  }
                } else if (elem.type =='checkbox') {
                  var elems = form_to_submit.elements[elem.name], found = false, err = [];
                  no_error = true;
                  for (var i = 0; i < elems.length; i++) {
                    if (elems[i].getAttribute('required') === null) continue;
                    if (!found && elems[i] !== elem) return true;
                    found = true;
                    elems[i].className = elems[i].className.replace(/ ?_has_error ?/g, '');
                    if (!elems[i].checked) {
                      no_error = false;
                      elems[i].className = elems[i].className + ' _has_error';
                      err.push("Checking %s is required".replace("%s", elems[i].value));
                    }
                  }
                  if (!no_error) {
                    tooltip = create_tooltip(elem, err.join('<br/>'));
                  }
                } else if (elem.tagName == 'SELECT') {
                  var selected = true;
                  if (elem.multiple) {
                    selected = false;
                    for (var i = 0; i < elem.options.length; i++) {
                      if (elem.options[i].selected) {
                        selected = true;
                        break;
                      }
                    }
                  } else {
                    for (var i = 0; i < elem.options.length; i++) {
                      if (elem.options[i].selected && !elem.options[i].value) {
                        selected = false;
                      }
                    }
                  }
                  if (!selected) {
                    elem.className = elem.className + ' _has_error';
                    no_error = false;
                    tooltip = create_tooltip(elem, "Please select an option.");
                  }
                } else if (value === undefined || value === null || value === '') {
                  elem.className = elem.className + ' _has_error';
                  no_error = false;
                  tooltip = create_tooltip(elem, "This field is required.");
                }
              }
              if (no_error && elem.name == 'email') {
                if (!value.match(/^[\+_a-z0-9-'&=]+(\.[\+_a-z0-9-']+)*@[a-z0-9-]+(\.[a-z0-9-]+)*(\.[a-z]{2,})$/i)) {
                  elem.className = elem.className + ' _has_error';
                  no_error = false;
                  tooltip = create_tooltip(elem, "Enter a valid email address.");
                }
              }
              if (no_error && /date_field/.test(elem.className)) {
                if (!value.match(/^\d\d\d\d-\d\d-\d\d$/)) {
                  elem.className = elem.className + ' _has_error';
                  no_error = false;
                  tooltip = create_tooltip(elem, "Enter a valid date.");
                }
              }
              tooltip ? resize_tooltip(tooltip) : false;
              return no_error;
            };
            var needs_validate = function(el) {
                  if(el.getAttribute('required') !== null){
                      return true
                  }
                  if(el.name === 'email' && el.value !== ""){
                      return true
                  }
                  return false
            };
            var validate_form = function(e) {
              var err = form_to_submit.querySelector('._form_error'), no_error = true;
              if (!submitted) {
                submitted = true;
                for (var i = 0, len = allInputs.length; i < len; i++) {
                  var input = allInputs[i];
                  if (needs_validate(input)) {
                    if (input.type == 'text') {
                      addEvent(input, 'blur', function() {
                        this.value = this.value.trim();
                        validate_field(this, true);
                      });
                      addEvent(input, 'input', function() {
                        validate_field(this, true);
                      });
                    } else if (input.type == 'radio' || input.type == 'checkbox') {
                      (function(el) {
                        var radios = form_to_submit.elements[el.name];
                        for (var i = 0; i < radios.length; i++) {
                          addEvent(radios[i], 'click', function() {
                            validate_field(el, true);
                          });
                        }
                      })(input);
                    } else if (input.tagName == 'SELECT') {
                      addEvent(input, 'change', function() {
                        validate_field(this, true);
                      });
                    } else if (input.type == 'textarea'){
                      addEvent(input, 'input', function() {
                        validate_field(this, true);
                      });
                    }
                  }
                }
              }
              remove_tooltips();
              for (var i = 0, len = allInputs.length; i < len; i++) {
                var elem = allInputs[i];
                if (needs_validate(elem)) {
                  if (elem.tagName.toLowerCase() !== "select") {
                    elem.value = elem.value.trim();
                  }
                  validate_field(elem) ? true : no_error = false;
                }
              }
              if (!no_error && e) {
                e.preventDefault();
              }
              resize_tooltips();
              return no_error;
            };
            addEvent(window, 'resize', resize_tooltips);
            addEvent(window, 'scroll', resize_tooltips);
            window._old_serialize = null;
            if (typeof serialize !== 'undefined') window._old_serialize = window.serialize;
            _load_script("//d3rxaij56vjege.cloudfront.net/form-serialize/0.3/serialize.min.js", function() {
              window._form_serialize = window.serialize;
              if (window._old_serialize) window.serialize = window._old_serialize;
            });
            var form_submit = function(e) {
              e.preventDefault();
              if (validate_form()) {
                // use this trick to get the submit button & disable it using plain javascript
                document.querySelector('#_form_18_submit').disabled = true;
                      var serialized = _form_serialize(document.getElementById('_form_18_'));
                var err = form_to_submit.querySelector('._form_error');
                err ? err.parentNode.removeChild(err) : false;
                _load_script('https://designisdead.activehosted.com/proc.php?' + serialized + '&jsonp=true');
              }
              return false;
            };
            addEvent(form_to_submit, 'submit', form_submit);
          })();

        </script>
      </div>
    </wrapper>
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
        window.scrollY > 100 ? (
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
    padding-top: 50px;
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
      height: 4px;
      background: black;
      margin: 4px 0;
    }

    &:before,
    &:after {
      display: block;
      content: " ";
      width: 30px;
      height: 4px;
      background: color("dark");
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
    padding: $spacer/3 0;
    text-transform: uppercase;
    font-size: 1rem;
    transition: 0.25s ease opacity;
    will-change: opacity;
    height: 100%;
    &:hover {
      text-decoration: none;
      opacity: 0.5;
    }
  }

  .Navigation-contact {
    color: color('textLight');
    cursor: pointer;
    user-select: none;
  }

  .Page-close {
    position: absolute;
    top: $spacer/4;
    right: $spacer/4;
    width: 40px;
    height: 40px;
    text-indent: -9999px;
    &:before,
    &:after {
      position: absolute;
      content: " ";
      display: block;
      background: color("dark");
      will-change: transform;
      top: 50%;
      left: 50%;
      width: 24px;
      height: 3px;
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

  .Page-sidebarContentSocial {
    margin-top: $spacer / 3;
  }

  a.Page-sidebarContentFooter {
    color: #ccc;
    font-size: 12px;
    border-top: 1px solid #ddd;
    padding-top: 19px;
    padding-left: $spacer/2;
    background: black;
    margin: 10px -20px 0 -20px;
    width: calc(100% + 40px);
    padding-bottom: 20px !important;
    display: flex;
    align-items: center;
    text-decoration: none;
    cursor: pointer;
    > span {
      padding-left: $spacer/2;
      display: inline-block;
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
    }

    ._inline-style {
      float: none;
    }

    ._form-label {
      display: none!important;
    }

    ._field11 {
      display: none;
    }

    ._x22102590 {
      color: color('primaryColor');
      flex: 100%;

      p {
        padding-bottom: 0px;
        font-family: $font-primary!important;
        text-align: center;

        span {
          font-size: 16px!important;
        }
      }
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
    }

    ._checkbox-radio {
      display: flex;
      align-items: center;
      margin-right: 6px;

      label {
        font-size: 16px!important;
        font-weight: normal!important;
        color: color('primaryColor')!important;
        font-family: $font-primary!important;
      }
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
