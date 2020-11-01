<template>
<div>
    <van-pull-refresh v-model="isrefreshLoading" @refresh="onRefresh" :success-text="successtext">

        <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad" :error.sync="error" error-text="请求失败，点击重新加载">
            <articleitem v-for="(article,index) in list" :key="index" :article="article" />
        </van-list>
    </van-pull-refresh>
</div>
</template>

<script>
import {
    getarticle
} from '@/api/article'
import articleitem from '@/components/article-item'
export default {
    data() {
        return {
            list: [], //存储数据的列表
            loading: false, //控制加载loading状态的
            finished: false, //控制数据加载完的状态
            timestamp: null, //更新时间戳
            error: false, //控制加载错误时错误的显示
            isrefreshLoading: false, //控制下拉刷新按钮
            successtext: '刷新成功'
        }
    },
    created() {

    },
    methods: {
        async onLoad() {
            // 异步更新数据
            // setTimeout 仅做示例，真实场景中一般为 ajax 请求
            // 发起ajax请求
            try {
                const {
                    data: res
                } = await getarticle({
                    channel_id: this.channel.id, //频道ID 
                    timestamp: this.timestamp || Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳 请求第一页的数据就是date.now，请求下一页用的返回数据中的pre_timestamp
                    with_top: 1 //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
                })
                // console.log(res.data);
                const {
                    results
                } = res.data
                // 不能直接相等 因为那样直接不能实现加载更新 要用数据展开符这样就能实时更新数据
                // console.log(results);
                this.list.push(...results)
                // console.log(this.list);
                // 加载状态结束
                // 模拟请求失败的情况
                // if (Math.random() > 0.5) {
                //     JSON.parse('dasdasda')
                // }
                this.loading = false;

                // 判断数据全部加载完成
                if (results.length) {
                    // 更新时间戳
                    this.timestamp = res.data.pre_timestamp
                } else {
                    this.finished = true;
                }
            } catch (err) {
                // this.$toast('请求数据失败')
                // 控制错误提示的显示
                this.error = true
                // 错误时loading没有意义
                this.loading = false
            }

        },
        async onRefresh() {
            try {
                const {
                    data: res
                } = await getarticle({
                    channel_id: this.channel.id, //频道ID 
                    timestamp: Date.now(), //时间戳，请求新的推荐数据传当前的时间戳，请求历史推荐传指定的时间戳 请求第一页的数据就是date.now，请求下一页用的返回数据中的pre_timestamp
                    with_top: 1 //是否包含置顶，进入页面第一次请求时要包含置顶文章，1-包含置顶，0-不包含
                })
                // console.log(res.data);
                const {
                    results
                } = res.data
                // 不能直接相等 因为那样直接不能实现加载更新 要用数据展开符这样就能实时更新数据
                // console.log(results);因为是刷新所以得再数组前面插入
                this.list.unshift(...results)
                this.isrefreshLoading = false;
                this.successtext = `刷新成功，加载了${results.length}条数据`

            } catch (err) {
                this.successtext = `刷新失败`
                this.isrefreshLoading = false;
            }
        }
    },
    components: {
        articleitem
    },
    props: {
        // 父组件传过来频道的信息
        channel: {
            type: Object,
            required: true
        }
    }
}
</script>

<style lang="less" scoped>
.van-list {
    // 解决滚动返回页面不对应  给容器固定高度   不能给100%  太麻烦 只能给css3   vh为单位相当于视口标签 比如视口为667px高  那么1vh就是6.6px   不受父元素影响  溢出滚动  overflow-y
    height: 79vh;
    overflow-y: auto;
}
</style>
