<template>
  <div class="top">
      <header>
          <div class="text-center">
            <router-link to="/" class="logo"><h1 class="d-inline-block text-muted mt-5 mb-4"><font-awesome-icon icon="paw" size="xs" /> Petary <font-awesome-icon icon="paw" size="xs" /></h1></router-link>
          </div>
      </header>
      <div class="container">
          <div class="text-center">
              <div class="d-inline-flex flex-column">
                  <router-link to="/login"><button class="btn btn-info mt-2 login-button"> 　　 ログイン 　　 </button></router-link>
                  <router-link to="/register"><button class="btn btn-info mt-3 register-button">新規アカウント作成</button></router-link>
              </div>
          </div>
      </div>
      <footer class="text-center">
          <div class="mt-4">
              <small>&copy; 2020 Petary, Inc.</small>
          </div>
      </footer>
  </div>
</template>

<style>
.logo:hover {
  text-decoration: none;
}
</style>
