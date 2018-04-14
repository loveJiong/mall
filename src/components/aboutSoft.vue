<template>
    <div class="aboutSoft">
        <div class="aboutSoft-title">
            <router-link to="/mine" class="el-icon-arrow-left"></router-link>
            关于软件
        </div>
        <div class="container">
            <p>版本号：</p>
            <p class="indent">V0.0.001</p>
        </div>
    </div>
</template>

<script>
export default {
    name: 'aboutSoft',
    data () {
        return {
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
    color: $white;
    background-color: #89c4f4;
    @include font(16px, 50px);
    a, i {
        position: absolute;
        top: 19px;
        color: $white;
    }
    .el-icon-arrow-left {
        left: 20px;
    }
}
.container {
    height: 100%;
    padding: 71px 10px 0 10px;
    background-color: $white;
    font-size: 14px;
}

.indent {
    text-indent: 2em
}
</style>
