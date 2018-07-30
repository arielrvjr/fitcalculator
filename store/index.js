import Vuex from 'vuex'
import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'
import config from '~/firebaseinit'

firebase.initializeApp(config);
const firestore = firebase.firestore();
const auth = firebase.auth();
const settings = { timestampsInSnapshots: true};
firestore.settings(settings);

const createStore = () => {
  return new Vuex.Store({
    state: {
      db: firestore,
      brand: {title: 'FITCALCULATOR'},
      isAuth: false,
      authUser: null,
      products: [],
      plans: {}
    },
    actions:{       
      async getProduct({commit,rootState}, ref) {
        let refData = rootState.db.collection(ref).orderBy('title', 'asc')
        let data = await refData.get()
        data.forEach(product => commit('SET_PRODUCT', { product }))
      },
      signIn({commit}, {email, password}) {
            return new Promise((resolve,reject)=>{
              auth.signInWithEmailAndPassword(
                email,
                password
              ).then(firebaseUser => {
                commit('SET_USER', firebaseUser.user)
                resolve();
              }).catch(e => {
                console.log('login error', e);
                reject();
              });
            }); 
        },
      signOut({commit}){
        return new Promise((resolve, reject) => {
          auth.signOut().then(() => {
            commit('SET_USER', null)
            resolve();
          })
          .catch(err => {
            console.log(error)
            reject();
          });
        });
      }
    },
    mutations: {
      SET_USER(state,user){
        state.authUser = user;
        if (user) {
          state.isAuth = true;
        }
        else {
          state.isAuth = false;
        }
      },
      SET_PRODUCT(state, { product }) {
        const data = product.data()
        state.products.push({
          id: product.id,
          title: data.title,
          pp: Number(data.pp),
          pv: Number(data.pv),
          25: Number(data["25"]),
          35: Number(data["35"]),
          42: Number(data["42"]),
          50: Number(data["50"]),
        });
          
        
        
      }

    }
  })
}

export default createStore