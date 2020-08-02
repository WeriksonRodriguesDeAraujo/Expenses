<template>
  <div class="home">
   <div class="row">
     <div class="col-6 home-box">
       <small>Você gastou</small>
       <div class="money" v-money-format="totals.totalSpent"/>
       <small>em 89 compras</small>
     </div>
     <div class="col-6 home-box">
       <small>A média dos gastos é de</small>
       <div class="money" v-money-format="totals.average"/>
     </div>
     <div class="col-6 home-box">
       <small>A maior gasto foi de</small>
       <div class="money">{{ totals.biggest.value }}</div>
       <small v-date-format="totals.biggest.createdAt"/>
     </div>
     <div class="col-6 home-box">
       <small>A menor gasto foi de</small>
       <div class="money">{{ totals.lowest.value }}</div>
       <small v-date-format="totals.lowest.createdAt"/>
     </div>
   </div>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data: () => ({
    expenses: []
  }),
  created () {
    this.getData()
  },
  computed: {
    totals () {
      const exp = this.expenses
      const values = {
        totalSpent: 0,
        average: 0,
        biggest: {},
        lowest: {}
      }

      if (exp.length) {
        values.totalSpent = exp.map(e => parseFloat(e.value))
          .reduce((acc, cur) => acc + cur, 0)

        values.average = values.totalSpent / exp.length

        values.biggest = exp.sort((a, b) => parseFloat(b.value) - parseFloat(a.value))[0]
        values.lowest = exp.sort((a, b) => parseFloat(a.value) - parseFloat(b.value))[0]
      }

      return values
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', data => {
        const values = data.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    }
  }
}
</script>

<style lang="scss" scoped>
  .home {
    padding: 15px;
    .home-box {
      width: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 30pt;
      flex-direction: column;
      small {
        font-size: 1.3rem;
      }
      .money {
        color: var(--featured);
      }
      height: calc(50vh - 15px);
      border: 1px solid var(--dark-medium);
      &:nth-child(2), &:nth-child(4) {
        border-left: none;
      }
      &:nth-child(3), &:nth-child(4) {
        border-top: none;
      }
    }
  }
</style>
