<template>
    <div class="home">
        <img class="home__title" src="../assets/icon-above-font.png" alt="Logo de Groupomania">
        
        <div class="home__display">
            <form @submit.prevent="login" class="home__display__form">
                <h1 class="home__display__form__title">Se connecter</h1>

                <div class="home__display__form__input">
                    <label for="mail" class="home__display__form__input__label">Email</label>
                    <input type="email" v-model="email" id="mail" name="mail">
                </div>

                <div class="home__display__form__input">
                    <label for="password" class="home__display__form__input__label">Mot de passe</label>
                    <input type="password" v-model="password" id="password" name="password">
                </div>

                <button class="home__display__form__button">Connexion</button>

                <p>Vous n'avez pas encore de compte ? <router-link to="/signup" class="home__display__form__signup">S'inscrire</router-link></p>
            </form>
        </div> 
    </div>
</template>


<script>
    import axios from 'axios'
    import { Notyf } from 'notyf'
    export default {
        name: 'Home',
        data() {
            return {
                email: '',
                password: '',
            }
        },
        created() {
            this.notyf = new Notyf({
                duration: 2000,
                position: {
                    x: 'center',
                    y: 'bottom'
                }
            });
        }, 
        methods: {
            // Permet de se connecter et de recharger la page sans que l'utilisateur soit déconnecté
            login() {
                axios.post('http://localhost:3000/api/user/login', {
                    email: this.email,
                    password: this.password,
                })
                .then(response => {
                    localStorage.setItem('token', response.data.token);
                    localStorage.setItem('userId', response.data.userId);
                    localStorage.setItem('username', response.data.username);
                    localStorage.setItem('isAdmin', response.data.isAdmin);
                    localStorage.setItem('imageProfile', response.data.imageProfile);
                    this.$router.push('post');
                })
                .catch(error => {
                    const msgerror = error.response.data
                    this.notyf.error(msgerror.error)
                })
            }
        }
    }
</script>


<style scoped lang="scss">
    .home {
        &__title {
          width:50%;
            @media (max-width: 930px) {
                max-width: 400px;
                width: 50%;
            }
        }
        &__display {
            margin-top: 3rem;
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
                max-width: 840px;
                width: 40%;
                border: 3px solid #3f3d56;
                border-radius: 25px;
                margin-top: 2rem;
              
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
                &__signup {
                    font-weight: bold;
                    text-decoration: none;
                    color: #E60A0A;
                    // color: #ff6363;
                }
            }
        }
    }
</style>
