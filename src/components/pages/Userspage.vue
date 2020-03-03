<template>
  <div class="userpage">
    <header class="fixed-top mb-3">
      <nav class="navbar bg-light p-3 justify-content-around">
        <font-awesome-icon icon="sign-out-alt" flip="horizontal" size="2x" @click="logout" type="button" class="icon" />
        <h2>{{$route.params.id}}</h2>
        <router-link to="/ranking"><font-awesome-icon icon="crown" size="2x" type="button" class="icon" /></router-link>
      </nav>
    </header>

    <footer class="fixed-bottom">
      <nav class="navbar bg-light p-3 justify-content-around">
        <router-link to="/timeline"><font-awesome-icon icon="home" size="2x" type="button" class="icon" /></router-link>
        <div>
          <font-awesome-icon icon="edit" size="2x" type="button" class="icon" v-b-modal.modal-1/>
          <b-modal id="modal-1" size="lg" centered hide-footer title="Petary">
            <div class="container">
              <b-form-textarea id="textarea" rows="3" max-rows="5" v-model="content"></b-form-textarea>
              <vue-dropzone @vdropzone-complete="afterComplete" @vdropzone-removed-file="afterDelete" ref="myVueDropzone" id="dropzone" :options="dropzoneOptions"></vue-dropzone>

              <div class="row border-top pt-3 mt-3">
                <button class="btn btn-primary col-auto ml-auto">投稿</button>
              </div>
            </div>
          </b-modal>
        </div>
        <font-awesome-icon icon="user" size="2x" type="button" class="icon" @click="jumpUsers" />
      </nav>
    </footer>
  </div>
</template>

<script>
import firebase from 'firebase'
import vue2Dropzone from 'vue2-dropzone'
import 'vue2-dropzone/dist/vue2Dropzone.min.css'
import 'firebase/storage'
let uuid = require('uuid')

export default {
  name: 'app',
  components: {
    vueDropzone: vue2Dropzone
  },
  data () {
    return {
      dropzoneOptions: {
        url: 'https://httpbin.org/post',
        addRemoveLinks: true,
        dictDefaultMessage: 'UPLOAD ME',
        maxFiles: 4
      },
      images: [],
      content: ''
    }
  },
  methods: {
    async afterComplete (upload) {
      var imageName = uuid.v1()
      this.isLoading = true
      try {
        // save image
        let file = upload
        var metadata = {
          contentType: 'image/png'
        }
        var storageRef = firebase.storage().ref()
        var imageRef = storageRef.child(`images/${imageName}.png`)
        await imageRef.put(file, metadata)
        // var downloadURL = await imageRef.getDownloadURL()
        this.images.push({ src: `images/${imageName}.png` })
        console.log(this.images)
      } catch (error) {
        console.log(error)
      }
    },
    afterDelete (file) {
      console.log(file)
    },
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
