<template>
  <div class="container">
    <img-view style="width: 40vw;height:40vw;" class="flex justify-center">
      <!-- <div class="item"></div> -->
      <img src="https://images.unsplash.com/photo-1618317216202-80f99736be86?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=500&q=80" alt="">
    </img-view>
  </div>
</template>

<script>
import ImgView from '@/components/Zoomer/ImgView'
export default {
  components: {ImgView}
}
</script>

<style scoped>
.container {
  text-align: center;
}
.item {
  background-image: linear-gradient(red, yellow);
  width: 300px;
  height: 300px;
}
</style>