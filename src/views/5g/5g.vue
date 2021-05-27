<template>
  <div class="app-container">
    <van-nav-bar
      title="5G登网记录"
      left-text="返回"
      left-arrow
      @click-left="onClickLeft"
    />
    <van-field v-model="tel" type="tel" label="手机号" placeholder="请输入手机号" required>
      <template #button>
        <van-button size="small" round block color="linear-gradient(to right, #ff6034, #ee0a24)" @click="handleInput">录入</van-button>
      </template>
    </van-field>
    <van-divider>已录入的手机号码</van-divider>
    <van-empty v-if="emptyShow" image="error" description="暂无号码" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      error-text="请求失败，点击重新加载"
      @load="onload"
    >
      <van-field v-for="item in list" :key="item.id" title="手机号" :value="item.telNumber">
        <template #button>
          <van-button size="small" round block color="linear-gradient(to right, #ff6034, #ee0a24)" @click="handleDelete(item.id)">删除</van-button>
        </template>
      </van-field>
    </van-list>
  </div>
</template>

<script>
import { get5GList, add5G, delete5g } from '@/api/public'
import { notify } from '@/utils/index'
export default {
  name: 'FiveGen',
  data () {
    return {
      tel: '',
      emptyShow: false,
      loading: false,
      finished: false,
      refreshing: false,
      list: []
    }
  },
  created () {
    this.handleQuery()
  },
  methods: {
    handleDelete (id) {
      delete5g(id).then(res => {
        const { msg, success } = res
        notify(msg, success)
        this.handleQuery()
      })
    },
    handleInput () {
      const res = new RegExp('^((13[0-9])|(14[5-9])|(15([0-3]|[5-9]))|(16[6-7])|(17[1-8])|(18[0-9])|(19[1|3])|(19[5|6])|(19[8|9]))\\d{8}$').test(this.tel)
      if (res) {
        add5G(this.tel).then(res => {
          const { msg, success } = res
          notify(msg, success)
          this.handleQuery()
        })
      } else {
        notify('手机格式错误', false)
      }
    },
    handleQuery () {
      get5GList().then(res => {
        const { msg, success, obj } = res
        if (success) {
          this.list = obj
          this.loading = false
          this.finished = true
        } else {
          this.$notify({
            type: 'danger',
            message: msg
          })
        }
      })
    },
    onClickLeft () {
      this.$router.push({ path: '/home' })
    },
    onload () {
      this.handleQuery()
    }
  }
}
</script>

<style scoped>

</style>
