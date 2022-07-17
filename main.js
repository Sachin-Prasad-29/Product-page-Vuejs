// creating the product  component
// Vue.component('Productdetails',{
//   props:{
//     details:{
//       type : String,
//       required: true,
//     }
//   },
//   template:`
//     <div>{{prodDetails}}</div>
//   `,
//   computed:{
//     prodDetails(){
//       return this.details
//     }
//   }
// });
Vue.component('product',{
  props:{
    premium:{
      type: Boolean,
      required: true,
    }
  },
  template:`
  <div class="product">
      <div class="product-image">
        <img :src="image" />
      </div>

      <div class="product-info"
            :style='[style1,style2]'>
            <h1>{{title}}</h1>  
            <!-- we printing the values using the computed properties -->
            <p v-if="inStock >= 1">In Stock</p>
            <p v-else-if="inStock == 0">In Stock But {{variants[selectedVariant].variantQuantity}} Left</p>
            <p v-else :style='{color:stockcolor,textDecoration:textDecoration}'>Out of Stock</p>
            <p>Shipping: {{shipping}}</p>

            <ul>
              <li v-for="detail in details">{{ detail }}</li>
            </ul>

          <div v-for=" (variant,index) in variants" 
              :key="variants.variantId"
              class='color-box'
              :style='{backgroundColor:variant.variantColor}'
              @mouseover="updateProduct(index)">
          </div>

        <button @click="addToCart" 
        :disabled='!inStock < 0'
        :class='{disabledButton:inStock < 0}'>Add to Cart</button>
        <button @click="removeFromCart">Remove</button>

        
      </div>
  </div>
  `,
  data() {
    return {
        brand: 'Vue',
        product: 'Socks',
        selectedVariant:0,
        textDecoration:'line-through',
        stockcolor: 'red',
        style1:{
          backgroundColor:'white',
          fontSize:'20px',
        },
        style2:{
          padding: '30px'
        },
        details: ['80% Cotton', '20% polyester', 'Gender-neutral'],
        variants:[
          {
            variantId:2234,
            variantColor: "green",
            variantImage: 'resources/green-socks.png',
            variantQuantity: 10
          },
          {
            variantId:2235,
            variantColor: 'blue',
            variantImage: 'resources/blue-socks.png',
            variantQuantity: 1
          }
        ],
        
      }
  },
  methods:{
    addToCart() {
      console.log(this.variants[this.selectedVariant].variantId);
      this.$emit('add-to-cart',this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index){
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit('remove-from-cart');
    }
  },
  computed:{
    title(){
      return this.brand + ' ' + this.product;
    },
    image(){
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock(){
      const quantity = this.variants[this.selectedVariant].variantQuantity;
      console.log(quantity);
      if(quantity < 10 && quantity > 0) return 0;
      else if(quantity >= 10 ) return 1;
      return -1;
    },
    shipping(){
      if(this.premium){
          return "Free"
      }return "Rs.40"
    }
  }
})


const app = new Vue({
  //creating a vue instance
  el: '#app', // this all are properties which use to store data and properties
  data: {
    cart:[],
    premium : false,
    detail : "Socks are light weight and easy washable"
  },
  methods:{
    updateCart(id) {
      this.cart.push(id);
    },
    removeCart(){
      if(this.cart.length>0)
        this.cart.pop();
    }
  }
});
