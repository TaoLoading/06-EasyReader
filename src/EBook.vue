<template>
  <div class="ebook">
    <!-- 头部菜单区 -->
    <top-bar :ifShow="ifShow"></top-bar>
    <!-- 电子书展示区 -->
    <div class="readWrapper">
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
    <bottom-bar :ifShow="ifShow"
                :fontSizeList="fontSizeList"
                :defaultFontSize="defaultFontSize"
                @setFontSize="setFontSize"
                :themeList="themeList"
                :defaultTheme="defaultTheme"
                @setTheme="setTheme"
                :bookAvailable="bookAvailable"
                @onProgressChange="onProgressChange"
                :navigation="navigation"
                @jumpTo="jumpTo"
                ref="bottomBar"></bottom-bar>
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
      ifShow: false,
      // 字号列表
      fontSizeList: [
        { fontSize: 12 },
        { fontSize: 14 },
        { fontSize: 16 },
        { fontSize: 18 },
        { fontSize: 20 },
        { fontSize: 22 },
        { fontSize: 24 },
      ],
      defaultFontSize: 16,
      themeList: [
        // 默认主题
        {
          name: 'default',
          style: {
            body: {
              'color': '#000', 'background': '#fff'
            }
          }
        },
        // 护眼主题
        {
          name: 'eye',
          style: {
            body: {
              'color': '#000', 'background': '#ceeaba'
            }
          }
        },
        // 夜间主题
        {
          name: 'night',
          style: {
            body: {
              'color': '#fff', 'background': '#000'
            }
          }
        },
        // 书本主题
        {
          name: 'book',
          style: {
            body: {
              'color': '#000', 'background': '#f6dda8'
            }
          }
        },
      ],
      defaultTheme: 0,
      // 图书是否可用
      bookAvailable: false,
      navigation: {}
    }
  },
  methods: {
    // 使用epubjs对电子书进行解析与设置
    showEpub() {
      // 电子书的渲染
      // 1.生成Ebook
      this.book = new Epub(DOWNLOAD_URL)
      // 2.生成Rendition，使用Book.renderTo方法生成
      this.rendition = this.book.renderTo('read', {
        width: window.innerWidth,
        height: window.innerHeight
      })
      // 3.使用Rendition.display渲染电子书
      this.rendition.display()

      // 修改字体
      // 获取Theme对象
      this.themes = this.rendition.themes
      // 设置默认字体
      this.setFontSize(this.defaultFontSize)

      // 修改主题
      // 1.遍历数组获取主题
      this.themeList.forEach(theme => {
        // 2.使用Theme.register注册主题
        this.themes.register(theme.name, theme.style)
      })
      // 3.使用Theme.select修改主题(点击时触发)

      // 浏览进度条 + 目录
      // 1.浏览进度条--生成Locations对象(由于生成Locations对象较消耗性能，故不会自动生成，需要借助epubjs的钩子函数生成)
      this.book.ready.then(() => {
        this.navigation = this.book.navigation
        return this.book.locations.generate()
      }).then(() => {
        this.locations = this.book.locations
        this.bookAvailable = true
      })
      // 2.浏览进度条--触发onProgressChange()
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
    // 菜单区的展示与隐藏
    show() {
      this.ifShow = !this.ifShow
      if (this.ifShow == false) {
        // 隐藏字体设置区
        this.$refs.bottomBar.hideSetting()
      }
    },
    // 设置字体
    setFontSize(fontSize) {
      this.defaultFontSize = fontSize
      if (this.themes) {
        this.themes.fontSize(fontSize + 'px')
      }
    },
    // 设置主题
    setTheme(index) {
      // debugger
      // bug描述：点击时能够获取点击主题的this.themeList[index].name，但所有主题只能触发一次
      this.themes.select(this.themeList[index].name)
      this.defaultTheme = index
    },
    // 进度条跳转
    // progress是进度条数值(0-100)
    onProgressChange(progress) {
      // 1.将数值转换为百分比
      const percentage = progress / 100
      // 2.使用Locations.cfiFromPercentafe()进行定位
      const location = percentage > 0 ? this.locations.cfiFromPercentage(percentage) : 0
      // 3.使用Rendition.display()渲染电子书
      this.rendition.display(location)
    },
    // 根据链接跳转到指定位置
    jumpTo(href) {
      this.rendition.display(href)
      this.hideAll()
    },
    // 隐藏topbar和bottombar和目录
    hideAll() {
      this.ifShow = false
      this.$refs.bottomBar.hideSetting()
      this.$refs.bottomBar.hideContent()
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
  .readWrapper {
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
