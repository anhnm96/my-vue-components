<template>
  <div>
    <Dropzone v-model:files="files">
      <div class="wrapper">
        <div class="content" v-for="(file, index) in files" :key="file.name">
          <img v-if="file.type.includes('image')" class="mx-1 h-20" :src="file.url" :alt="file.name">
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <p>{{file.name}}</p>
          <button class="bg-red-400 relative" @click.stop="remove(index)">Remove</button>
        </div>
      </div>
    </Dropzone>
    <Dropzone v-model:files="files">
      <template #input="{on}">
        <input class="absolute opacity-0 inset-0 w-full h-full cursor-pointer" v-bind="on" >
      </template>
      <div class="wrapper">
        <div class="content" v-for="(file, index) in files" :key="file.name">
          <img v-if="file.type.includes('image')" class="mx-1 h-20" :src="file.url" :alt="file.name">
          <svg v-else class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 13h6m-3-3v6m5 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"></path></svg>
          <p>{{file.name}}</p>
          <button class="bg-red-400 relative" @click.stop="remove(index)">Remove</button>
        </div>
      </div>
    </Dropzone>
  </div>
</template>
<script>
import Dropzone from '@/components/Dropzone/index'
import {ref} from 'vue'

export default {
  components: {Dropzone},
  setup() {
    const files = ref([]);
    function remove (index) {
      this.files.splice(index, 1)
      // this.resetInput()
    }
    return {
      files, remove
    }
  }
}
</script>
<style scoped>
.wrapper {
  display: flex;
  align-items: flex-end;
  flex-flow: row wrap;
}
.wrapper .content {
  flex: 0 0 100px;
}
.wrapper p {
  text-overflow: ellipsis;
  width: 100px;
  overflow: hidden;
  white-space: nowrap;
  text-align: center;
}
</style>