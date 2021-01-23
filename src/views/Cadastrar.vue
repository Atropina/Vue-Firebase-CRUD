<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Yag Informática</b-navbar-brand>

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

   
      <b-form class="p-3  col-md-6 offset-md-3 loginForm ">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="email"
            type="email"
            placeholder="E-mail"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label-for="input-3">
          <b-form-input
            id="input-3"
            v-model="password"
            type="password"
            placeholder="Senha"
            required
          ></b-form-input>
        </b-form-group>

        <b-button @click="cadastrar" variant="primary">Cadastrar</b-button>
      
      </b-form>
    </div>
 
</template>

<script>
import userService from '../services/user'
export default {
  
  data() {
    return {
     
        email: "",
        password: "",
     
    };
  },
  methods: {
    cadastrar(){
        this.msgErro = "";

        let dadosUsuario = {
            email: this.email,
            password: this.password
        }
      userService.SingUp(dadosUsuario);
  }
  
  }
};
</script>

<style>
.loginForm {

  height: 250px;
  top: 100px;
  background-color: rebeccapurple;
}
.divLogin{
  
}
</style>