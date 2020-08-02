<template>
  <div class="w-100 d-flex justify-content-center">
    <button @click="showModal = true" class="btn btn-lg btn-outline-primary w-75">
      <i class="fa fa-plus"></i>
      Novo Gasto
      </button>
    <form @submit.prevent="submit">
      <div class="modal fade" :class="{show: showModal}" :style="{display: showModal ? 'block' : 'none'}">
        <div class="modal-dialog modal-lg" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLiveLabel">Adicionar um novo gasto</h5>
              <button type="button" class="close" @click="closeModal" aria-label="Close">
                  <span aria-hidden="true">×</span>
              </button>
            </div>
            <div class="modal-body">
              <div class="row">
                <div class="form-group col-8">
                  <label for="">Descrição</label>
                  <input type="text" class="form-control" required v-model="form.description">
                </div>
                <div class="form-group col-4">
                  <label for="">Valor (R$)</label>
                  <input type="text" class="form-control" required v-model="form.value">
                </div>
                <div class="form-group col-12 d-flex flex-column align-items-center">
                  <input ref="input" @change="handleFile($event)" type="file" class="d-none" accept="image/*">
                  <button @click="openFileDialog" type="button" class="btn w-50 btn-outline-secondary">Adicinar Comprovante</button>
                  <div class="mt-2" v-if="form.receipt">
                    {{ form.receipt.name }}
                    <button type="button" class="btn bagde bagde-light" @click="form.receipt = null">
                      <i class="fa fa-trash text-danger"></i>
                    </button>
                  </div>
                </div>
              </div>
            </div>
            <div class="modal-footer">
              <button type="button"  @click="closeModal" class="btn btn-secondary">Fechar</button>
              <button class="btn btn-primary">Incluir novo gasto</button>
            </div>
          </div>
        </div>
      </div>
    </form>
      <div class="modal-backdrop fade " :style="{display: showModal ? 'block' : 'none'}" :class="{show: showModal}"></div>
  </div>
</template>

<script>
export default {
  data: () => ({
    showModal: false,
    form: {
      receipt: '',
      description: undefined,
      value: undefined
    }
  }),
  computed: {
    fileName () {
      const { receipt } = this.form

      if (receipt) {
        const split = receipt.name.split('.')
        return `${split[0]}=${new Date().getTime()}.${split[1]}`
      } else {
        return ''
      }
    }
  },
  methods: {
    openFileDialog () {
      this.$refs.input.value = ''
      this.$refs.input.click()
    },
    handleFile ({ target }) {
      this.form.receipt = target.files[0]
    },
    async submit () {
      try {
        let url = ''

        this.$root.$emit('Spinner::show')
        const ref = this.$firebase.database().ref(window.uid)
        const id = ref.push().key

        if (this.form.receipt) {
          const snapshot = await this.$firebase.storage().ref(window.uid).child(this.fileName).put(this.form.receipt)
          url = await snapshot.ref.getDownloadURL()
        }

        const payload = {
          id,
          ...this.form,
          receipt: url,
          createdAt: new Date().getTime()
        }

        ref.child(id).set(payload, err => {
          if (err) {
            this.$root.$emit('Notification::show', {
              type: 'danger',
              message: 'Não foi possivel inserir o gasto, tente novamente.'
            })
          } else {
            this.$root.$emit('Notification::show', {
              type: 'success',
              message: 'Gasto inserido com sucesso.'
            })
            this.closeModal()
          }
        })
      } catch (err) {
        this.$root.$emit('Notification::show', {
          type: 'danger',
          message: 'Não foi possivel inserir o gasto, tente novamente.'
        })
      } finally {
        this.$root.$emit('Spinner::hide')
      }
    },
    closeModal () {
      this.showModal = false
    }
  }
}
</script>

<style scoped>
  .modal {
    color: var(--darker);
  }

</style>
