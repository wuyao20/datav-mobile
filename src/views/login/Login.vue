<template>
  <div class="login">
    <div class="bg bg-filter"></div>
    <div class="content">
      <div class="title">
        <img class="img" src="../../assets/unicom.png">
        <div class="title-text">
          徐州联通报表系统
        </div>
      </div>
      <van-form @submit="onSubmit">
          <van-field
            class="form-item"
            v-model="listQuery.username"
            label="手机号"
            label-width="60"
            :rules="[{ required: true, message: '请填写手机号' }]"
          ></van-field>
          <van-field
            class="form-item"
            v-model="listQuery.password"
            type="password"
            label="密码"
            label-width="60"
            :rules="[{ required: true, message: '请填写密码' }]"
          ></van-field>
        <div style="margin: 16px;">
          <van-button :loading="btnLoading" round block color="linear-gradient(to right, #ff6034, #ee0a24)" native-type="submit">登录</van-button>
        </div>
        </van-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
      listQuery: {
        username: '',
        password: ''
      },
      btnLoading: false
    }
  },
  methods: {
    onSubmit () {
      this.btnLoading = true
      this.$store.dispatch('user/login', this.listQuery).then(() => {
        this.$router.push({ path: this.redirect || '/home' })
        this.btnLoading = false
      }).catch(() => {
        this.loading = false
      })
    }
  }
}
</script>

<style lang="stylus" scoped>
.login
  position relative
  height 100%
  width 100%
  .bg
    position absolute
    top 0
    left 0
    height 100%
    background-image url("../../assets/main.jpg")
    background-repeat no-repeat
    background-size cover
  .bg-filter
    float: left;
    width: 100%;
    filter: blur(3px);
  .content
    position relative
    top 100px
    display flex
    flex-direction column
    justify-content center
    align-items center
    .title
      display flex
      flex-direction row
      flex-wrap nowrap
      justify-content center
      align-items center
      .img
        height 100px
        width 100px
      .title-text
        font-size 18px
        font-weight bold
        letter-spacing 1px
    .van-form
      margin-top 20px
      box-shadow: 0px 0px 20px grey
      width 90%
      background: #FFFFFF
      border-radius 1em
      display: block
      .form-item
        border-radius: 2em
        margin 10px 0 10px 0
</style>
