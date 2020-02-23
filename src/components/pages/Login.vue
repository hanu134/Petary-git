<template>
  <div class="login">
    <header>
      <div class="text-center">
        <router-link to="/" class="logo"><h1 class="d-inline-block text-muted mt-5 mb-4"><font-awesome-icon icon="paw" size="xs" /> Petary <font-awesome-icon icon="paw" size="xs" /></h1></router-link>
      </div>
    </header>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="form-group">
            <input id="login-email" type="email" class="form-control mt-3" placeholder="メールアドレス" v-model="email">
          </div>
          <div class="form-group">
            <input id="login-password" type="password" class="form-control" placeholder="パスワード" v-model="password">
          </div>
          <div class="form-group login__submit">
            <div class="text-center mb-4">
              <button @click="login" class="btn btn-info pr-5 pl-5">
                ログイン
              </button>
            </div>
          </div>
          <div class="border-top text-center">
            <div class="text-muted mt-4">
              アカウントをお持ちでない場合
            </div>
            <router-link to="/register">アカウント作成</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Login',
  data () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then((user) => {
          this.$router.push('/users')
          console.log('ログイン成功')
        })
        .catch((error) => {
          console.error('ログインエラー', error)
        })
    }
  }
}
</script>

<style>
  .logo:hover {
    text-decoration: none;
  }
</style>
