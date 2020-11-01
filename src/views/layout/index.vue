<template>
<div>
    <router-view></router-view>

    <van-tabbar route>
        <van-tabbar-item to="/">
            <i slot="icon" class="toutiao toutiao-shouye"></i>
            <span class="text">首页</span>

        </van-tabbar-item>
        <van-tabbar-item to="/qa">
            <i slot="icon" class="toutiao toutiao-wenda"></i>
            <span class="text">问答</span>

        </van-tabbar-item>
        <van-tabbar-item to="/vidio">
            <i slot="icon" class="toutiao toutiao-shipin"></i>
            <span class="text">视频</span>

        </van-tabbar-item>
        <van-tabbar-item to="/my">
            <i slot="icon" class="toutiao toutiao-wode"></i>
            <span class="text">{{ $store.state.user ? '我的':'未登录'}}</span>

        </van-tabbar-item>

    </van-tabbar>

</div>
</template>

<script>
export default {
    name: 'layoutIndex',
    data() {
        return {

        }
    },
    created() {},
    methods: {

    },
}
</script>

<style lang="less" scoped>
.van-tabbar {
    .van-tabbar-item {
        .toutiao {
            font-size: 40px;
        }

        .test {
            font-size: 20px;
        }
    }
}
</style>
