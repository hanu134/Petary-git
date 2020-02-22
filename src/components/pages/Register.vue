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
          <form id="register-form">
            <div class="border-top form-group">
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
                <button id="register__submit-button" v-on:click="register" class="btn btn-info pr-5 pl-5">
                  作成
                </button>
              </div>
              <div class="text-center text-muted mr-5 ml-5 mb-4">
                <small>アカウントを作成することで、Petaryの利用規約に同意するものとします。</small>
              </div>
            </div>
          </form>
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
import firebase from 'firebase';

export default {
  name: "Register",
  data() {
    return {
      name: "",
      email: "",
      password: ""
    };
  },
  methods: {
    register: function() {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(() => {
          createUserInDB(firebase.auth().currentUser,this.name);
          this.$router.push("/users");
        });
    }
  }
};

const createUserInDB = (user, name) => {
  firebase
    .database()
    .ref(`users/${user.uid}`)
    .set({
      username: name,
      createdAt: firebase.database.ServerValue.TIMESTAMP,
    });
  console.log("createUserInDB");
};

</script>

<style>
.logo:hover {
  text-decoration: none;
}
</style>