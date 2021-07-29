<template>
  <div class="bottomBar">
    <transition name="slideUp">
      <!-- 底部菜单区 -->
      <div class="bottomWrapper"
           v-show="ifShow">
        <div class="iconWrapper">
          <span class="iconfont  icon-liebiao icon"></span>
        </div>
        <div class="iconWrapper">
          <span class="iconfont  icon-tiaojie icon"></span>
        </div>
        <div class="iconWrapper">
          <span class="iconfont  icon-ai250 icon"></span>
        </div>
        <div class="iconWrapper">
          <span class="iconfont  icon-ziti icon"
                @click="showSetting"></span>
        </div>
      </div>
    </transition>
    <transition name="slideUp">
      <!-- 具体设置区 -->
      <div class="settingWrapper"
           v-show="ifSettingShow">
        <!-- 字体设置区 -->
        <div class="fontSize"></div>
      </div>
    </transition>
  </div>
</template>

<script>
export default {
  name: 'BottomBar',
  props: {
    ifShow: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      ifSettingShow: false
    }
  },
  methods: {
    showSetting() {
      this.ifSettingShow = !this.ifSettingShow
    },
    hideSetting() {
      this.ifSettingShow = false
    }
  }
}
</script>

<style lang="scss" scoped>
@import "../assets/styles/global.scss";
.bottomBar {
  .bottomWrapper {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .iconWrapper {
      flex: 1;
      @include center;
      .icon {
        font-size: px2rem(24);
      }
    }
  }
  .settingWrapper {
    position: absolute;
    bottom: px2rem(48);
    left: 0;
    width: 100%;
    height: px2rem(48);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .fontSize {
    }
  }
}
</style>

