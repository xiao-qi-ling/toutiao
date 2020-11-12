<template>
<van-icon :name="value ?'star' :'star-o'" @click="iscollect" :class="{ collected:value}" />
</template>

<script>
import {
  addcollect,
  deletecollect
} from '@/api/article'
export default {
  name: 'collectArticle',
  data () {
    return {
      loading: false
    }
  },
  props: {

    value: {
      type: Boolean,
      required: true
    },
    articleId: {
      type: [String, Object, Number],
      required: true
    }
  },
  methods: {
    async iscollect () {
      this.loading = true

      try {
        if (this.value) {
          // 已经收藏与用户取消收藏
          await deletecollect(this.articleId)
        } else {
          // 收藏文章
          await addcollect(this.articleId)
        }
        this.loading = !this.loading
        // 更改视图状态   子组件传参!this.value
        this.$emit('input', !this.value)
        this.$toast(!this.value ? '收藏文章' : '取消收藏')
      } catch (err) {
        let message = '请求错误请稍后重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        this.$toast(message)
      }
    }
  }
}
</script>

<style lang="less" scoped>
.collected {

    color: orange;

}
</style>
