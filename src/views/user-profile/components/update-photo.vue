<template>
<div class="updatephoto">
    <img :src="img" class="img" ref="img">
    <van-nav-bar left-text="取消" right-text="完成" @click-left="onClickLeft" @click-right="onClickRight" class="nav-bar" />

</div>
</template>

<script>
import 'cropperjs/dist/cropper.css'
import Cropper from 'cropperjs'
import {
  updateuserphoto
} from '@/api/user'
export default {
  data () {
    return {
      cropper: null
    }
  },
  props: {
    img: {
      type: [String, Object],
      required: true
    }

  },
  methods: {
    onClickLeft () {
      this.$emit('close')
    },
    onClickRight () {
      // 图片上传有两种方式第一种是服务器处理 第二种是直接前端处理
      // 点击完成时发送请求Content-Typemultipart/form-data 当请求头要求是这个的时候必须参数是formData对象的Content-Typeapplication/json这种请求头就是随便一个普通对象就可以了
      this.cropper.getCroppedCanvas().toBlob(async (blob) => {
        // 验证表单
        this.$toast.loading({
          message: '更新中...',
          forbidClick: true, // 禁止背景点击
          duration: 0
        })
        try {
          const formData = new FormData()
          formData.append('photo', blob)
          // console.log(blob);

          const {
            data
          } = await updateuserphoto(formData)
          console.log(data)
          // 更新视图
          this.$emit('updataphoto', data.data.photo)
          // 关闭弹出层
          this.$emit('close')

          this.$toast.success('更新成功')
        } catch (err) {
          this.$toast.fail('更新失败')
        }
      })
    }

  },
  mounted () {
    const image = this.$refs.img
    this.cropper = new Cropper(image, {
      viewMode: 1, // 控制裁切区域
      dragMode: 'move', // 控制是画布移动还是图片移动
      aspectRatio: 1, // 裁切比例
      // autoCropArea: 1, //自动撑满画布的大小
      cropBoxMovable: false, // 控制画布区域是否能够移动
      cropBoxResizable: false, // 控制前面盒子是否能够移动
      background: false // 关闭默认背景颜色
    })
  }
}
</script>

<style lang="less" scoped>
.updatephoto {
    background-color: #000;
    height: 100%;

    .img {
        min-width: 100%;
    }

    /deep/ .nav-bar {

        position: fixed;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: #000;

        .van-nav-bar__text {
            color: #fff;
        }

    }
}
</style>
