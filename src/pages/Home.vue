<template>
  <div >
        <q-scroll-area style="padding-top: 10px" :style="{'height': height - 150 + 'px'}" class="row">
        	<div class="col-xs-10">
        		<div v-for="blog in blogs" class="row justify-center" style="padding-bottom: 5px">
        			<q-card :key="blog.title" color="white" text-color="grey-9" class="col-xs-11  col-sm-8 col-md-6" style="margin-bottom: 10px">
        				<q-card-title class="text-grey-8">
        					{{ blog.title }}
        					<span slot="subtitle" class="text-grey-8">Time - <span class="text-grey-6">{{ new Date(blog.date).toLocaleTimeString() }}</span></span>
        				</q-card-title>
        				<q-card-separator />
        				<q-card-main>
        					<p style="overflow: hidden" :style="{'height': maxW}">
        						<img src="/assets/sample.png" width="100%" />
        					</p>
        					<p>{{ blog.desc }}</p>
        				</q-card-main>
        			</q-card>
        		</div>
        	</div>
        </q-scroll-area>
  </div>
</template>

<script>

let domain

if (window.location.port === "8080") {
  domain = "http://localhost:8000"
} else {
  domain = window.location.origin
}

export default {
	data () {
		return {
      blogs: [],
			ts: ''
		}
	},
  created () {
    this.$http.get(domain + '/blogs/latest').then((res) => {
      console.log(res)
      if (res.status === 200 ) {
        this.blogs.push(res.body)
      }
      return res.body._id
    }).then((id) => {
      this.getMore(id)
    })
  },
  methods: {
    getMore (ts) {
      this.$http.get(domain + '/blogs/last=' + ts).then((res) => {
        if (res.status === 200) {
          this.blogs.push(res.body)
          this.getMore(res.body._id)
        }
      }).catch((err) => {
        console.error(err)
      })
    }
  },
	computed: {
		height () {
			return window.innerHeight
		},
		blogs () {
			return [
				{
					title: 'Hello world',
					desc: 'Saying Hello to the world',
					tags: 'none',
					date: new Date()
				},
				{
					title: 'Hello world',
					desc: 'Saying Hello to the world',
					tags: 'none',
					date: new Date()
				},
				{
					title: 'Hello world',
					desc: 'Saying Hello to the world',
					tags: 'none',
					date: new Date()
				}
			]
		},
		maxW () {
			if (this.$q.platform.is.mobile) {
				return '150px'
			} else {
				return '350px'
			}
		}
	}
  // name: 'PageName',
}
</script>

<style>

	* {
		font-size: 12px
	}

</style>
