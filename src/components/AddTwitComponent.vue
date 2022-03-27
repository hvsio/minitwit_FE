<template>
    <div class="form">
        <div class="form-wrapper">
            <div class="twit-input">
                <p>Create new twit:</p>
                <textarea name="twit-text" placeholder="Twit some more 🦜" id="twit-text"/>
            </div>
            <div class="submit-btn">
                <input type="submit" value="Submit" @click="sendRequest()">
            </div>
        </div>
    </div>
</template>
<script>
import { useTwits, useUsers } from "@/compositionStore/index"

export default {
    name: "AddTwitComponent",
    props: {},
    setup() {
        const { addTwit } = useTwits()
        const { getLoggedInUser } = useUsers()

        const submitTwit = (twitData, loggedInUser) => addTwit(twitData, loggedInUser)

        return { 
            loggedUser: getLoggedInUser(),
            submitTwit
        }
    },
    methods: {
        async sendRequest() {
            const text = document.getElementById("twit-text").value;
            const twitData = {
                "AuthorId": this.loggedUser.userId,
                "Text": text
            };
            await this.submitTwit(twitData, this.loggedUser);
            document.getElementById("twit-text").value = ""
        }
    }
}
</script>
<style lang="scss">
@import "../genericStyles.scss"; 

.form {
    width: 70%;
    height: fit-content;
    margin: auto 15%;

    .form-wrapper {
        > * {
            padding: 10px 0;
        }

        textarea { 
            @include roundedBorders;
            max-height: 5rem;
            max-width: 80%;
        }
    }

    .submit-btn {
        width: 75%;
    }

}
</style>