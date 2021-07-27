<template>
  <div class="ebook">
    <div class="read-wrapper">
      <div id="read"></div>
    </div>
  </div>
</template>
 
<script>
import Epub from 'epubjs'

const DOWNLOAD_URL = '/static/test01.epub'
global.ePub = Epub
export default {
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
    }
  },
  mounted() {
    this.showEpub()
  }
}
</script>

<style lang='scss' scoped>
@import "assets/styles/global.scss";
</style>
