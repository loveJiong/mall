<template>
    <div class="aboutSoft">
        <div class="aboutSoft-title">
            <router-link to="/mine" class="el-icon-arrow-left"></router-link>
            关于软件
        </div>
        <div class="container">
            <img src="../../static/img/login-icon.png" alt="图标">
            <p>版本号：{{ver}}</p>
            <img class="qrd" src="../../static/img/qrd.png" alt="">
            <p>下载二维码</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'aboutSoft',
    computed: {
        ver () {
            let result = 'V'
            // eslint-disable-next-line no-use-before-define
            let plus = plus || null
            if (plus) {
                result = `${result}${plus.runtime.version}`
            } else {
                result = `${result}01`
            }
            return result
        }
    }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.aboutSoft {
    height: 100%;
}
.aboutSoft-title {
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
    padding: 71px 10px 0 10px;
    background-color: #f5f5f5;
    font-size: 14px;
    text-align: center;
    img {
        width: 150px;
        height: 150px;
        background-color: #fff;
        border-radius: 30px;
        margin-bottom: 20px;
        margin-top: 20px;
    }
}

.indent {
    text-indent: 2em
}
</style>
