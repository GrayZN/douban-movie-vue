<template>
    <div class="TopBar">
        <mu-appbar title="Movie">
            <mu-icon-button icon="menu" slot="left" @click="toggle(true)" />
            <mu-icon-button icon="search" slot="right" to="/Search"/>
        </mu-appbar>
        <mu-drawer :open="open" :docked="docked" @close="toggle()">
            <mu-appbar title="菜单" >
                <mu-icon-button icon="close" slot="right" @click="toggle()" />
            </mu-appbar>
            <mu-list  @itemClick="docked ? '' : toggle()">
                <mu-list-item title="主页" to="/">
                    <mu-icon slot="right" value="home"/>
                </mu-list-item>
                <mu-list-item title="榜单" to="/list">
                    <mu-icon slot="right" value="explore"/>
                </mu-list-item>
            </mu-list>
            <mu-divider />
            <mu-list  @itemClick="docked ? '' : toggle()">
                <mu-list-item title="Vue" to="/hello">
                    <mu-icon slot="right" value="public"/>
                </mu-list-item>
            </mu-list>
        </mu-drawer>
    </div>
</template>

<script>
export default {
    name: "TopBar",
    data() {
        return {
            open: false,
            docked: true
        }
    },
    methods: {
        toggle(flag) {
            this.open = !this.open
            this.docked = !flag
        }
    }
}
</script>
