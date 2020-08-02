<template>
  <div>
    <div class="months-navigation">
      <div class="month-link"
        :class="{ active: month.month == activeMonth.month }"
        @click="setActiveMonth(month)"
        v-for="(month, i) in groupedMonths" :key="i"
      >
        <div class="month-label">{{ month.month }}</div>
        <div class="value-label" v-money-format="month.total"/>
      </div>
    </div>
    <div class="container-group">
      <div class="container">
        <div v-if="activeMonth.data && !activeMonth.data.length">
          Você não cadastrou nenhum nesse mês
        </div>
        <template v-else>
          <expense-list-item :data="item" v-for="(item, i) in activeMonth.data" :key="i"/>
        </template>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'
import groupby from 'lodash.groupby'
import ExpenseListItem from './ExpenseListItem'

export default {
  name: 'ListasGastos',
  components: {
    ExpenseListItem
  },
  data: () => ({
    expenses: [],
    activeMonth: {}
  }),
  created () {
    this.getData()
  },
  mounted () {
    this.setActiveMonth()
  },
  computed: {
    groupedMonths () {
      let groupedMonths = []

      const addCurrentMonth = () => {
        groupedMonths.push({
          data: [],
          total: 0,
          month: moment().format('MM/YYYY')
        })
      }

      if (this.expenses.length) {
        const months = groupby(this.expenses, i => (
          moment(i.createdAt).format('MM/YYYY')
        ))
        const sortedMonths = Object.keys(months).sort((a, b) => {
          const pattern = 'MM/YYYY HH'

          return moment(`${a}`, pattern).isBefore(moment(`${b}`, pattern))
            ? -1
            : +2
        })

        groupedMonths = sortedMonths.map(month => ({
          month,
          data: months[month],
          total: months[month].map(i => parseFloat(i.value)).reduce((a, c) => a + c, 0)
        }))
        const lastMonth = moment(groupedMonths[groupedMonths.length - 1].month, 'MM/YYYY')

        if (!lastMonth.isSame(moment(), 'month')) {
          addCurrentMonth()
        }
      } else {
        addCurrentMonth()
      }
      return groupedMonths
    }
  },
  methods: {
    getData () {
      const ref = this.$firebase.database().ref(`/${window.uid}`)

      ref.on('value', snapshot => {
        const values = snapshot.val()
        this.expenses = Object.keys(values).map(i => values[i])
      })
    },
    setActiveMonth (month = null) {
      this.activeMonth = month || this.groupedMonths[this.groupedMonths.length - 1]
    }
  }
}
</script>

<style lang="scss" scoped>
  .months-navigation {
    display: flex;
    margin-left: -15px;
    width: calc(100% + 30px);
    background-color: var(--featured-dark);
    .month-link {
      padding: 15px;
      cursor: pointer;
      transition: .3s;
      text-align: center;
      &:hover {
        background-color: var(--featured);
      }
      &.active {
        background-color: var(--featured);
      }
      .value-label {
        color: var(--darker);
        font-size: 8pt;
      }
    }
  }
  .container-group {
    height: calc(100vh - 69px);
    overflow: hidden auto;
    margin-left: -15px;
    width: calc(100% + 30px);
    .container {
      font-size: 15pt;
      padding-top: 15px;
      padding-bottom: 15px;
    }
  }
</style>
