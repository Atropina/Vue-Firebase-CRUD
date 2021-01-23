import firebase from 'firebase';

class ItemService{

  add(dados){
    return firebase.firestore().collection("itens").add({
      nome : dados.nome,
      categoria : dados.categoria,
      quantidade : dados.quantidade
    })
  }

  list(){
    return firebase.firestore().collection("itens").get();
  }
  delete(id){
    return firebase.firestore().collection('itens').doc(id).delete()
  }
  getItemById(id){
    return firebase.firestore().collection("itens").doc(id).get();
  }
  update(id, nome, categoria, quantidade){
    return firebase.firestore().collection('itens').doc(id).update( 
      {
        categoria : categoria,
        nome : nome,
        
        quantidade : quantidade
      }
    )
  }


}

export default new ItemService();