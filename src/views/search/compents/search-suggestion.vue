<template>
<div class="search-suggestion">
    <van-cell icon="search" v-for="(test,index)  in suggestions " :key="index" @click="$emit('search',test)">
        <span slot="title" v-html="hightnight(test)"> </span>

    </van-cell>

</div>
</template>

<script>
import {
  getsuggestion
} from '@/api/search'
import {
  debounce
} from 'lodash'
export default {
  data () {
    return {
      suggestions: []
    }
  },
  created () {

  },
  methods: {
    loadsuggestion: debounce(async function () {
      // console.log(q);
      const searchContent = this.searchText
      if (!searchContent) {
        return
      }
      try {
        const {
          data: res
        } = await getsuggestion(searchContent)
        // console.log(res);
        this.suggestions = res.data.options
        // console.log(res);
      } catch (err) {
        this.$toast('数据请求失败，请售后重试')
        console.log(err)
      }
    }, 200),
    hightnight (text) {
      // 这里可以 new RegExp 方式根据字符串创建一个正则表达式
      // RegExp 是原生 JavaScript 的内置构造函数
      // 参数1：字符串，注意，这里不要加 //
      // 参数2：匹配模式，g 全局，i 忽略大小写
      const reg = new RegExp(this.searchText, 'gi')
      return text.replace(reg, `<span style="color: #3296fa">${this.searchText}</span>`)
    }
  },
  props: {
    searchText: {
      type: String,
      required: true
    }
  },
  watch: {
    searchText: {
      handler (value) {
        this.loadsuggestion()
      },
      // 在加载侦听时就触发一次侦听事件
      immediate: true
    }
  }
}
</script>

<style>

</style>
