<template>
  <div class="app-container">
    <div class="title">
      <van-icon name="user-o"></van-icon>
      <span>员工姓名: <span class="name">{{name}}</span></span>
    </div>
    <van-divider></van-divider>
    <div class="content">佣金明细</div>
    <div class="commission">
      <van-cell></van-cell>
    </div>
  </div>
</template>

<script>
import { commission } from '@/api/public'
import { mapGetters } from 'vuex'
import { notify } from '@/utils'
export default {
  name: 'PhonePackage',
  computed: {
    ...mapGetters([
      'name'
    ])
  },
  data () {
    return {
      list: []
    }
  },
  created () {
    commission().then(res => {
      const { msg, success, obj } = res
      if (success) {
        this.list = obj
      } else {
        notify(msg, success)
      }
    })
  }
}
</script>

<style lang="stylus" scoped>
.title
  margin-top 10px
  display flex
  align-items center
  span
    font-size 18px
    .name
      color gray
.content
  text-align center
  font-size 20px
  font-weight bold
  letter-spacing 1px
</style>
