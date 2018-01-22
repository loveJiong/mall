<template>
  <div class="addCompany">
    <div class="addCompany-title">
      <router-link to="/" class="el-icon-arrow-left"></router-link>
      添加商家
    </div>
    <div class="container">
      <div class="phone-img">
        <img v-bind:src="addCompanyImg" alt="icon">
      </div>
      <div class="company-info">
        <div class="company-input">
          编号
          <input type="text">
        </div>
        <div class="company-input">
          口令
          <input type="text">
        </div>
      </div>
      <div class="company-add">
        添加
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'addCompany',
  data () {
    return {
      addCompanyImg: require('../../static/img/addComapny.png'),
      companyList: []
    }
  },
  beforeCreate () {
    document.querySelector('body').setAttribute('style', 'background:#efeff4')
  },
  beforeDestroy () {
    document.querySelector('body').setAttribute('style', '')
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
  .container {
    .phone-img {
      margin: 5px 0;
      text-align: center;
      img {
        @include wh(100px, 200px);
      }
    }
    .company-info {
      display: flex;
      flex-direction: column;
      .company-input {
        @include sc(18px, #aaaaaa);
        background-color: $white;
        margin-bottom: 2px;
        padding: 10px 15px;
        input {
          font-size: 18px;
          margin-left: 5px;
        }
      }
    }
    .company-add {
      text-align: center;
      padding: 10px 0;
      margin-top: 10px;
      @include sc(18px, #ed706b);
      background-color: $white;
    }
  }
}
</style>
