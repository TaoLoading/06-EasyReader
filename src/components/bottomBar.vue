<template>
  <div class="bottomBar">
    <transition name="slideUp">
      <!-- 底部菜单区 -->
      <div class="bottomWrapper"
           v-show="ifShow"
           :class="{'hideBoxShadow':ifSettingShow || !ifShow}">
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
        <div class="fontSize">
          <div class="preview"
               :style="{fontSize: this.fontSizeList[0].fontSize + 'px'}">A</div>
          <!-- 字体调节区 -->
          <div class="selectFontSize"
               v-for="(item, index) in fontSizeList"
               :key="index"
               @click="setFontSize(item.fontSize)">
            <div class="line"></div>
            <div class="pointWrapper">
              <div class="point"
                   v-show="defaultFontSize === item.fontSize">
                <div class="smallPoint"></div>
              </div>
            </div>
            <div class="line"></div>
          </div>
          <div class="preview"
               :style="{fontSize: this.fontSizeList[fontSizeList.length - 1].fontSize + 'px'}">A</div>
        </div>
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
    },
    fontSizeList: Array,
    defaultFontSize: Number
  },
  data() {
    return {
      ifSettingShow: false,
    }
  },
  methods: {
    // 展示设置区
    showSetting() {
      this.ifSettingShow = !this.ifSettingShow
    },
    // 隐藏设置区
    hideSetting() {
      this.ifSettingShow = false
    },
    // 设置字体
    setFontSize(fontSize) {
      // 调用父组件的setFontSize()，因为调节字体需要用到epubjs
      this.$emit('setFontSize', fontSize)
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
    z-index: 102;
    display: flex;
    width: 100%;
    height: px2rem(48);
    background: #fff;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    &.hideBoxShadow {
      box-shadow: none;
    }
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
    bottom: px2rem(47);
    left: 0;
    width: 100%;
    height: px2rem(48);
    background: #fff;
    z-index: 101;
    box-shadow: 0 px2rem(-8) px2rem(8) rgba(0, 0, 0, 0.15);
    .fontSize {
      display: flex;
      height: 100%;
      .preview {
        flex: 0 0 px2rem(40);
        @include center;
      }
      .selectFontSize {
        flex: 1;
        display: flex;
        align-items: center;
        .line {
          flex: 1;
          height: 0;
          border-top: px2rem(1) solid #ccc;
        }
        .pointWrapper {
          position: relative;
          flex: 0 0 0;
          width: 0;
          height: px2rem(7);
          border-left: px2rem(1) solid rgb(133, 133, 133);
          .point {
            position: absolute;
            top: px2rem(-7);
            left: px2rem(-10);
            width: px2rem(20);
            height: px2rem(20);
            border-radius: 50%;
            background: #fff;
            border: px2rem(1) solid #ccc;
            box-shadow: 0 px2rem(4) px2rem(4) rgba(0, 0, 0, 0.15);
            @include center;
            .smallPoint {
              width: px2rem(5);
              height: px2rem(5);
              background: #000;
              border-radius: 50%;
            }
          }
        }
      }
    }
  }
}
</style>

