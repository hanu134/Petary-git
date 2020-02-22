<template>
  <div class="userpage">
    <header class="fixed-top mb-3">
      <nav class="navbar bg-light p-3 justify-content-around">
        <font-awesome-icon icon="sign-out-alt" flip="horizontal" size="2x" @click="logout" type="button" class="icon" />
        <h2></h2>
        <font-awesome-icon icon="crown" size="2x" type="button" class="icon" />
      </nav>
    </header>
    
    <footer class="fixed-bottom">
      <nav class="navbar bg-light p-3 justify-content-around">
        <font-awesome-icon icon="home" size="2x" type="button" class="icon" />
        <font-awesome-icon icon="edit" size="2x" type="button" class="icon" />
        <router-link to="/users"><font-awesome-icon icon="user" size="2x" type="button" class="icon" /></router-link>
      </nav>
    </footer>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  methods: {
    logout() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log("ログアウト成功");
          this.$router.push("/");
        });
    }
  }
};
</script>

<style>
.icon {
  color: gray;
}
</style>