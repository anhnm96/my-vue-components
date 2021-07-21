<template>
  <div>
    <!-- div.item(id="drawing" ref="img" ) -->
    <img
      id="drawing"
      ref="img"
      src="https://images.pexels.com/photos/556416/pexels-photo-556416.jpeg?auto=compress&cs=tinysrgb&dpr=3&h=300&w=300"
      alt="img"
      width="555"
      height="320"
      @mouseout="removeDrag"
    >
  </div>
</template>

<script>
export default {
  data: () => ({
    defaults: {
      zoom: 0.05,
      maxZoom: false,
      initialZoom: 1,
      initialX: 0.5,
      initialY: 0.5
    },
    settings: {},
		width: null,
		height: null,
		bgWidth: null,
		bgHeight: null,
		bgPosX: null,
		bgPosY: null,
		previousEvent: null,
		transparentSpaceFiller: null
  }),
  mounted() {
    // console.log('src', this.$refs.img.src)
    // console.log('style', this.$refs.img.style)
    // console.log('styleSize', this.$refs.img.style.backgroundSize)
    // console.log('naturalWidth', this.$refs.img.naturalWidth)
    // console.log('getBoundingClientRect', this.$refs.img.getBoundingClientRect())
    // img.removeEventListener('wheelzoom.destroy', destroy);
    // this.$refs.img.removeEventListener('wheelzoom.reset', this.reset);
    // this.$refs.img.removeEventListener('load', this.load);
    // this.$refs.img.removeEventListener('mouseup', this.removeDrag);
    // this.$refs.img.removeEventListener('mousemove', this.drag);
    // this.$refs.img.removeEventListener('mousedown', this.draggable);
    // this.$refs.img.removeEventListener('wheel', this.onwheel);
    const originalProperties = {
      backgroundImage: this.$refs.img.style.backgroundImage,
      backgroundRepeat: this.$refs.img.style.backgroundRepeat,
      src: this.$refs.img.src
    }
    this.$refs.img.style.backgroundImage = originalProperties.backgroundImage;
    this.$refs.img.style.backgroundRepeat = originalProperties.backgroundRepeat;
    this.$refs.img.src = originalProperties.src;

		// this.$refs.img.addEventListener('wheelzoom.destroy', destroy);

		const options = {};

		// Object.keys(this.defaults).forEach(function(key){
		// 	this.settings[key] = options[key] !== undefined ? options[key] : this.defaults[key];
    // });
    
    this.settings = this.defaults

		// if (this.$refs.img.complete) {
		// 	this.load();
		// }

		this.$refs.img.addEventListener('load', this.load);
  },
  methods: {
    setSrcToBackground(img) {
			this.$refs.img.style.backgroundRepeat = 'no-repeat';
			this.$refs.img.style.backgroundImage = 'url("'+this.$refs.img.src+'")';
			this.transparentSpaceFiller = 'data:image/svg+xml;base64,'+window.btoa('<svg xmlns="http://www.w3.org/2000/svg" width="'+this.$refs.img.naturalWidth+'" height="'+this.$refs.img.naturalHeight+'"></svg>');
			this.$refs.img.src = this.transparentSpaceFiller;
    },
    updateBgStyle() {
			if (this.bgPosX > 0) {
				this.bgPosX = 0;
			} else if (this.bgPosX < this.width - this.bgWidth) {
				this.bgPosX = this.width - this.bgWidth;
			}

			if (this.bgPosY > 0) {
				this.bgPosY = 0;
			} else if (this.bgPosY < this.height - this.bgHeight) {
				this.bgPosY = this.height - this.bgHeight;
			}

      this.$refs.img.style.backgroundSize = this.bgWidth+'px '+this.bgHeight+'px';
      // console.log('backgroundSize', this.$refs.img.style.backgroundSize)
			this.$refs.img.style.backgroundPosition = this.bgPosX+'px '+this.bgPosY+'px';
    },
    reset() {
			this.bgWidth = this.width;
			this.bgHeight = this.height;
			this.bgPosX = this.bgPosY = 0;
			this.updateBgStyle();
    },
    onwheel (e) {
      // console.log(e)
      let deltaY = 0;
      e.preventDefault();
			if (e.deltaY) { // FireFox 17+ (IE9+, Chrome 31+?)
				deltaY = e.deltaY;
			} else if (e.wheelDelta) {
				deltaY = -e.wheelDelta;
			}

			// As far as I know, there is no good cross-browser way to get the cursor position relative to the event target.
			// We have to calculate the target element's position relative to the document, and subtrack that from the
			// cursor's position relative to the document.
			const rect = this.$refs.img.getBoundingClientRect();
			const offsetX = e.pageX - rect.left - window.pageXOffset;
			const offsetY = e.pageY - rect.top - window.pageYOffset;

			// Record the offset between the bg edge and cursor:
			const bgCursorX = offsetX - this.bgPosX;
			const bgCursorY = offsetY - this.bgPosY;
			
			// Use the previous offset to get the percent offset between the bg edge and cursor:
			const bgRatioX = bgCursorX/this.bgWidth;
			const bgRatioY = bgCursorY/this.bgHeight;

			// Update the bg size:
			if (deltaY < 0) {
				this.bgWidth += this.bgWidth*this.settings.zoom;
				this.bgHeight += this.bgHeight*this.settings.zoom;
			} else {
				this.bgWidth -= this.bgWidth*this.settings.zoom;
				this.bgHeight -= this.bgHeight*this.settings.zoom;
			}

			if (this.settings.maxZoom) {
				this.bgWidth = Math.min(this.width*this.settings.maxZoom,this. bgWidth);
				this.bgHeight = Math.min(this.height*this.settings.maxZoom, this.bgHeight);
			}

			// Take the percent offset and apply it to the new size:
			this.bgPosX = offsetX - (this.bgWidth * bgRatioX);
			this.bgPosY = offsetY - (this.bgHeight * bgRatioY);

			// Prevent zooming out beyond the starting size
			if (this.bgWidth <= this.width || this.bgHeight <= this.height) {
				this.reset();
			} else {
				this.updateBgStyle();
			}
    },
    drag(e) {
      e.preventDefault();
			this.bgPosX += (e.pageX - this.previousEvent.pageX);
			this.bgPosY += (e.pageY - this.previousEvent.pageY);
			this.previousEvent = e;
			this.updateBgStyle();
    },
    removeDrag() {
      this.$refs.img.removeEventListener('mouseup', this.removeDrag);
      this.$refs.img.removeEventListener('mousemove', this.drag);
    },
    draggable(e) {
			e.preventDefault();
			this.previousEvent = e;
			this.$refs.img.addEventListener('mousemove', this.drag);
			this.$refs.img.addEventListener('mouseup', this.removeDrag);
    },
    load() {
			const initial = Math.max(this.settings.initialZoom, 1);

			if (this.$refs.img.src === this.transparentSpaceFiller) return;

			const computedStyle = window.getComputedStyle(this.$refs.img, null);

			this.width = parseInt(computedStyle.width, 10);
			this.height = parseInt(computedStyle.height, 10);
			this.bgWidth = this.width * initial;
			this.bgHeight = this.height * initial;
			this.bgPosX = -(this.bgWidth - this.width) * this.settings.initialX;
			this.bgPosY = -(this.bgHeight - this.height) * this.settings.initialY;

			this.setSrcToBackground();

			this.$refs.img.style.backgroundSize = this.bgWidth+'px '+this.bgHeight+'px';
      this.$refs.img.style.backgroundPosition = this.bgPosX+'px '+this.bgPosY+'px';

			this.$refs.img.addEventListener('wheel', this.onwheel);
			this.$refs.img.addEventListener('mousedown', this.draggable);
    },
    destroy(originalProperties) {

    }
  }
}
</script>
<style scoped>
</style>