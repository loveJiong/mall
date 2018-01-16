<template>
  <div class="addCompany">
    <div class="addCompany-title">
      <router-link to="/" class="el-icon-arrow-left"></router-link>
      添加商家
    </div>
  </div>
</template>

<script>
export default {
  name: 'addCompany',
  data () {
    return {
      companyList: []
    }
  }
//   created () {
//     this.initData()
//   },
//   methods: {
//     async initData () {
//       let comanyListRes = await getComanyList()
//       if (comanyListRes.success) {
//         this.companyList = comanyListRes.data
//         console.log(this.companyList)
//       }
//     }
//   }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.addCompany {
  .addCompany-title {
    position: relative;
    text-align: center;
    border-bottom: 1px solid $borcd;
    color: $fc;
    background-color: $white;
    @include font(16px, 50px);
    a {
      position: absolute;
      left: 20px;
      top: 19px;
    }
  }
}
</style>
