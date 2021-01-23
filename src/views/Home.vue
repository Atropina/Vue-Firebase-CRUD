<template>
  <div>
    <b-navbar toggleable="lg" type="dark" variant="info">
      <b-navbar-brand href="#">Yag Informática</b-navbar-brand>

      <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

      <b-collapse id="nav-collapse" is-nav>
        <b-navbar-nav>
          <b-nav-item href="#">Itens</b-nav-item>
        </b-navbar-nav>

        <b-navbar-nav class="ml-auto">
          <b-nav-item-dropdown text="Idioma" right>
            <b-dropdown-item href="#">EN</b-dropdown-item>
            <b-dropdown-item href="#">ES</b-dropdown-item>
            <b-dropdown-item href="#">RU</b-dropdown-item>
            <b-dropdown-item href="#">FA</b-dropdown-item>
          </b-nav-item-dropdown>

          <b-nav-item-dropdown right>
            <!-- Using 'button-content' slot -->
            <template #button-content>
              <em>Sair</em>
            </template>
          
            <b-dropdown-item @click="logout">Sair</b-dropdown-item>
          </b-nav-item-dropdown>
        </b-navbar-nav>
      </b-collapse>
    </b-navbar>

    <div class="container mt-5">
      <b-card title="Lista de itens" sub-title="Itens Unidade">
        <b-table ref="table" hover :items="items" :fields="fields">
          <template #cell(nome)="row">
            {{ row.item.nome }}
          </template>
          <template #cell(categoria)="row">
            {{ row.item.categoria }}
          </template>
          <template #cell(quantidade)="row">
            {{ row.item.quantidade }}
          </template>

          <template #cell(actions)="row">
            <b-button size="sm" v-b-modal.modal-2 @click="details(row.item.id)" class="mr-1">
              Editar
            </b-button>

            <b-button variant="danger" @click="delet(row.item.id, row.item.nome)" size="sm">
              Excluir
            </b-button>
          </template>
        </b-table>
        <b-button v-b-modal.modal-1 variant="primary">Novo item</b-button>
      </b-card>
    </div>

    <b-modal @ok="add" id="modal-1" title="Cadastro de item">
      <b-form class="p-3 col-md-6 offset-md-3">
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="nome"
            type="text"
            placeholder="Nome"
            required
          ></b-form-input>
        </b-form-group>

        <b-form-group id="input-group-3" label-for="input-3">
          <b-form-input
            id="input-3"
            type="text"
            v-model="categoria"
            placeholder="Categoria"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label-for="input-4">
          <b-form-input
            id="input-4"
            type="number"
            v-model="quantidade"
            placeholder="Quantidade"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
    <b-modal @ok="update" @close="resetModal" id="modal-2" title="Detalhes e modificações">
      <b-form class="p-3 col-md-6 offset-md-3">
        
        <b-form-group id="input-group-1" label-for="input-1">
          <b-form-input
            id="input-1"
            v-model="Unome"
            type="text"
            placeholder="Nome"
            required
          ></b-form-input>
        </b-form-group>
     

        <b-form-group id="input-group-3" label-for="input-3">
          <b-form-input
            id="input-3"
            type="text"
            v-model="Ucategoria"
            placeholder="Categoria"
            required
          ></b-form-input>
        </b-form-group>
        <b-form-group id="input-group-4" label-for="input-4">
          <b-form-input
            id="input-4"
            type="number"
            v-model="Uquantidade"
            placeholder="Quantidade"
            required
          ></b-form-input>
        </b-form-group>
      </b-form>
    </b-modal>
  </div>
</template>

<script>
import userService from "../services/user";
import itemService from "../services/ItemService";
import Swal from "sweetalert2";
export default {
  data() {
    return {
      quantidade: "",
      nome: "",
      categoria: "",
      Uquantidade: "",
      Unome: "",
      Ucategoria: "",
      Uid : "",
    
      fields: [
        { key: "nome", label: "Nome" },
        { key: "categoria", label: "Categoria" },
        { key: "quantidade", label: "Quantidade" },
        { key: "actions", label: "Ações" },
      ],
      items: [],
      usuario: "teste",
    };
  },
  methods: {
    delet(id, item) {
      Swal.fire({
        title: "Gostaria mesmo de deletar este item? <br>" +"• " + item,
        showDenyButton: true,
      
        confirmButtonText: `Sim`,
        denyButtonText: `Cancelar`,
        icon: 'warning'
      }).then((result) => {
       
        if (result.isConfirmed) {
          itemService.delete(id).then( ()=>{
            Swal.fire("Deletado com sucesso", "", "success");
            this.getItem();
          })
        }
      });
    },
    details(id) {
      itemService.getItemById(id).then( (doc)=>{
        if (doc.exists) {
          this.Unome = doc.data().nome
          this.Ucategoria = doc.data().categoria
          this.Uquantidade = doc.data().quantidade
          this.Uid = id
         
        }
      })
    },
    getItem() {
      this.items = [];
      itemService.list().then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.items.push({ id: doc.id, ...doc.data() });
        });
      });
      console.log(this.items);
    },

    logout() {
      userService.LogOut();
    },
    resetModal(){
      this.Uquantidade = ""
      this.Unome = ""
      this.Ucategoria = ""
    },
    update(){
      let dados = {
        nome : this.Unome,
        categoria : this.Ucategoria,
        quantidade : this.Uquantidade
      }
      itemService.update(this.Uid, dados.nome, dados.categoria, dados.quantidade)
      .then(()=>{
        Swal.fire("Atualizado com sucesso", "", "success");
        this.getItem()
      }).catch( (err) =>{
        console.log(err)
      })
    },
    add() {
      let dados = {
        nome: this.nome,
        categoria: this.categoria,
        quantidade: this.quantidade,
      };

      itemService
        .add(dados)
        .then((docRef) => {
          if (docRef) {
            this.getItem();
            Swal.fire("Cadastro", "Item adicionado com sucesso.", "success");
          }
        })
        .catch((err) => {
          console.log(err);
        });
    },
  },
  created() {
    this.getItem();
  },
};
</script>

<style>
</style>