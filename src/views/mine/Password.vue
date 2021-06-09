<template>
  <div class="app-container">
    <div class="title">
      修改密码工号
    </div>
    <van-form @submit="onSubmit">
      <van-field
        v-model="formData.userUuid"
        name="uuid"
        label="uuid"
        disabled
      ></van-field>
      <van-field
        v-model="formData.password"
        label="密码"
        placeholder="密码"
        :rules="[{ required: true, message: '请填写密码' }]"
      ></van-field>
      <van-field
        v-model="formData.confirmPassword"
        label="重复密码"
        placeholder="重复密码"
        :rules="[{ required: true, message: '请重复密码' }]"
      ></van-field>
      <van-field
        v-model="formData.jobNumber"
        label="工号"
        :rules="[{ required: true, message: '请输入工号' }]"
      ></van-field>
      <div style="margin: 16px;">
        <van-button round block color="linear-gradient(to right, #ff6034, #ee0a24)" native-type="submit">提交</van-button>
      </div>
    </van-form>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { notify } from '@/utils'
import { updatePassword } from '@/api/user'

export default {
  name: 'Password',
  data () {
    return {
      formData: {
        userUuid: '',
        password: '',
        confirmPassword: '',
        jobNumber: ''
      }
    }
  },
  computed: {
    ...mapGetters([
      'uuid',
      'jobNum'
    ])
  },
  created () {
    this.formData = {
      userUuid: this.uuid,
      password: '',
      confirmPassword: '',
      jobNumber: this.jobNum
    }
  },
  methods: {
    onSubmit () {
      if (this.formData.password === this.formData.confirmPassword) {
        const params = {
          userUuid: this.formData.userUuid,
          password: this.formData.password,
          jobNum: this.formData.jobNumber
        }
        updatePassword(params).then(res => {
          notify('修改成功，重新登录', true)
          this.$store.dispatch('user/logout').then(res => {
            this.$router.push({ path: '/login' })
          })
        })
      } else {
        notify('两次密码不一致', false)
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.app-container
  .title
    text-align center
    font-size 20px
    font-weight bold
    letter-spacing 1px
</style>
