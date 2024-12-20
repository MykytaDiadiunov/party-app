import { createApp } from 'vue'
import App from './App.vue'
import router from './router';

import { IonicVue } from '@ionic/vue';
import { createPinia } from 'pinia';

/* Core CSS required for Ionic components to work properly */
import '@ionic/vue/css/core.css';

/* Basic CSS for apps built with Ionic */
import '@ionic/vue/css/normalize.css';
import '@ionic/vue/css/structure.css';
import '@ionic/vue/css/typography.css';

/* Optional CSS utils that can be commented out */
import '@ionic/vue/css/padding.css';
import '@ionic/vue/css/float-elements.css';
import '@ionic/vue/css/text-alignment.css';
import '@ionic/vue/css/text-transformation.css';
import '@ionic/vue/css/flex-utils.css';
import '@ionic/vue/css/display.css';

/**
 * Ionic Dark Mode
 * -----------------------------------------------------
 * For more info, please see:
 * https://ionicframework.com/docs/theming/dark-mode
 */

/* @import '@ionic/vue/css/palettes/dark.always.css'; */
/* @import '@ionic/vue/css/palettes/dark.class.css'; */
// import '@ionic/vue/css/palettes/dark.system.css';

import i18n from '@/i18n'
import Toast, { POSITION } from "vue-toastification";
import 'vue-toastification/dist/index.css'

/* Theme variables */
import '@/theme/variables.css';
import '@/theme/styles.scss'

import MyInput from '@/components/base-components/base-inputs/AppInput.vue'
import MyButton from '@/components/base-components/base-inputs/AppButton.vue'

const app = createApp(App)
  .use(IonicVue)
  .use(router)
  .use(createPinia())
  .use(i18n as any)
  .use(Toast, {
    position: POSITION.TOP_RIGHT,
    timeout: 5000,
    closeOnClick: true,
    maxToasts: 3,
    containerClassName: ['toast-dialog-container'],
  });

app.component("my-input", MyInput)
app.component("my-button", MyButton)

router.isReady().then(() => {
  app.mount('#app');
});

