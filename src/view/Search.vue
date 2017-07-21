<template>
    <div class="searchView">
        <mu-content-block>
            <mu-paper :zDepth="1" style="padding:10px;padding-bottom:30px;margin-bottom:30px;">
                <mu-text-field label="关键词" labelFloat fullWidth v-model="searchIndex" />
                <mu-float-button icon="search" primary style="float:right" @click="fetchData_search()" />
            </mu-paper>
        </mu-content-block>
        <mu-content-block class="loadingBox" v-show="loading">
            <mu-circular-progress :size="60" :strokeWidth="5"/>
        </mu-content-block>
        <mu-content-block>
            <transition-group name="list" tag="div" class="row">
                <movie-card v-for="subject in subjects" :key="subject.id" :movietitle="subject.title" :type="subject.genres.toString()" :average="subject.rating.average.toString()" :image="subject.images.large" :alt="subject.alt"></movie-card>
            </transition-group>
        </mu-content-block>
    </div>
</template>

<script>
import MovieCard from '../components/MovieCard'
export default {
    data() {
        return {
            searchIndex: '',
            subjects: '',
            loading: false
        }
    },
    components:{
        MovieCard
    },
    methods: {
        fetchData_search() {
            var _this = this;
            this.loading = true;
            this.$http.get('/api/movie/search?q=' + _this.searchIndex)
                .then(function (response) {
                    console.log(response);
                    _this.loading = false;
                    _this.subjects = response.data.subjects;
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
.searchView {
    min-height: 450px;
}
.loadingBox{
    text-align: center;
    margin-top:20px;
    margin-bottom:20px;
}
</style>
