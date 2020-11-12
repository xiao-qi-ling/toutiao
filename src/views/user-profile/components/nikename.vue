<template>
<div>
    <van-nav-bar title="设置昵称" left-text="取消" right-text="完成" left-arrow @click-left="onClickLeft" @click-right="onClickRight" />
    <van-field v-model.trim="name" rows="2" autosize type="textarea" maxlength="7" placeholder="请输入留言" show-word-limit />
</div>
</template>

<script>
import {
  updatenikename
} from '@/api/user'
export default {
  name: 'nikenamme',
  data () {
    return {
      name: this.value

    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    onClickLeft () {
      // this.value = false
      this.$emit('close')
    },
    async onClickRight () {
      // 验证表单
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0
      })

      // 发送请求更新昵称数据
      try {
        if (this.name.length === 0) {
          return this.$toast('输入不能为空')
        }
        await updatenikename({
          name: this.name
        })
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.name)
        // this.value = false
        this.$toast.success('请求成功')
      } catch (err) {
        this.$toast.error('请求失败')
      }
    }
  }
}
</script>

<style lang="less" scoped>

</style>
