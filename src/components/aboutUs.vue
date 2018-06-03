<template>
    <div class="aboutUs">
        <div class="aboutUs-title">
            <router-link to="/mine" class="el-icon-arrow-left"></router-link>
            关于我们
        </div>
        <div class="container">
            <p class="container-title">关于我们</p>
            <p class="indent">我们是大地软件网络科技有限公司， 专业提供</p>
            <p class="indent">叫货出货一体化软件服务。</p>
            <p class="container-title">联系方式</p>
            <p class="indent">EMAIL: lifengcool@gmail.com</p>
            <p class="indent">MOVIL: 0034-688111845</p>
            <p class="container-title">下载二维码</p>
            <img class="qrd" src="../../static/img/qrd.png" alt="">
        </div>
    </div>
</template>

<script>
export default {
    name: 'aboutUs',
    data () {
        return {
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.aboutUs {
    height: 100%;
}
.aboutUs-title {
    position: fixed;
    width: 100%;
    top: 0px;
    z-index: 100;
    text-align: center;
    border-bottom: 1px solid $borcd;
    background-color: $white;
    color: #333333;
    @include font(16px, 50px);
    a, i {
        position: absolute;
        top: 19px;
        color: #333333;
    }
    .el-icon-arrow-left {
        left: 20px;
    }
}

.container {
    height: 100%;
    padding: 50px 10px 0 10px;
    color: #333333;
    text-align: center;
    background-color: #f5f5f5;
    font-size: 14px;
    p {
        padding: 5px 0;
    }
}

.container-title {
    font-size: 16px;
    margin-top: 25px;
}

.qrd {
    display: block;
    margin: 0 auto;
}
</style>
