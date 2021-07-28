<template>
  <div class="ebook">
    <!-- 头部菜单区 -->
    <top-bar :ifShow="ifShow"></top-bar>
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
    <bottom-bar :ifShow="ifShow"></bottom-bar>
  </div>
</template>
 
<script>
import Epub from 'epubjs'
import TopBar from '@/components/topBar.vue'
import BottomBar from '@/components/bottomBar.vue'

const DOWNLOAD_URL = '/static/test01.epub'
global.ePub = Epub
export default {
  components: {
    TopBar,
    BottomBar
  },
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
}
</style>
