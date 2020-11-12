<template>
<!-- 已关注和未关注渲染    -->
<van-button round size="small" v-if="value" :loading='loading' @click="isfollow">已关注</van-button>
<van-button type="info" color="#3296fa" round size="small" :loading='loading' icon="plus" v-else @click="isfollow"> 关注</van-button>
</template>

<script>
import {
  deletefollow,
  addfollow
} from '@/api/user'
export default {
  name: 'followAriticle',
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
    userId: {
      type: [Object, String, Number],
      required: true
    }
  },
  methods: {
    async isfollow () {
      this.loading = true

      try {
        if (this.value) {
          // 已经关注与用户取消关注
          await deletefollow(this.userId)
        } else {
          // 关注用户
          await addfollow(this.userId)
        }
        this.loading = !this.loading
        // 更改视图状态   子组件传参!this.value
        this.$emit('input', !this.value)
      } catch (err) {
        let message = '请求错误请稍后重试'
        if (err.response && err.response.status === 400) {
          message = '你不能关注你自己'
        }
        // console.log(err);
        this.$toast(message)
      }
    }
  }

}
</script>

<style>

</style>
