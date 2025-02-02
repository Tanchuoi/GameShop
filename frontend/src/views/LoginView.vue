<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '@/stores/userStore';
import { useToastService } from '@/services/toast.service';

const userStore = useUserStore();
const toastService = useToastService();
const loginUsername = ref('');
const loginPassword = ref('');
const signupName = ref('');
const signupEmail = ref('');
const signupPassword = ref('');
const router = useRouter();

async function handleLogin() {
  try {
    const userData = {
      username: loginUsername.value,
      password: loginPassword.value
    };
    await userStore.login(userData);
    if (userStore.isAuthenticated) {
      if (userStore.isAdmin) {
        router.push('/admin');
      } else {
        router.push('/');
      }
    }
    toastService.success('Logged in successfully');
  } catch (error) {
    console.error('Error logging in:', error);
    toastService.error('Invalid username or password');
  }
}

async function handleRegister() {
  try {
    const userData = {
      username: signupName.value,
      email: signupEmail.value,
      password: signupPassword.value
    };
    await userStore.register(userData);
    toastService.success('Registered successfully');
  } catch (error) {
    console.error('Error registering:', error);
    toastService.error('Error registering');
  }
}
</script>
<template>
  <body>
    <routerLink to="/"><i class="p-4 text-3xl fa-solid fa-arrow-left"></i></routerLink>
    <div class="wrapper">
      <div class="card-switch">
        <label class="switch">
          <input
            type="checkbox"
            class="toggle"
          />
          <span class="slider"></span>
          <span class="card-side"></span>
          <div class="flip-card__inner">
            <div class="flip-card__front">
              <div class="title">Log in</div>
              <form
                class="flip-card__form"
                @submit.prevent="handleLogin"
              >
                <input
                  class="flip-card__input"
                  v-model="loginUsername"
                  placeholder="Username"
                  type="username"
                />
                <input
                  class="flip-card__input"
                  v-model="loginPassword"
                  placeholder="Password"
                  type="password"
                />
                <button class="flip-card__btn">Log in</button>
              </form>
            </div>
            <div class="flip-card__back">
              <div class="title">Sign up</div>
              <form
                class="flip-card__form"
                @submit.prevent="handleRegister"
              >
                <input
                  class="flip-card__input"
                  v-model="signupName"
                  placeholder="username"
                  type="username"
                />
                <input
                  class="flip-card__input"
                  v-model="signupEmail"
                  placeholder="Email"
                  type="email"
                />
                <input
                  class="flip-card__input"
                  v-model="signupPassword"
                  placeholder="Password"
                  type="password"
                />
                <button class="flip-card__btn">Sign Up</button>
              </form>
            </div>
          </div>
        </label>
      </div>
    </div>
  </body>
</template>

<style scoped>
body {
  background-color: antiquewhite;
}
a {
  text-decoration: none;
  color: black;
}

.wrapper {
  --input-focus: antiquewhite;
  --font-color: #323232;
  --font-color-sub: #666;
  --bg-color: #fff;
  --bg-color-alt: #666;
  --main-color: #323232;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}
/* switch card */
.switch {
  transform: translateY(-200px);
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 30px;
  width: 50px;
  height: 20px;
}

.card-side::before {
  position: absolute;
  content: 'Log in';
  left: -70px;
  top: 0;
  width: 100px;
  text-decoration: underline;
  color: var(--font-color);
  font-weight: 600;
}

.card-side::after {
  position: absolute;
  content: 'Sign up';
  left: 70px;
  top: 0;
  width: 100px;
  text-decoration: none;
  color: var(--font-color);
  font-weight: 600;
}

.toggle {
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  box-sizing: border-box;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: var(--bg-colorcolor);
  transition: 0.3s;
}

.slider:before {
  box-sizing: border-box;
  position: absolute;
  content: '';
  height: 20px;
  width: 20px;
  border: 2px solid var(--main-color);
  border-radius: 5px;
  left: -2px;
  bottom: 2px;
  background-color: var(--bg-color);
  box-shadow: 0 3px 0 var(--main-color);
  transition: 0.3s;
}

.toggle:checked + .slider {
  background-color: var(--input-focus);
}

.toggle:checked + .slider:before {
  transform: translateX(30px);
}

.toggle:checked ~ .card-side:before {
  text-decoration: none;
}

.toggle:checked ~ .card-side:after {
  text-decoration: underline;
}

/* card */

.flip-card__inner {
  width: 300px;
  height: 350px;
  position: relative;
  background-color: transparent;
  perspective: 1000px;
  /* width: 100%;
      height: 100%; */
  text-align: center;
  transition: transform 0.8s;
  transform-style: preserve-3d;
}

.toggle:checked ~ .flip-card__inner {
  transform: rotateY(180deg);
}

.toggle:checked ~ .flip-card__front {
  box-shadow: none;
}

.flip-card__front,
.flip-card__back {
  padding: 20px;
  position: absolute;
  display: flex;
  flex-direction: column;
  justify-content: center;
  -webkit-backface-visibility: hidden;
  backface-visibility: hidden;
  background: lightgrey;
  gap: 20px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  box-shadow: 4px 4px var(--main-color);
}

.flip-card__back {
  width: 100%;
  transform: rotateY(180deg);
}

.flip-card__form {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 20px;
}

.title {
  margin: 20px 0 20px 0;
  font-size: 25px;
  font-weight: 900;
  text-align: center;
  color: var(--main-color);
}

.flip-card__input {
  width: 250px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 15px;
  font-weight: 600;
  color: var(--font-color);
  padding: 5px 10px;
  outline: none;
}

.flip-card__input::placeholder {
  color: var(--font-color-sub);
  opacity: 0.8;
}

.flip-card__input:focus {
  border: 2px solid var(--input-focus);
}

.flip-card__btn:active,
.button-confirm:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.flip-card__btn {
  margin: 20px 0 20px 0;
  width: 120px;
  height: 40px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-size: 17px;
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
}
</style>
