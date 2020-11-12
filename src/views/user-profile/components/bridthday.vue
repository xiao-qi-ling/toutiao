<template>
<div>
    <van-datetime-picker v-model="currentDate" type="date" title="选择年月日" :min-date="minDate" :max-date="maxDate" @confirm="onConfirm" @cancel="$emit('close')" />
</div>
</template>

<script>
import {
  updatenikename
} from '@/api/user'

import dayjs from 'dayjs'

export default {
  name: 'bridthday',
  data () {
    return {
      // 最低能选中的日期
      minDate: new Date(2001, 0, 1),
      //   最多能选中的日期
      maxDate: new Date(2025, 10, 1),
      //   打开时选中的事件
      currentDate: new Date(this.value)

    }
  },
  props: {
    value: {
      type: String,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      // 验证表单
      this.$toast.loading({
        message: '加载中...',
        forbidClick: true, // 禁止背景点击
        duration: 0
      })
      // 发送请求更新生日数据
      try {
        await updatenikename({
          birthday: dayjs(this.currentDate).format('YYYY-MM-DD')
        })
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('input', dayjs(this.currentDate).format('YYYY-MM-DD'))
        // this.value = false
        this.$toast.success('请求成功')
      } catch (err) {
        this.$toast('请求失败')
      }
    }

  }
}
</script>

<style>

</style>
