<template>
  <div class="app-container">
    <van-contact-card
      type="edit"
      :name="name"
      :tel="phone"
      @click="onEdit"
    />
    <van-action-sheet description="操作" close-on-click-action cancel-text="取消" v-model="show" :actions="actions" @select="onSelect" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
export default {
  name: 'Mine',
  data () {
    return {
      show: false,
      actions: [
        { name: '登出', key: 1 }
      ]
    }
  },
  computed: {
    // 使用对象展开运算符将 getter 混入 computed 对象中
    ...mapGetters([
      'name',
      'area',
      'grid',
      'phone'
      // ...
    ])
  },
  methods: {
    onEdit () {
      this.show = true
    },
    onSelect (item) {
      item.key === 1 ? this.$store.dispatch('user/logout').then(res => {
        this.$router.push({ path: '/login' })
      }) : this.show = false
    }
  }
}
</script>

<style scoped>

</style>
