<template>
  <div class="ebook">
    <!-- 头部菜单区 -->
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
    <!-- 电子书展示区 -->
    <div class="read-wrapper">
      <div id="read"></div>
      <div class="mask">
        <div class="left"
             @click="prevPage"></div>
        <div class="center"
             @click="show"></div>
        <div class="right"
             @click="nextPage"></div>
      </div>
    </div>
    <!-- 底部菜单区 -->
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
  </div>
</template>
 
<script>
import Epub from 'epubjs'

const DOWNLOAD_URL = '/static/test01.epub'
global.ePub = Epub
export default {
  data() {
    return {
      ifShow: false
    }
  },
  methods: {
    // 电子书解析和渲染
    showEpub() {
      // 1.生成Ebook
      this.book = new Epub(DOWNLOAD_URL)
      // 2.生成Rendition,通过Book.renderTo方法生成
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 3.通过Rendition.display渲染电子书
      this.rendition.display()
    },
    // 返回上一页
    prevPage() {
      if (this.rendition) {
        this.rendition.prev()
      }
    },
    // 进入下一页
    nextPage() {
      if (this.rendition) {
        this.rendition.next()
      }
    },
    show() {
      this.ifShow = !this.ifShow
    }
  },
  mounted() {
    this.showEpub()
  }
}
</script>

<style lang='scss' scoped>
@import "assets/styles/global.scss";
.ebook {
  position: relative;
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
  .read-wrapper {
    .mask {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 100;
      display: flex;
      width: 100%;
      height: 100%;
      .left {
        flex: 0 0 px2rem(100);
      }
      .center {
        flex: 1;
      }
      .right {
        flex: 0 0 px2rem(100);
      }
    }
  }
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
}
</style>
