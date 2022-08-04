<template>
  <div class="background">
    <div class="wave"></div>
    <div class="logo">
      <img src="/src/assets/images/Logo.svg" alt="name" />
    </div>

    <div class="container-food">
      <div class="fried-pastry"></div>
      <div class="unfocused-fried-pastry"></div>

      <div class="form-food">
        <div class="card">
          <div class="card-header bg-yellow">
            <div class="card-title text-red title-form-flag">
              <div class="title-form">
                Monte aqui seu cardápio. O que está esperando ?
              </div>
              <div class="title-flag">
                <div>Comida</div>
                <toggle v-model="isDrink"></toggle>
                <div>Bebida</div>
              </div>
            </div>
          </div>
          <div class="card-body">
            <div class="grid-container">
              <div class="grid-item">
                <input
                  class="input-field"
                  type="text"
                  placeholder="Titulo do pedido"
                  v-model="form.name"
                />
                <div class="error-field" v-if="erroForm.name">
                  {{ erroForm.name }}
                </div>
              </div>
              <div class="grid-item">
                <input
                  class="input-field"
                  type="text"
                  placeholder="Sabor"
                  v-model="form.flavor"
                />
                <div class="error-field" v-if="erroForm.flavor">
                  {{ erroForm.flavor }}
                </div>
              </div>
              <div class="grid-item">
                <input class="input-field" v-model="form.value" v-money="money" />
                <div class="error-field" v-if="erroForm.value">
                  {{ erroForm.value }}
                </div>
              </div>
            </div>
            <div class="grid-container">
              <div class="grid-item">
                <textarea
                  class="input-field"
                  placeholder="Descrição"
                  rows="4"
                  v-model="form.description"
                ></textarea>
                <div class="error-field" v-if="erroForm.description">
                  {{ erroForm.description }}
                </div>
              </div>
            </div>
            <div class="grid-container">
              <div class="grid-item">
                <drop-zone ref="uploadImages" @drop="handleImages"></drop-zone>
              </div>
            </div>
            <div class="grid-container">
              <div class="grid-item button-group">
                <button class="button-clear" @click="clearForm">Limpar</button>
                <button class="button-save" @click="save">Cadastrar</button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="divider">
        <div class="divider-line"></div>
        <div class="divider-text">Veja como será apresentado ao cliente</div>
        <div class="divider-line"></div>
      </div>

      <div v-if="isDrink" class="list-products">
        <product
          :product="product"
          v-for="(product, index) in drinks"
          v-bind:key="'drink_' + index"
        />
      </div>
      <div v-else class="list-products">
        <product
          :product="product"
          v-for="(product, index) in foods"
          v-bind:key="'food_' + index"
        />
      </div>
    </div>
  </div>
</template>

<script>
import Toggle from "@vueform/toggle";
import product from "./components/Product.vue";
import { VMoney } from "v-money";
import DropZone from "./components/DropZone.vue";

export default {
  directives: { money: VMoney },
  components: {
    Toggle,
    product,
    DropZone,
  },
  data() {
    return {
      isDrink: true,
      drinks: [
        {
          name: "Suco de goiaba",
          flavor: "Goiaba",
          img: "/src/assets/images/suco-img.png",
          description:
            "Um mero suco de goiaba. Tem sachet de açúcar no balcão...",
          value: "R$10,00",
        },
        {
          name: "Suco de laranja",
          flavor: "Laranja",
          img: "/src/assets/images/suco-img.png",
          description:
            "Um mero suco de laranja. Tem sachet de açúcar no balcão...",
          value: "R$10,00",
        },
      ],
      foods: [
        {
          name: "Pizza",
          flavor: "Calabresa",
          img: "/src/assets/images/pasteis-img.png",
          description:
            "Uma pizza de calabresa. Tem sachet de açúcar no balcão...",
          value: "R$10,00",
        },
        {
          name: "Pizza",
          flavor: "Calabresa",
          img: "/src/assets/images/pasteis-img.png",
          description:
            "Uma pizza de calabresa. Tem sachet de açúcar no balcão...",
          value: "R$10,00",
        },
      ],
      form: {
        name: "",
        flavor: "",
        img: "",
        description: "",
        value: "",
      },
      erroForm: {
        name: "",
        flavor: "",
        img: "",
        description: "",
        value: "",
      },
      money: {
        decimal: ",",
        thousands: ".",
        prefix: "R$ ",
        precision: 2,
        masked: false,
      },
    };
  },
  methods: {
    handleImages(image) {
      this.form.img = image.value;
    },
    validate() {
      let erro = false;
      this.erroForm = {
        name: "",
        flavor: "",
        img: "",
        description: "",
        value: "",
      };
      if (this.form.name.length < 3 || this.form.name.length > 60) {
        this.erroForm.name = "O nome deve ter entre 3 e 60 caracteres";
        erro = true;
      }
      if (typeof this.form.name !== "string") {
        this.erroForm.name = "O nome deve ser uma texto";
        erro = true;
      }
      if (this.form.name == "") {
        this.erroForm.name = "O nome é obrigatório";
        erro = true;
      }
      if (this.form.flavor.length < 3 || this.form.flavor.length > 60) {
        this.erroForm.flavor = "O sabor deve ter entre 3 e 60 caracteres";
        erro = true;
      }
      if (typeof this.form.flavor !== "string") {
        this.erroForm.flavor = "O sabor deve ser uma texto";
        erro = true;
      }
      if (this.form.flavor == "") {
        this.erroForm.flavor = "O sabor é obrigatório";
        erro = true;
      }
      if (this.form.value == "") {
        this.erroForm.value = "O valor é obrigatório";
        erro = true;
      }
      if (typeof this.form.description !== "string") {
        this.erroForm.description = "A descrição deve ser uma texto";
        erro = true;
      }
      return erro;
    },
    save() {
      if (this.validate()) {
        return;
      }

      if (this.isDrink) {
        this.drinks.unshift(this.form);
      } else {
        this.foods.unshift(this.form);
      }
      this.form = {
        name: "",
        flavor: "",
        img: "",
        description: "",
        value: "",
      };

      this.$refs.uploadImages.removeImage();
    },
    clearForm() {
      this.form = {
        name: "",
        flavor: "",
        img: "",
        description: "",
        value: "",
      };

      this.erroForm = {
        name: "",
        flavor: "",
        img: "",
        description: "",
        value: "",
      };

      this.$refs.uploadImages.removeImage();
    },
  },
};
</script>

<style src="@vueform/toggle/themes/default.css"></style>

<style scoped>
.fried-pastry {
  position: absolute;
  background: url("/src/assets/images/pasteis-img@2x.png") no-repeat center
    center;
  background-size: cover;
  width: 250px;
  height: 250px;
  top: -13%;
  right: 20%;
}

.unfocused-fried-pastry {
  position: absolute;
  background: url("/src/assets/images/pastel-paralax@2x.png") no-repeat center center;
  background-size: cover;
  width: 450px;
  height: 450px;
  top: -250px;
  left: 165px;
  z-index: 1;
}

.wave {
  position: absolute;
  top: -220px;
  width: 100%;
  height: 600px;
  background-image: url(/src/assets/images/wave.svg);
  background-repeat: no-repeat;
  background-size: cover;
  background-position: center;
}

.error-field {
  color: #E43636;
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

.list-products {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.divider-text {
  font-size: 1.2rem;
  font-weight: bold;
  color: #a03400;
  text-align: center;
  margin-top: 1rem;
  margin-bottom: 1rem;
  width: 100%;
  padding-left: 1rem;
  padding-right: 1rem;
}

.divider-line {
  width: 100%;
  height: 1px;
  background-color: #a03400;
}

.divider {
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
  margin-bottom: 20px;
  overflow: visible !important;
}

</style>
