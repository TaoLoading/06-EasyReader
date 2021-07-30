<template>
  <div class="bottomBar">
    <transition name="slideUp">
      <!-- 底部菜单区 -->
      <div class="bottomWrapper"
           v-show="ifShow"
           :class="{'hideBoxShadow':ifSettingShow || !ifShow}">
        <div class="iconWrapper">
          <span class="iconfont  icon-liebiao icon"
                @click="showSetting(3)"></span>
        </div>
        <div class="iconWrapper">
          <span class="iconfont  icon-tiaojie icon"
                @click="showSetting(2)"></span>
        </div>
        <div class="iconWrapper">
          <span class="iconfont  icon-ai250 icon"
                @click="showSetting(1)"></span>
        </div>
        <div class="iconWrapper">
          <span class="iconfont  icon-ziti icon"
                @click="showSetting(0)"></span>
        </div>
      </div>
    </transition>
    <transition name="slideUp">
      <!-- 具体设置区 -->
      <div class="settingWrapper"
           v-show="ifSettingShow">
        <!-- 字体设置区 -->
        <div class="fontSize"
             v-if="showTag === 0">
          <div class="preview"
               :style="{fontSize: this.fontSizeList[0].fontSize + 'px'}">A</div>
          <!-- 字体调节区 -->
          <div class="settingFontSize"
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
        <!-- 主题设置区 -->
        <div class="Theme"
             v-else-if="showTag === 1">
          <!-- 主题调节区 -->
          <div class="settingTheme"
               v-for="(item, index) in themeList"
               :key="index"
               @click="setTheme(index)">
            <div class="preview"
                 :style="{background:item.style.body.background}"
                 :class="{'noBorder':item.style.body.background !== '#fff'}"></div>
            <div class="text"
                 :class="{'selected':index===defaultTheme}">{{item.name}}</div>
          </div>
        </div>
        <!-- 进度条设置区 -->
        <div class="progress"
             v-else-if="showTag === 2">
          <!-- 进度条 -->
          <input type="range"
                 class="settingProgress"
                 max="100"
                 min="0"
                 step="1"
                 @change="onProgressChange($event.target.value)"
                 @input="onProgressInput($event.target.value)"
                 :value="progress"
                 :disabled="!bookAvailable"
                 ref="progress">
          <div class="text">
            <span>{{bookAvailable?progress+'%':'加载中...'}}</span>
          </div>
        </div>
      </div>
    </transition>
    <!-- 目录区 -->
    <content-view :ifContentShow="ifContentShow"
                  v-show="ifContentShow"
                  :navigation="navigation"
                  :bookAvailable="bookAvailable"
                  @jumpTo="jumpTo"></content-view>
    <transition name="fade">
      <div class="contentMask"
           v-show="ifContentShow"
           @click="hideContent"></div>
    </transition>
  </div>
</template>

<script>
import ContentView from '@/components/content.vue'
export default {
  name: 'BottomBar',
  components: {
    ContentView
  },
  props: {
    ifShow: {
      type: Boolean,
      default: false
    },
    fontSizeList: Array,
    defaultFontSize: Number,
    themeList: Array,
    defaultTheme: Number,
    navigation: Object,
    bookAvailable: {
      type: Boolean,
      default: false
    },
  },
  data() {
    return {
      ifSettingShow: false,
      showTag: 0,
      progress: 0,
      ifContentShow: false
    }
  },
  methods: {
    // 当前展示区
    showSetting(tag) {
      this.showTag = tag
      if (this.showTag === 3) {
        this.ifSettingShow = false
        this.ifContentShow = true
      } else {
        this.ifSettingShow = true
      }
    },
    // 隐藏设置区
    hideSetting() {
      this.ifSettingShow = false
    },
    // 设置字体
    setFontSize(fontSize) {
      // 调用父组件的setFontSize()，因为调节字体需要用到epubjs
      this.$emit('setFontSize', fontSize)
    },
    // 设置主题
    setTheme(index) {
      this.$emit('setTheme', index)
    },
    // 拖动松开后触发的事件
    onProgressChange(progress) {
      this.$emit('onProgressChange', progress)
    },
    // 拖动进度条时触发的事件
    onProgressInput(progress) {
      this.progress = progress
      this.$refs.progress.style.backgroundSize = `${this.progress}% 100%`
    },
    // 跳转方法，调用父组件方法
    jumpTo(target) {
      this.$emit('jumpTo', target)
    },
    // 隐藏目录
    hideContent() {
      this.ifContentShow = false
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
      .settingFontSize {
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
    .Theme {
      display: flex;
      height: 100%;
      .settingTheme {
        flex: 1;
        display: flex;
        flex-direction: column;
        padding: px2rem(5);
        box-sizing: border-box;
        .preview {
          flex: 1;
          border: px2rem(1) solid #ccc;
          box-sizing: border-box;
          &.noBorder {
            border: none;
          }
        }
        .text {
          @include center;
          flex: 0 0 px2rem(15);
          font-size: px2rem(14);
          color: #999;
          &.selected {
            color: #333;
          }
        }
      }
    }
    .progress {
      position: relative;
      width: 100%;
      height: 100%;
      @include center;
      padding: 0 px2rem(30);
      box-sizing: border-box;
      .settingProgress {
        -webkit-appearance: none;
        width: 100%;
        height: px2rem(2);
        background: -webkit-linear-gradient(#999, #999) no-repeat #ddd;
        background-size: 0 100%;
        &:focus {
          outline: none;
        }
        // 被拖动的圆球的样式
        &::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: px2rem(20);
          width: px2rem(20);
          border-radius: 50%;
          background: #fff;
          box-shadow: 0 4px 4px rgba(0, 0, 0, 0.15);
          border: px2rem(1) solid #ddd;
        }
      }
      .text {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        color: #333;
        font-size: px2rem(16);
        text-align: center;
      }
    }
  }
  .contentMask {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 101;
    display: flex;
    width: 100%;
    height: 100%;
    background: rgba(51, 51, 51, 0.8);
  }
}
</style>

