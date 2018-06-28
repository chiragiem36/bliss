<template>
  <q-page class="row items-center justify-center" style="{height: height + 'px">
    <!-- content -->
    <div class="col-xs-10 col-sm-3">
    	<q-field>
    		<q-input float-label="Username" v-model="values._id" />
    	</q-field>
    	<q-field style="padding-top: 20px">
    		<q-input float-label="Password" v-model="values.password" />
    	</q-field>
    	<span>
    		<q-btn @click="login" style="margin-top: 20px" color="primary" label="log in" flat />
    	</span>
    </div>
  </q-page>
</template>

<script>

let domain

if (window.location.port === "8080") {
  domain = "http://localhost:8000"
} else {
  domain = window.location
}

export default {
	data () {
		return {
			values: {
        _id: '',
        password: ''
      }
		}
	},
  // name: 'PageName',
  computed: {
  	height () {
  		return window.innerHeight
  	}
  },
  created () {
    this.$http.get("/login/authenticated").then((res) => {
            if (res.status === 200) {

              this.$store.commit('bliss/setKey', {
                authenticated: true
              })

                this.$router.push("/new=blog")
            }
        }).catch((err) => {
            console.log(err)
            this.$router.push("/login")
            this.$q.notify({message: 'Oh BC !!!... problem ho gayi', color: 'red'})
        }).then(() => this.$q.loading.hide() )
      },
  methods: {
    login () {
      this.$http.post("/login", this.values).then((res) => {
              if (res.status === 200) {
                this.$router.push("new=blog")
              } else {
                this.$router.push("login")
              }
            }).catch( (err) => {
              if (err.status === 500) {
                console.log("Internal Server Error")
              } else {
                console.error("Unexpected Error Occured")
              }
            })
    }
  }
}
</script>

<style>
</style>
