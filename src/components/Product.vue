<template>
  <div class="card transition-card">
    <div class="card-header bg-red">
      <div class="card-title text-yellow title-with-price">
        <div class="title-product">"{{ product.name }}"</div>
        <div class="price">{{ product.value }}</div>
      </div>
    </div>
    <div class="media">
      <img :src="product.img || imageDefault" alt="product" :class="!product.img ? 'img-default ' : ''" />
      <div class="media-body">
        <div class="text-red product-text">
          <span class="product-label">Sabor: </span> {{ product.flavor }}
        </div>
        <div class="text-red product-text">
          <span class="product-label">Descrição: </span>{{ product.description }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "product-card",
  props: {
    product: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      imageDefault: "/src/assets/images/default.png",
    };
  },
};
</script>

<style>
.transition-card {
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

.media img {
  padding: 30px;
  object-fit: cover;
}

.title-product {
  margin-left: 70px;
  font-weight: bold;
  font-style: italic;
  font-size: 30px;
}

.product-img {
  position: relative;
  top: -90px;
  right: 110px;
  font-size: 26px;
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
  font-size: 24px;
}

.product-label {
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
