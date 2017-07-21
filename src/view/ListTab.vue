<template>
    <div class="listTab">
        <mu-tabs :value="activeTab" @change="handleTabChange">
            <mu-tab value="tab1" title="北美榜" />
            <mu-tab value="tab2" title="历史榜" @click.once="fetchData_top(0)" />
        </mu-tabs>
        <mu-content-block class="loadingBox" v-show="loading">
            <mu-circular-progress :size="60" :strokeWidth="5" />
        </mu-content-block>
        <mu-content-block>
            <div v-if="activeTab === 'tab1'">
                <transition-group name="list" tag="div" class="row">
                    <movie-card v-for="subject in us_box" :key="subject.subject.id" :movietitle="subject.subject.title" :type="subject.subject.genres.toString()" :average="subject.subject.rating.average.toString()" :image="subject.subject.images.large" :alt="subject.subject.alt"></movie-card>
                </transition-group>
            </div>
            <div v-if="activeTab === 'tab2'">
                <transition-group name="list" tag="div" class="row">
                    <movie-card v-for="subject in top" :key="subject.id" :movietitle="subject.title" :type="subject.genres.toString()" :average="subject.rating.average.toString()" :image="subject.images.large" :alt="subject.alt"></movie-card>
                </transition-group>
            </div>
        </mu-content-block>
        <mu-pagination :total="total" :current="current" @pageChange="handleClick" v-if="activeTab === 'tab2'" v-show="!loading" style="margin-top:35px;">
        </mu-pagination>
    </div>
</template>

<script>
import MovieCard from '../components/MovieCard'

export default {
    data() {
        return {
            activeTab: 'tab1',
            us_box: '',
            top: '',
            loading: true,
            total: 100,
            current: 1
        }
    },
    components: {
        MovieCard
    },
    created: function () {
        this.fetchData_us_box();
    },
    methods: {
        handleTabChange(val) {
            this.activeTab = val
        },
        fetchData_us_box() {
            var _this = this;
            this.loading = true;
            this.$http.get('/api/movie/us_box')
                .then(function (response) {
                    console.log(response);
                    _this.loading = false;
                    _this.us_box = response.data.subjects;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        fetchData_top(st) {
            var _this = this;
            this.loading = true;
            this.$http.get('/api/movie/top250', {
                params: {
                    start: st,
                    count: 24
                }
            })
                .then(function (response) {
                    console.log(response);
                    _this.loading = false;
                    _this.top = response.data.subjects;
                })
                .catch(function (error) {
                    console.log(error);
                });
        },
        handleClick(newIndex) {
            this.top = '';
            this.fetchData_top(newIndex * 24);
        }
    }
}
</script>

<style>
.listTab {
    min-height: 500px;
}

.loadingBox {
    text-align: center;
    margin-top: 20px;
    margin-bottom: 20px;
}
</style>
