<template>
    <div class="login-clean">
         <b-row>
        <b-col cols="10" offset="1" md="8" offset-md="2" lg="6" offset-lg="3" xl="4" offset-xl="4" >
            <form method="post">
            <b-alert variant="danger"
             dismissible
             fade
             :show="showDismissibleAlert"
             @dismissed="showDismissibleAlert=false">
            {{errorLogin}}
    </b-alert>
            <h2 class="sr-only">Login Form</h2>
            <div class="illustration"><i class="icon ion-ios-navigate"></i></div>
            <div class="form-group"><input class="form-control" v-model="loginUser.email" type="email" name="email" placeholder="Email"></div>
            <div class="form-group"><input class="form-control" v-model="loginUser.password" type="password" name="password" placeholder="Password"></div>
            <div class="form-group"><button class="btn btn-primary btn-block" type="submit" v-on:click="signIn">Log In</button>
            </div>
        </form>
        </b-col>
        
    </b-row>
        
    </div>
</template>
<script>
export default {

    data(){
        return {
            loginUser: {},
            showDismissibleAlert: false,
            errorLogin: ""
        }
    },
    methods:{
        async signIn(e){
            e.preventDefault();
            this.$store.dispatch('signIn',this.loginUser).then(() => {
                this.$router.push('/products');
            }).catch(e => {
                this.errorLogin= e.message;
                this.showDismissibleAlert = true;
            });
        }
    }
}
</script>

<style>
.login-clean {

  padding:80px 0;
}

.login-clean form {
  margin:0 auto;
  background-color:#ffffff;
  padding:40px;
  border-radius:4px;
  color:#505e6c;
  box-shadow:1px 1px 5px rgba(0,0,0,0.1);
}

.login-clean .illustration {
  text-align:center;
  padding:0 0 20px;
  font-size:100px;
}

.login-clean form .form-control {
  background:#f7f9fc;
  border:none;
  border-bottom:1px solid #dfe7f1;
  border-radius:0;
  box-shadow:none;
  outline:none;
  color:inherit;
  text-indent:8px;
  height:42px;
}

.login-clean form .btn-primary {
  border:none;
  border-radius:4px;
  padding:11px;
  box-shadow:none;
  margin-top:26px;
  text-shadow:none;
  outline:none !important;
}



.login-clean form .btn-primary:active {
  transform:translateY(1px);
}

.login-clean form .forgot {
  display:block;
  text-align:center;
  font-size:12px;
  color:#6f7a85;
  opacity:0.9;
  text-decoration:none;
}

.login-clean form .forgot:hover, .login-clean form .forgot:active {
  opacity:1;
  text-decoration:none;
}


</style>
