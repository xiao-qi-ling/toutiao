<template>
<div>

    <van-picker title="性别" show-toolbar :columns="columns" @confirm="onConfirm" @cancel="$emit('close')" :default-index="value" @change="onChange" />
</div>
</template>

<script>
import {
  updatenikename
} from '@/api/user'
export default {
  name: 'genders',
  data () {
    return {
      columns: ['女', '男'],
      localindex: 0

    }
  },
  props: {
    value: {
      type: Number,
      required: true
    }
  },
  methods: {
    async onConfirm () {
      // 发送请求更新性别数据
      try {
        await updatenikename({
          gender: this.localindex
        })
        // 关闭弹层
        this.$emit('close')
        // 更新视图
        this.$emit('input', this.localindex)
        // this.value = false
        this.$toast.success('请求成功')
      } catch (err) {
        this.$toast('请求失败')
      }
    },
    onChange (picker, values, index) {
      // console.log(picker, values, index);
      this.localindex = index
    }
  }
}
</script>

<style >

</style>
