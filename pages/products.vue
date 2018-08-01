<template>
    <b-container fluid>
      <b-card>
        <b-form>
<h2 class="pb-4">Calculadora Rápida de precio</h2>

<div class="form-group d-flex flex-column">
      <label for="precentid">Porcentaje</label>
  <select id="precentid" class="form-control flex-grow-1" v-model="percent">
    <option v-bind:value="item.value" v-for="(item,index) in percents" v-bind:key="index">{{ item.title }}</option>
  </select>
</div>
<div class="form-group d-flex">
  <select class="form-control flex-grow-1" v-model="productItem.productId">
    <option v-bind:value="item.id" v-for="item in products" v-bind:key="item.id">{{ item.title }}</option>
  </select>
  <input class="form-control" type="number" v-model="productItem.qty" min="1" max="999">
                    </div>
                    <div class="form-group">
                      <button class="btn btn-success" v-on:click="addElement">Añadir</button>
                      <button class="ml-2 btn btn-danger" v-on:click="reset">Resetear</button>

                    </div>
                    </b-form>
                    <div class="table-responsive">
                        <table class="table table-striped">
                            <thead>
                                <tr>
                                    <th>Producto</th>
                                    <th>Cantidad</th>
                                    <th>Volumen</th>
                                    <th>Venta</th>
                                    <th>Costo</th>
                                    <th>Ganancia</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="(productItem,index) in productListPercent" v-bind:key="index">
                                    <td>{{productItem.title}}</td>
                                    <td>{{productItem.qty}}</td>
                                    <td>{{productItem.pv}}</td>
                                    <td>{{productItem.sale}}</td>
                                    <td>{{productItem.cost}}</td>
                                    <td>{{productItem.profit}}</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr>
                                    <td>Total</td>
                                    <td>{{total.qty | currency('', 0, { decimalSeparator: ',' }) }}</td>
                                    <td>{{total.vol | currency('', 2, { decimalSeparator: ',' }) }}</td>
                                    <td>{{total.sale | currency('$', 2, { decimalSeparator: ',' }) }}</td>
                                    <td>{{total.cost | currency('$', 2, { decimalSeparator: ',' }) }}</td>
                                    <td>{{total.profit | currency('$', 2, { decimalSeparator: ',' }) }}</td>
                                </tr>
                                <tr>
                                  <td colspan="6"><small class="form-text text-muted">Precios mostrados al {{ percent }}%.</small>
                                </td>
                                </tr>
                            </tfoot>
                        </table>
                    </div>

                    
      </b-card>
    </b-container>
</template>

<style>
tfoot{
  font-weight: 600;
}
input[type=checkbox], input[type=radio] {
    box-sizing: border-box;
    padding: 0;
}
</style>

<script>
import { mapState } from "vuex";

export default {
      middleware: 'auth',
  data(){
    return {
      productList: [],
      percent: 25,
      statusPrice: false,
      productItem: {qty: 1},
      percents: [
        {title:'25%', value:25},
        {title:'35%', value:35},
        {title:'42%', value:42},
        {title:'50%', value:50}
      ]
    }
  },
  components: {},
  created () {
    this.$store.dispatch('getProduct','products');
  },
  methods:{
    addElement(e){
      e.preventDefault()
      let product = this.products.filter(i => i.id == this.productItem.productId)[0];
      this.productList.push({
        qty: this.productItem.qty,  ...product
      });
      this.productItem.product= {};
    },
    reset(e){
      e.preventDefault();
      this.productList = [];
    }
  },
  computed: {
    ...mapState(["products"]),
    total(){
      let total = {vol: 0.00, sale: 0.00, cost:0.00, profit:0.00,qty:0.00};
      Object.entries(this.productListPercent).forEach(([k,element]) => {
        total.vol = (total.vol  + Number(element.pv));
        total.qty = (total.qty + Number(element.qty));
        total.sale = (total.sale + Number(element.sale));
        total.cost = (total.cost + Number(element.cost));
        total.profit = (total.profit + Number(element.profit));
      });
      return total;
    },
    productListPercent(){
      let productListPercent = {};
      this.productList.forEach(product => {
        let qty = product.qty;
        let sale = Number(qty * product.pp).toFixed(2);
        let pv = Number(qty * product.pv).toFixed(2);
        let perc =  Number(product[this.percent]);
        let cost = Number(qty * perc).toFixed(2);
        let profit = Number(sale - cost).toFixed(2);
        productListPercent[product.id] = { title: product.title, qty: qty,  pv: pv, sale: sale, cost: cost, profit: profit}
      });
      return productListPercent;
    }
  }
};
</script>
