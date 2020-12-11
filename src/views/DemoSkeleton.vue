<template>
<div>
    <button @click="load">Load async content</button>
    <button @click="make">Make loading</button>
  <div style="display: flex">

  <article class="default">
    <div :aria-hidden="hidden" class="skeleton link-heading-img-txt">
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
      <span>Loading</span>
    </div>
    <div :aria-busy="busy">
      <a href="https://example.com/linkwrap" rel="nofollow">
        <h3>Wrapping Entire Thing</h3>
        <img src="https://www.fillmurray.com/640/360" width="640" height="360" alt="Bill Murray on the award carpet.">
        <p>
          Gastropub sartorial venmo hashtag, franzen actually umami small batch vinyl taiyaki. Seitan organic dreamcatcher
          pinterest, tilde franzen ugh tattooed PBR&B etsy bitters brooklyn yuccie listicle bicycle rights. Keytar
          keffiyeh glossier roof party. YOLO palo santo godard, organic lomo roof party tumeric affogato bicycle rights.
        </p>
      </a>
    </div>
  </article>

   <section class="block">
    <div :aria-hidden="hidden" class="skeleton button-heading-txt-btn">
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
      <div aria-hidden="true"></div>
      <span>Loading</span>
    </div>
    <div :aria-busy="busy">
      <h3>Only on Settings Text</h3>
      <p>
        Hundreds of thousands how far away not a sunrise but a galaxyrise paroxysm of global death gathered by gravity
        preserve and cherish that pale blue dot?
      </p>
      <button type="button" onclick="alert('You look nice in that shirt.');">
        <span>Settings</span>
      </button>
    </div>
  </section>
  </div>
</div>
</template>

<script>
export default {
    data() {
        return {
            hidden: true,
            busy: false
        }
    },
    methods: {
        load() {
            setTimeout(async () => {
                this.hidden = true
                this.busy = false
                await this.sleep(500)
            }, 3000)
        },
        make() {
          this.hidden = ''
          this.busy = true
        },
        sleep (ms) {
          return new Promise(resolve => setTimeout(resolve, ms))
        }
    }
}
</script>

<style scoped>

article, section.block {
  padding: .5em 1em;
  margin: 0 0.5em 1em 0.5em;
  flex: 0 1 20em;
  border: .2em solid rgba(0,0,0,.15);
  border-radius: 1em;
  background-color: #fff;
}

img {
  max-width: 100%;
  height: auto;
}

h3 {
  margin: .2em 0;
  line-height: 1.2;
}

a:focus, a:hover {
  text-decoration: none;
}

.default a:link {
  text-decoration: none;
  color: #333;
}

.default a:focus h3, .default a:hover h3 {
  color: #00f;
  text-decoration: underline;
}

button {
  font: inherit;
  width: 100%;
  text-align: left;
  background: transparent;
  border: none;
  padding: 0;
  margin: 0;
}

button:focus, button:hover {
  outline: none;
}

button span {
  display: block;
  text-align: center;
  padding: .5em 1em;
  margin: .5em 1em;
  border: .1em solid #00c;
  border-radius: .25em;
  background-color: #00c;
  color: #fff;
}

button:focus span, button:hover span {
  color: #00c;
  background-color: #fff;
}

/* Block links */

.block {
  position: relative;
}

.block a[href]::after, .block button::after {
  content: "";
  display: block;
  position: absolute;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
}

.block:hover, .block:focus-within, .default:hover, .default:focus-within {
  border-color: rgba(0,0,255,.5);
  box-shadow: 0 0 .5em rgba(0,0,0,.25);
}

/* Help out IE */

.block a[href]:hover, .block a[href]:focus {
  outline: .4em solid rgba(0,0,255,.25);
  outline-offset: .25em;
}

/* Undo the IE */

.block:hover a[href]:hover, .block:hover a[href]:focus, .block:hover button:focus, .block:hover button:hover, .block:focus-within a[href]:hover, .block:focus-within a[href]:focus, .block:focus-within button:focus, .block:focus-within button:hover {
  outline: none;
}

/* ================================== */
/* Skeletons and asynchronous content */
/* ================================== */

aside {
  display: flex;
  flex-wrap: wrap;
}

aside > * {
  margin: .5em;
}

.skeleton {
  cursor: progress;
}

.skeleton div {
  height: 2em;
  margin: .5em 0;
  padding: 0;
  border-radius: .25em;
  background: linear-gradient(-60deg, rgba(238,238,238,1) 0, rgba(238,238,238,1) 120px, rgba(250,250,250,1) 150px, rgba(238,238,238,1) 180px, rgba(238,238,238,1) 100%);
}

@keyframes gradientBG {
	from { background-position: 0px; }
	to { background-position: 315px; }
}

@media (prefers-reduced-motion: no-preference) {
  .skeleton div {
/*  setting animation-iteration-count to 2.5    */
/*  so it does not exceed 5s per WCAG 2.2.2    */
    /* animation: gradientBG 2s ease 2.5; */
    animation: gradientBG 2s ease infinite;
  }
  .skeleton.animate div{
    animation: gradientBG 2s ease infinite;
  }
}

.skeleton.link-heading-img-txt div:nth-child(2),
.skeleton.link-heading-img-txt div:nth-child(3) {
  height: 10em;
}

.skeleton.link-img-heading-txt div:nth-child(1),
.skeleton.link-img-heading-txt div:nth-child(3) {
  height: 10em;
}

.skeleton.button-heading-txt-btn div:nth-child(2) {
  height: 6em;
}

.skeleton.button-heading-txt-btn div:nth-child(3) {
  height: 3em;
}

section *[aria-busy=true], article *[aria-busy=true], .skeleton[aria-hidden=true] {
/* Only throwing !important in here so I do not have to unwire all my styles above */
  display: none !important;
}

.visually-hidden, .skeleton > span {
  position: absolute;
  top: auto;
  overflow: hidden;
  clip: rect(1px, 1px, 1px, 1px);
  width: 1px;
  height: 1px;
  white-space: nowrap;
}
</style>