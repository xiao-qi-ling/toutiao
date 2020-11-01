<template>
<div class="article-item">
    <van-cell-group>

        <van-cell>

            <div slot="title" class="title  van-multi-ellipsis--l2">{{article.title}}</div>
            <div slot="label">
                <div v-if="article.cover.type === 3" class="cover-wrap">
                    <div class="cover-item" v-for="(img, index) in article.cover.images" :key="index">
                        <van-image class="cover-item-img" fit="cover" :src="img" />
                    </div>
                </div>
                <div class="label-info-wrap">
                    <span>{{ article.aut_name }}</span>
                    <span>{{ article.comm_count }}评论</span>
                    <!--通过时间处理过滤器 处理相对时间-->
                    <span>{{ article.pubdate |Timeprocessing }}</span>
                </div>
            </div>
        </van-cell>
    </van-cell-group>
</div>
</template>

<script>
export default {
    name: 'article-item',
    data() {
        return {

        }
    },
    methods: {

    },
    props: {
        article: {
            type: Object,
            required: true

        }
    }
}
</script>

<style lang="less" scoped>
.article-item {
    .van-cell__title {

        font-size: 32px;
        color: #616161;
    }

    .right-cover {
        width: 232px;
        height: 146px;
    }

    .van-cell__value {
        flex: unset;
        width: 232px;
        height: 146px;
        padding-left: 25px;
    }

    .van-cell__label span {
        color: #b4b4b4;
        font-size: 18px;
        margin: 0 12px;
    }

    .cover-wrap {
        display: flex;
        margin: 30px 0;

        .cover-item {
            flex: 1;

            .cover-item-img {
                width: 100%;
                height: 146px;
            }

            &:not(:last-child) {
                margin-right: 4px;
            }
        }
    }
}
</style>
