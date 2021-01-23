import firebase from 'firebase';
import router from '../router';
//import router from './router'

class UserService{


SingUp(dados) {
  firebase.auth().createUserWithEmailAndPassword(dados.email, dados.password).then( 
    (user) =>{
      console.log(user);
      router.replace('login ');
    },
    (err) =>{
      console.log(err);
    }
   )
}

SingIn(dados){
  firebase.auth().signInWithEmailAndPassword(dados.email, dados.password).then(
    (user) =>{
      localStorage.setItem("user", user.user)
      router.replace('home');
    }
  )
}

LogOut(){
  localStorage.clear();
  firebase.auth().signOut().then( () => router.replace("login"))
  
}

}

export default new UserService();
