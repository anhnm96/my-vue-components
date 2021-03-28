<template>
<div>
  <article class="default">
    <div :aria-hidden="false">
        <skeleton-box width="100%" height="3em" /><br>
        <skeleton-box height="6em" /><br>
        <skeleton-box width="100%" :min-width="50" height="6em" :max-width="70" />
      <span class="sr-only">Loading</span>
    </div>
  </article>

</div>
</template>

<script>
import SkeletonBox from '@/components/SkeletonBox'
export default {
  components: {SkeletonBox},
}
</script>

<style>

article, section.block {
  padding: .5em 1em;
  margin: 0 0.5em 1em 0.5em;
  flex: 0 1 20em;
  border: .2em solid rgba(0,0,0,.25);
  border-radius: 1em;
  background-color: #fff;
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
  background: linear-gradient(-60deg,
   rgba(238,238,238,1) 0,
   rgba(238,238,238,1) 120px,
   rgba(250,250,250,1) 150px,
   rgba(238,238,238,1) 180px,
   rgba(238,238,238,1) 100%);
}
.skeleton.C3t1 div {
/* Full neon */
  background: linear-gradient(-60deg, #000 0, #000 130px, #A43348 146px, #f00 147px, #FF69B4 149px, #FFDBED 150px, #FF69B4 151px, #f00 153px, #A43348 154px, #000 170px, #000 100%);
}
@keyframes gradientBG {
	0% { background-position: 0px; }
	100% { background-position: 282px; }
}

@media (prefers-reduced-motion: no-preference) {
  .skeleton div {
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

/* The following CSS visually hides the <span>, but still leaves it available for a screen reader */
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
