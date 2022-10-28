<template>
  <div class="Video">
    <video muted="muted" autoplay="autoplay" loop width="800">
      <source src="../../image-and-video/background.mp4" type="video/mp4" />
    </video>
    <h1>
      1234
    </h1>
  </div>
</template>

<script>
import { ref } from "vue";
export default {
  name: "welCome",
  setup() {
    return {};
  },
};
</script>

<style scoped lang="scss">
.Video {
  position: fixed;
  video {
    position:absolute;
    width: 100%;
    height: 100%;
    top:0px;
    left:0px;
    z-index: -100;
    object-fit:fill   //解决视频背景填不满问题
  }
  source {
    height: auto;
    width: auto;
  }
  width: 100%;
    height: 100%;
    top:0px;
    left:0px;
}
</style>