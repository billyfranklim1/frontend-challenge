<template>
  <div>
    <div v-bind="getRootProps()" class="drag-drop drop-zone">
      <div v-if="imgPreview">
        <img :src="imgPreview" class="img-preview" alt="preview" />
      </div>
      <div v-else>
        <input v-bind="getInputProps()" />
        <img
          src="/src/assets/images/upload-file.svg"
          class="img-upload"
          alt="upload"
        />
        <p v-if="isDragActive">Solte os arquivos aqui ...</p>
        <p v-else>
          Jogue aqui o arquivo de imagem do seu pastel ou clique para localizar
          a pasta.
        </p>
      </div>
      <!-- error -->
      <div v-if="erroForm" class="error-field">{{ erroForm }}</div>
    </div>
  </div>
</template>

<script>
import { useDropzone } from "vue3-dropzone";
import { ref } from "vue";

export default {
  name: "UseDropzoneDemo",
  emits: ["drop"],
  setup(props, { emit }) {
    const imgPreview = ref();
    const erroForm = ref();

    function drop() {
      emit("drop", imgPreview);
    }

    function onDrop(acceptFiles) {
      erroForm.value = "";

      let typeAccept = ["image/png", "image/jpg", "image/jpeg"];

      console.log(acceptFiles[0].type);

      if (typeAccept.includes(acceptFiles[0].type)) {
        imgPreview.value = URL.createObjectURL(acceptFiles[0]);
        drop();
      } else {
        erroForm.value = "Somente arquivos de imagem png e jpg";
      }
    }

    function removeImage() {
      imgPreview.value = null;
      drop();
      erroForm.value = "";
    }

    const { getRootProps, getInputProps, noClick, ...rest } = useDropzone({
      onDrop,
    });

    return {
      getRootProps,
      getInputProps,
      ...rest,
      imgPreview,
      removeImage,
      drop,
      erroForm,
    };
  },
};
</script>

<style>
.error-field {
  color: #a03400;
  font-size: 12px;
  margin-top: 5px;
}

.remove-img {
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: red;
  border-radius: 50%;
  border: 1px solid red;
  box-shadow: 0 0 0 1px rgba(0, 0, 0, 0.1);
  color: #fff;
}

.drop-zone {
  text-align: center;
  height: auto;
  align-items: center !important;
  padding: 10px;
  color: #a03400;
}

.img-upload {
  width: 100px;
  /* height: 100px; */
}

.img-preview {
  max-width: 200px;
  width: 90%;
  object-fit: cover;
}
</style>
