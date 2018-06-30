<template>
  <div class="row justify-center" style="padding-top: 20px; height: 95%; overflow-y: auto">
    <div class="col-xs-10">
    	<div class="row justify-center">
    		<span class="col-xs-10 col-sm-10" style="margin-top: 20px">
                <q-field>
                    <q-input float-label="Title" placeholder="Title for your shit" v-model="values.title" />
                </q-field>
    			<!-- <q-field label="Image" style="padding-top: 20px">
    				<q-input type="file" ref="image" />
    			</q-field> -->
    		</span>
            <span class="col-xs-10 col-sm-10" style="margin-top: 20px">
                <q-field>
                    <q-input float-label="Description" placeholder="Title for your shit" v-model="values.desc" />
                </q-field>
            </span>
            <span class="col-xs-10 col-sm-10" style="margin-top: 20px">
                <q-field>
                    <q-input float-label="Tags" placeholder="tags to filter blogs" v-model="values.tags" />
                </q-field>
            </span>
            <span class="col-xs-4">
                <q-field style="margin-top: 20px">
                    <q-input float-label="Image Url" placeholder="Link to your shitty blog image" v-model="values.img_url" />
                </q-field>
            </span>
            <span class="col-xs-4 offset-xs-2">
                <q-field style="margin-top: 20px">
                    <q-input float-label="Thumbnail Url" placeholder="Link to your shitty blog image thumbnail" v-model="values.thumb" />
                </q-field>
            </span>
            <span class="col-xs-4">
                <q-field style="margin-top: 20px">
                    <q-input float-label="Author name" placeholder="Tera naam bata BTC" v-model="values.author" />
                </q-field>
            </span>
    	</div>
    	<div class="row justify-center" style="margin-top: 20px">
    		<span class="col-xs-10 col-sm-10">
    			<q-field style="margin-top: 20px">
    				<q-input float-label="Content" placeholder="Here goes your Shit" type="textarea" :rows="rows" v-model="values.content" />
    			</q-field>
    		</span>
    		<span class="col-xs-10 col-sm-10" style="padding-top: 20px; padding-bottom: 20px">
    			<q-btn @click.native="add" label="Submit your shit" color="primary" />
    		</span>
    	</div>
    </div>
  </div>
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
                title: '',
                desc: '',
                img_url: '',
                thumb: '',
                content: '',
                author: '',
                tags: ''
            }
		}
	},
	computed: {
		height () {
			return window.innerHeight
		},
		rows () {
			if (this.$q.platform.is.mobile) {
				return 15
			}
			return 25
		}
	},
    created () {
        this.$q.loading.show()
        this.$http.get("/login/authenticated").then((res) => {
            if (res.status !== 200) {
                this.$router.push("/login")
            }
        }).catch((err) => {
            console.log(err)
            this.$router.push("/login")
            this.$q.notify({message: 'Oh BC !!!... problem ho gayi', color: 'red'})
        }).then(() => this.$q.loading.hide() )
    },
    methods: {
        add () {

            const isValid = Object.keys(this.values).every((k) => {
                if (this.values[k].length > 3) {
                    return true
                } else {
                    return false
                }
            })

            if (!isValid) {
                return
            }

            this.$q.loading.show()

            const o = this.values
            o.time = new Date()
            o._id = Date.now()

            o.tags.replace(" ", "")

            o.tags = o.tags.split(",")

            console.log(o)

            this.$http.post("/blogs/new", o).then((res) => {
                if (res.status === 200) {
                        this.$q.notify({message: 'Blog Add ho gaya MC', color: 'positive'})
                    } else {
                        // shit not added
                        this.$q.notify({message: 'Oh BC ... problem ho gayi', color: 'danger'})
                    }
                }).catch((err) => {
                    console.log(err)
                    this.$q.notify({message: 'Oh BC ... problem ho gayi', color: 'danger'})
                }).then(() => this.$q.loading.hide())
        }
    }
  // name: 'PageName',
}
</script>

<style>

	* {
		font-size: 12px;
    white-space: pre-wrap;
	}

</style>
