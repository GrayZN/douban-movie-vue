<template>
    <div class="movieTab">
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" title="正在热映" />
            <mu-tab value="tab2" title="即将上映" @click.once="fetchData_coming_soon()"/>
        </mu-tabs>
        <mu-content-block class="loadingBox" v-show="loading">
            <mu-circular-progress :size="60" :strokeWidth="5"/>
        </mu-content-block>
        <mu-content-block>
            <div v-if="activeTab === 'tab1'">
                <transition-group name="list" tag="div" class="row">
                    <movie-card v-for="subject in in_theaters" :key="subject.id" :movietitle="subject.title" :type="subject.genres.toString()" :average="subject.rating.average.toString()" :image="subject.images.large" :alt="subject.alt"></movie-card>
                </transition-group>
            </div>
            <div v-if="activeTab === 'tab2'">
                <transition-group name="list" tag="div" class="row">
                    <movie-card v-for="subject in coming_soon" :key="subject.id" :movietitle="subject.title" :type="subject.genres.toString()" :average="subject.rating.average.toString()" :image="subject.images.large" :alt="subject.alt"></movie-card>
                </transition-group>
            </div>
        </mu-content-block>
    </div>
</template>

<script>
import MovieCard from '../components/MovieCard'

export default {
    data() {
        return {
            activeTab: 'tab1',
            in_theaters: '',
            coming_soon: '',
            loading:true
        }
    },
    components: {
        MovieCard
    },
    created: function () {
        this.fetchData_in_theaters();
    },
    methods: {
        handleTabChange(val) {
            this.activeTab = val
        },
        fetchData_in_theaters() {
            var _this = this;
            this.loading = true ;
            this.$http.get('/api/movie/in_theaters')
                .then(function (response) {
                    console.log(response);
                    _this.loading = false ;
                    _this.in_theaters = response.data.subjects;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        fetchData_coming_soon() {
            var _this = this;
            this.loading = true ;
            this.$http.get('/api/movie/coming_soon')
                .then(function (response) {
                    console.log(response);
                    _this.loading = false ;
                    _this.coming_soon = response.data.subjects;
                })
                .catch(function (error) {
                    console.log(error);
                });
        }
    }
}
</script>

<style>
.list-item {
    display: inline-block;
    margin-right: 10px;
}

.list-enter-active,
.list-leave-active {
    transition: all 1s;
}

.list-enter,
.list-leave-to
{
    opacity: 0;
    transform: translateY(30px);
}
.movieTab{
    min-height: 600px;
}
.loadingBox{
    text-align: center;
    margin-top:20px;
    margin-bottom:20px;
}
</style>
