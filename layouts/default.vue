<template>
<div > 
<b-navbar  toggleable="md" type="light" fixed="top">
        <b-container>
<b-navbar-toggle target="nav_collapse"></b-navbar-toggle>

  <b-navbar-brand href="#">{{ brand.title }}</b-navbar-brand>
  <b-collapse is-nav id="nav_collapse">
    <b-navbar-nav class="ml-auto" >
      <!-- <li class="nav-item">
      <nuxt-link to="/products" class="nav-link">Productos</nuxt-link>
      </li> -->
      <b-nav-item v-if="isAuth" v-on:click="signOut">Cerrar Sesion</b-nav-item>
    </b-navbar-nav>
  </b-collapse> 
  </b-container>
    </b-navbar>
    <nuxt />
    
    <footer class="mt-4">
        <p class="text-center copyright">{{version}} | AAYYFITLOVE 2018 | Distribuidores independientes de Herbalife.&nbsp;</p>
    </footer>

</div>
    
  
  
</template>

<style>
body {
  margin:0;
  margin-top: 5rem;
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
  font-size:1rem;
  font-weight:400;
  line-height:1.5;
  color:#212529;
  text-align:left;
  background-color:#efefef;
}


.section {
  padding-top:2.5rem;
}

.follow {
  font-weight:600;
}



.fa.fa-instagram {
  font-weight:600;
}

footer {
  padding:50px 0;
  background-color:#fff;
  color:#4b4c4d;
}

.copyright {
  margin-top:14px;
  margin-bottom:0;
  font-size:13px;
  opacity:0.6;
}

.navbar-light{
    background: white;
}
.navbar-toggler:focus {
  background:none;
}

.navbar-toggler:focus {
  background:none;
}

.navbar-toggler {
  border-color:#ddd;
  color:#888;
}

.navbar-nav a.active:hover {
  color:#3bc8c8 !important;
  font-weight:600;
  background:none;
  pointer-events:none;
}

.navbar .navbar-nav .nav-link {
  padding-left:18px;
  padding-right:18px;
}

.navbar-nav .nav-link {
  color:#465765;
}

.navbar-brand {
  font-weight:bold;
  color:inherit;
  text-transform: uppercase;
}

.navbar-nav .nav-link:focus, .navbar-nav .nav-link:hover {
  color:rgba(0,0,0,.7) !important;
}

.nav-link:focus, .nav-link:hover {
  text-decoration:none;
}





</style>
<script>
import {version } from '~/package.json'
import $ from 'jquery'
import { mapState } from 'vuex'

export default {
  data(){
    return {
      version: version
    }
  },
  computed: mapState([
    'brand', 'isAuth'
  ]),
  
    methods: {
      signOut(evt){
        evt.preventDefault()
        this.$store.dispatch('signOut').then(() => {
                this.$router.push('/login');
            }).catch(e => console.log(e));
      },
    scrollIntoView (evt) {
      evt.preventDefault()
      const href = evt.target.getAttribute('href')
      const el = href ? document.querySelector(href) : null
      if (el) {
        $('html, body').animate({
      scrollTop: el.offsetTop
    }, 1000);
      }
    }
  }
}
</script>
