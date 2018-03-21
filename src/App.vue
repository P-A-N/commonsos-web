<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <a class="navbar-brand" href="#">Commons OS</a>
      <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
              aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse" id="navbarCollapse">
        <ul class="navbar-nav mr-auto">
          <li class="nav-item" :class="{active: isActive('/ads')}">
            <a class="nav-link" href="#/ads">Advertisements</a>
          </li>
          <li class="nav-item" :class="{active: isActive('/agreements')}">
            <a class="nav-link" href="#/agreements">Accepted services</a>
          </li>
          <li class="nav-item">
            <a class="nav-link disabled" href="#">Chat</a>
          </li>
        </ul>
        <user-select/>
      </div>
    </nav>

    <main role="main" class="container">
      <router-view/>
    </main>
  </div>
</template>

<script>
  import UserSelect from './components/UserSelect'
  import router from './router'

  export default {
    name: 'App',
    components: {UserSelect},
    methods: {
      isActive: (path) => router.currentRoute.path.startsWith(path)
    },
  }
</script>

<style>
  #app {
    font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
