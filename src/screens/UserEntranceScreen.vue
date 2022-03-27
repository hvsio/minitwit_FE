<template>
    <div class="user-entrance-page">
        <user-form/>
        <user-form :ifRegistrationForm="true"/>
    </div>
</template>
<script>
import UserForm from '@/components/UserForm.vue';

export default {
    name: "UserEntranceScreen",
    props: {},
    components: {
        UserForm
    },
    setup() {
        return {};
    }
}
</script>
<style lang="scss">
.user-entrance-page {
    display: flex;
    flex-direction: row;
    justify-content: space-evenly;
    align-items: center;
    height: 100%;
    width: 100%;

    [class$="-form"] {
    }
}
</style>