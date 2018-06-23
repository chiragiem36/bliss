<template>
  <div >
    <div class="row justify-around" style="padding-top: 5px">
          <div class="col-xs-3">
            <q-field>
              <q-select float-label="category" :options="categories" v-model="category" />
            </q-field>
          </div>
        </div>
        <q-scroll-area style="padding-top: 10px" :style="{'height': height - 60 + 'px'}" class="row">
        	<div class="col-xs-10">
        		<div class="row justify-center" style="padding-bottom: 5px">
        			<q-card v-for="blog in blogs" :key="blog.title" v-if="blog.tags.indexOf(category) > -1" color="white" text-color="grey-9" class="col-xs-12 col-sm-12 col-md-10" style="margin-bottom: 50px">
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
export default {
	data () {
		return {
			categories: [{label: 'All', value: 'all'}, {label: 'None', value: 'none'}],
			category: 'all',
			ts: ''
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
