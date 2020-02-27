<template>
  <div class="userpage">
    <header class="fixed-top mb-3">
      <nav class="navbar bg-light p-3 justify-content-around">
        <font-awesome-icon icon="sign-out-alt" flip="horizontal" size="2x" @click="logout" type="button" class="icon" />
        <h2>{{$route.params.id}}</h2>
        <router-link to="/ranking"><font-awesome-icon icon="crown" size="2x" type="button" class="icon" /></router-link>
      </nav>
    </header>

<vue-dropzone ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

    <footer class="fixed-bottom">
      <nav class="navbar bg-light p-3 justify-content-around">
        <router-link to="/timeline"><font-awesome-icon icon="home" size="2x" type="button" class="icon" /></router-link>
        <font-awesome-icon icon="edit" size="2x" type="button" class="icon" data-toggle="modal" data-target="#modal1" />
        <font-awesome-icon icon="user" size="2x" type="button" class="icon" @click="jumpUsers" />
      </nav>
    </footer>
  </div>
</template>

<script>
import firebase from 'firebase'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'

export default {
  name: 'app',
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        thumbnailWidth: 200,
        addRemoveLinks: true,
        dictDefaultMessage: "<i class='fa fa-cloud-upload'></i>UPLOAD ME",
        maxFiles: 3
      }
    }
  },
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
      firebase.database().ref(`/users`).orderByChild('uid').equalTo(uid).once('value', function (snapshot) {
        const id = Object.keys(snapshot.val()).pop()
        console.log('userid:' + id)
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
