<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand to="landing">Yag Informática</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav class="ml-auto">

          <b-nav-item-dropdown text="Idioma" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>


    <div class="p-5">
      <router-link class="m-3" to="login"> Entrar </router-link>
      <router-link class="m-3" to="cadastrar"> Cadastrar </router-link>
    </div>
  </div>
</template>

<script>
//import router from '../router'
export default {

  

}
</script>

<style>

</style>