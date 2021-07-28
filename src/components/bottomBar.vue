<template>
  <transition name="slide-up">
    <div class="bottom-wrapper"
         v-show="ifShow">
      <div class="icon-wrapper">
        <span class="iconfont  icon-liebiao icon"></span>
      </div>
      <div class="icon-wrapper">
        <span class="iconfont  icon-tiaojie icon"></span>
      </div>
      <div class="icon-wrapper">
        <span class="iconfont  icon-ai250 icon"></span>
      </div>
      <div class="icon-wrapper">
        <span class="iconfont  icon-ziti icon"></span>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'BottomBar',
  props: {
    ifShow: Boolean
  },
  data() {
    return {
    }
  },
  methods: {

  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/global.scss";
.bottom-wrapper {
  position: absolute;
  bottom: 0;
  left: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: #fff;
  box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
  .icon-wrapper {
    flex: 1;
    @include center;
    .icon {
      font-size: px2rem(24);
    }
  }
}
</style>

