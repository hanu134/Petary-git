<template>
  <div class="timeline">
    <header class="fixed-top mb-3">
      <nav class="navbar bg-light p-3 justify-content-around">
        <font-awesome-icon icon="sign-out-alt" flip="horizontal" size="2x" @click="logout" type="button" class="icon" />
        <h2>Petary</h2>
        <router-link to="/ranking"><font-awesome-icon icon="crown" size="2x" type="button" class="icon" /></router-link>
      </nav>
    </header>

    <footer class="fixed-bottom">
      <nav class="navbar bg-light p-3 justify-content-around">
        <router-link to="/timeline"><font-awesome-icon icon="home" size="2x" type="button" class="icon" /></router-link>
        <font-awesome-icon icon="edit" size="2x" type="button" class="icon" />
        <font-awesome-icon icon="user" size="2x" type="button" class="icon" @click="jumpUsers" />
      </nav>
    </footer>
  </div>
</template>

<script>
import firebase from 'firebase'

export default {
  methods: {
    logout () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          console.log('ログアウト成功')
          this.$router.push('/')
        })
    },
    jumpUsers () {
      const vm = this
      const uid = firebase.auth().currentUser.uid
      const firebaseRef = firebase.database().ref(`/users/${uid}`)
      firebaseRef.once('value', function (snapshot) {
        const id = snapshot.val().id
        vm.$router.push({name: 'users', params: {id: id}})
      })
    }
  }
}
</script>

<style>
  .icon {
    color: gray;
  }
</style>
