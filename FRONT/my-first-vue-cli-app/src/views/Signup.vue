<template>
    <div class="home">
        <img class="home__title" src="../assets/icon.png" alt="Logo de Groupomania">

            <form @submit.prevent="signup" class="home__display__form">
                <h1 class="home__display__form__title">S'inscrire</h1>

                <div class="home__display__form__input">
                    <label for="username" class="home__display__form__input__label">Pseudo</label>
                    <input type="text" v-model="username" id="username" name="username">
                </div>

                <div class="home__display__form__input">
                    <label for="mail" class="home__display__form__input__label">Email</label>
                    <input type="email" v-model="email" id="mail" name="mail">
                </div>

                <div class="home__display__form__input">
                    <label for="password" class="home__display__form__input__label">Mot de passe</label>
                    <input type="password" v-model="password" id="password" name="password">
                </div>

                <button class="home__display__form__button">Inscription</button>

                <p>Vous avez déjà un compte ? <router-link to="/" class="home__display__form__login">Se connecter</router-link></p>
            </form>
        </div>
    
</template>


<script>
    </script>


<style scoped lang="scss">
.home {
        &__title {
            @media (max-width: 930px) {
                max-width: 400px;
                width: 90%;
            }
        }
        &__display {
            margin-top: 2rem;
            display: flex;
            justify-content: space-around;
            @media (max-width: 930px) {
                display: flex;
                flex-direction: column-reverse;
            }
            
           
            &__form {
                display: flex;
                flex-direction: column;
                align-items: center;
                width: 40%;
                border: 3px solid #3f3d56;
                border-radius: 25px;
                margin-top: 2rem;
                margin-left: -2rem;
                padding: 1rem;
                @media (max-width: 930px) {
                    min-width: 250px;
                    margin: auto;
                }
                &__title {
                    margin-bottom: 3rem;
                    font-size: 27px;
                }
                &__input {
                    display: flex;
                    flex-direction: column;
                    margin-bottom: 2rem;
                    width: 70%;
                    &__label {
                        text-align: start;
                        font-weight: bolder;
                    }
                }
                &__button {
                    border: 3px solid #3f3d56;
                    border-radius: 25px;
                    color: #3f3d56;
                    font-size: 15px;
                    font-weight: bold;
                    padding: 0.9rem;
                    margin: 1rem;
                    outline-style: none;
                    &:hover, &:focus {
                        border: 3px solid #ff6363;
                        color: #ff6363;
                        cursor: pointer;
                    }
                }
                &__login {
                    font-weight: bold;
                    text-decoration: none;
                    color: #E60A0A;
                    // color: #ff6363;
                }
            }
        }
    }
</style>