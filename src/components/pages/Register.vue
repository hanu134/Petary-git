<template>
  <div class="register">
    <header>
      <div class="text-center">
        <router-link to="/" class="logo"><h1 class="d-inline-block text-muted mt-5 mb-4"><font-awesome-icon icon="paw" size="xs" /> Petary <font-awesome-icon icon="paw" size="xs" /></h1></router-link>
      </div>
    </header>
    <div class="container">
      <div class="row justify-content-center">
        <div class="col-sm-6">
          <div class="card overflow-auto mb-4">
            <div class="card-header text-center text-muted">
              <h5>利用規約</h5>
            </div>
            <div class="card-body">
              ...
            </div>
          </div>
            <div class="border-top form-group id-input">
              <input id="register-id" type="text" v-bind:class="{ 'is-invalid':inValid }" class="form-control mt-3" placeholder="ユーザーID" v-model="id" @blur="check">
            </div>
            <div class="form-group">
              <input id="register-name" type="text" class="form-control mt-3" placeholder="ユーザーネーム" v-model="name">
            </div>
            <div class="form-group">
              <input id="register-email" type="email" class="form-control mt-3" placeholder="メールアドレス" v-model="email">
            </div>
            <div class="form-group">
              <input id="register-password" type="password" class="form-control" placeholder="パスワード" v-model="password">
          </div>
          <div class="form-group register__submit">
            <div class="text-center">
              <button @click="register" class="btn btn-info pr-5 pl-5">
                作成
              </button>
            </div>
            <div class="text-center text-muted mr-5 ml-5 mb-4">
              <small>アカウントを作成することで、Petaryの利用規約に同意するものとします。</small>
            </div>
          </div>
          <div class="border-top text-center">
            <div class="text-muted mt-4">
              既にアカウントをお持ちの場合
            </div>
            <router-link to="/login">ログイン</router-link>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  name: 'Register',
  data () {
    return {
      id: '',
      inValid: false,
      name: '',
      email: '',
      password: ''
    }
  },
  methods: {
    check () {
      const vm = this
      console.log('check')
      // TODO:users参照のためDatabaseルールでusersのread権限を公開中
      firebase.database().ref(`/userids/${this.id}`).once('value', function (snapshot) {
        console.log(snapshot)
        console.log(snapshot.val())
        if (snapshot.val() !== null) {
          console.log('id使用不可')
          vm.inValid = true
        } else {
          console.log('id使用可能')
          vm.inValid = false
        }
      })
    },
    register () {
      // TODO:リファクタリング必要(vmとthis周り)
      const vm = this
      firebase.database().ref(`/userids/${this.id}`).once('value', function (snapshot) {
        console.log(snapshot.val())
        if (snapshot.val() !== null) {
          console.log('Id使用不可')
        } else {
          firebase
            .auth()
            .createUserWithEmailAndPassword(vm.email, vm.password)
            .then((user) => {
              createUserInDB(vm.id, vm.name, firebase.auth().currentUser)
              saveIdInDB(vm.id, vm.name)
              vm.$router.push({name: 'users', params: {id: vm.id}})
            })
            .catch((error) => {
              console.log('アカウント作成エラー', error)
            })
        }
      })
    }
  }
}

const saveIdInDB = (userid, name) => {
  firebase
    .database()
    .ref(`userids/${userid}`)
    .set({
      user: name
    })
  console.log('saveIdInDB')
}

const createUserInDB = (userid, name, user) => {
  firebase
    .database()
    .ref(`users/${user.uid}`)
    .set({
      id: userid,
      username: name,
      createdAt: firebase.database.ServerValue.TIMESTAMP
    })
  console.log('createUserInDB')
}
</script>

<style>
  .logo:hover {
    text-decoration: none;
  }
</style>
