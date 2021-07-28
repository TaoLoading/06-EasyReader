<template>
  <transition name="slide-down">
    <div class="top-wrapper"
         v-show="ifShow">
      <div class="left">
        <span class="iconfont  icon-fanhui- icon"></span>
      </div>
      <div class="right">
        <div class="icon-wrapper">
          <span class="iconfont  icon-gouwuche icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont  icon-user icon"></span>
        </div>
        <div class="icon-wrapper">
          <span class="iconfont  icon-qita icon"></span>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
  name: 'TopBar',
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
.top-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 101;
  display: flex;
  width: 100%;
  height: px2rem(48);
  background: #fff;
  box-shadow: 0 px2rem(8) px2rem(8) rgba(0, 0, 0, 0.15);
  .left {
    flex: 0 0 px2rem(60);
    @include center;
  }
  .right {
    flex: 1;
    display: flex;
    // 居右排列
    justify-content: flex-end;
    .icon-wrapper {
      flex: 0 0 px2rem(40);
      @include center;
      .icon-gouwuche {
        font-size: px2rem(24);
      }
    }
  }
}
</style>
