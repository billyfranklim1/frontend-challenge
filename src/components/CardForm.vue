<script>
import Toggle from '@vueform/toggle'
import { VMoney } from 'v-money';
import {DropZone} from 'vue3-dropzone';

export default {
  directives: { money: VMoney },
  components: {
    Toggle,
    DropZone
  },
  data() {
    return {
      value: true,
      drinks: [
        {
          "name": "Suco de goiaba",
          "flavor": "Goiaba",
          "img": "/src/assets/images/suco-img.png",
          "description": "Um mero suco de goiaba. Tem sachet de açúcar no balcão...",
          "value": "R$10,00"
        },
        {
          "name": "Suco de laranja",
          "flavor": "Laranja",
          "img": "/src/assets/images/suco-img.png",
          "description": "Um mero suco de laranja. Tem sachet de açúcar no balcão...",
          "value": "R$10,00"
        }
      ],
      foods: [
        {
          "name": "Pizza",
          "flavor": "Calabresa",
          "img": "/src/assets/images/pasteis-img.png",
          "description": "Uma pizza de calabresa. Tem sachet de açúcar no balcão...",
          "value": "R$10,00"
        },
        {
          "name": "Pizza",
          "flavor": "Calabresa",
          "img": "/src/assets/images/pasteis-img.png",
          "description": "Uma pizza de calabresa. Tem sachet de açúcar no balcão...",
          "value": "R$10,00"
        }
      ],
      form: {
        name: '',
        flavor: '',
        img: '',
        description: '',
        value: ''
      },
      erroForm: {
        name: '',
        flavor: '',
        img: '',
        description: '',
        value: ''
      },
      money: {
        decimal: ',',
        thousands: '.',
        prefix: 'R$ ',
        precision: 2,
        masked: false
      }
    }
  },
  methods: {
    handleImages(image) {
      this.form.img = image.value;
    },
    validate() {

      let erro = false;
      this.erroForm = {
        name: '',
        flavor: '',
        img: '',
        description: '',
        value: ''
      };
      // name | required | min:3 | max:60 | string

      if (this.form.name.length < 3 || this.form.name.length > 60) {
        this.erroForm.name = 'O nome deve ter entre 3 e 60 caracteres';
        erro = true;
      }
      if (typeof this.form.name !== 'string') {
        this.erroForm.name = 'O nome deve ser uma texto';
        erro = true;
      }
      if (this.form.name == '') {
        this.erroForm.name = 'O nome é obrigatório';
        erro = true;
      }
      // flavor | required | min:3 | max:60 | string  

      if (this.form.flavor.length < 3 || this.form.flavor.length > 60) {
        this.erroForm.flavor = 'O sabor deve ter entre 3 e 60 caracteres';
        erro = true;
      }
      if (typeof this.form.flavor !== 'string') {
        this.erroForm.flavor = 'O sabor deve ser uma texto';
        erro = true;
      }
      if (this.form.flavor == '') {
        this.erroForm.flavor = 'O sabor é obrigatório';
        erro = true;
      }

      if (this.form.value == '') {
        this.erroForm.value = 'O valor é obrigatório';
        erro = true;
      }

      if (typeof this.form.description !== 'string') {
        this.erroForm.description = 'A descrição deve ser uma texto';
        erro = true;
      }


      return erro;



    },
    save() {


      if (this.validate()) {
        return;
      }


      if (this.value) {
        this.drinks.unshift(this.form);
      } else {
        this.foods.unshift(this.form);
      }
      this.form = {
        name: '',
        flavor: '',
        img: '',
        description: '',
        value: ''
      };

      this.$refs.uploadImages.removeImage();

    },
    clearForm() {
      this.form = {
        name: '',
        flavor: '',
        img: '',
        description: '',
        value: ''
      };

      this.erroForm = {
        name: '',
        flavor: '',
        img: '',
        description: '',
        value: ''
      };



      this.$refs.uploadImages.removeImage();



    }

  }
}

</script>

<template>
       <div class="card">
        <div class="card-header bg-yellow">
          <div class="card-title text-red title-form-flag">
            <div class="title-form"> Monte aqui seu cardápio. O que está esperando ?</div>
            <div class="title-flag">
              <div>Comida</div>
              <toggle v-model="value"></toggle>
              <div>Bebida</div>
            </div>

          </div>
        </div>
        <div class="card-body">
          <div class="grid-container">
            <div class="grid-item">
              <input class="input-field" type="text" placeholder="Titulo" v-model="form.name">
              <div class="error-field" v-if="erroForm.name">{{ erroForm.name }}</div>
            </div>
            <div class="grid-item">
              <input class="input-field" type="text" placeholder="Sabor" v-model="form.flavor">
              <div class="error-field" v-if="erroForm.flavor">{{ erroForm.flavor }}</div>
            </div>
            <div class="grid-item">
              <input class="input-field" v-model="form.value" v-money="money">
              <div class="error-field" v-if="erroForm.value">{{ erroForm.value }}</div>
            </div>
          </div>
          <div class="grid-container">
            <div class="grid-item">
              <textarea class="input-field" placeholder="Descrição" rows="4" v-model="form.description"></textarea>
              <div class="error-field" v-if="erroForm.description">{{ erroForm.description }}</div>
            </div>
          </div>
          <div class="grid-container">
            <div class="grid-item ">
              <drop-zone ref="uploadImages" @drop="handleImages"></drop-zone>
            </div>
          </div>
          <div class="grid-container">
            <div class="grid-item button-group">
              <button class="button-clear" @click="clearForm">Limpar</button>
              <button class="button-save" @click="save">Salvar</button>
            </div>
          </div>

        </div>
      </div>
</template>
<style src="@vueform/toggle/themes/default.css">
</style>
<style scoped>


.error-field {
  color: #A03400;
  font-size: 12px;
  margin-top: -10px;
}

.title-form {
  font-weight: bold;
  font-style: italic;
}

.title-flag {
  display: flex;
  justify-content: space-around;
  align-items: center;

}

.title-flag div {
  font-style: italic;
  font-size: 1.2rem;
  margin: 4px;
}

.title-form-flag {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}

/* transition down to up */


.transition-card {
  /* transition: all .5s ease-in-out slideUp; */
  /* transform: translateY(0); */
  animation: 1s ease-out 0s 1 slideUp;

}


@keyframes slideUp {
  0% {
    transform: translateY(100%);
  }

  100% {
    transform: translateY(0%);
  }
}

.media img{
    padding: 30px;
     object-fit: cover
}

.title-product {
  margin-left: 70px;
  font-weight: bold;
  font-style: italic;
}

.product-img {
  position: relative;
  top: -90px;
  right: 110px;
}

.product-img img {
  width: 180px !important;
  height: 180px !important;
}


.img-default {
  padding: 30px;
  border-radius: 20% !important;
}

.product-text {
  font-weight: bold;
}

.title-with-price {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-left: 10px;
  padding-right: 10px;
}

.price {
  margin-left: 10px;
  font-weight: bold;
  font-style: italic;
  color: #fff;
}
</style>
