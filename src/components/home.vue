<template>
  <div class="home">
    <div class="home-title">
      我的商家
      <button type="button">添加商家</button>
    </div>
    <foot-guide></foot-guide>
  </div>
</template>

<script>
import footGuide from './footGuide'
export default {
  name: 'home',
  data () {
    return {
    }
  },
  components: {
    footGuide
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
@import 'src/style/config';
.home {
  .home-title {
    position: relative;
    text-align: center;
    border-bottom: 1px solid $borcd;
    color: $grey;
    @include font(16px, 50px);
    button {
      position: absolute;
      right: 20px;
      top: 12px;
      padding: 5px;
      @include sc(12px, $fc);
      border-radius: 5px;
      background-color: $blue;
    }
  }
}
</style>
