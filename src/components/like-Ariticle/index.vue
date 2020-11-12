<template>
<van-icon color="#777" :name="value ?'good-job' :'good-job-o'" :loading="loading" @click="islike" />
</template>

<script>
import {
  addlikearticle,
  deletelikearticle
} from '@/api/article'
export default {
  name: 'likeariticle',
  data () {
    return {
      loading: false
    }
  },
  props: {
    value: {
      type: Number,
      required: true
    },
    articleId: {
      type: [Object, String, Number],
      required: true
    }
  },
  methods: {
    async islike () {
      this.loading = true

      try {
        let status = -1
        if (this.value === 1) {
          // 已经点赞的用户取消点赞
          await deletelikearticle(this.articleId)
          status = 0
        } else {
          // 点赞文章
          await addlikearticle(this.articleId)
          status = 1
        }
        this.loading = !this.loading
        // 更改视图状态   子组件传参!this.value
        this.$emit('input', status)
        this.$toast(status === 1 ? '点赞文章' : '取消点赞')
      } catch (err) {
        console.log(err)
        let message = '请求错误请稍后重试'
        if (err.response && err.response.status === 400) {
          message = '你不能点赞你自己'
        }
        this.$toast(message)
      }
    }
  }
}
</script>

<style>

</style>
