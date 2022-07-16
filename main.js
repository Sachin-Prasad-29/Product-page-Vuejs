const product = new Vue({
  //creating a vue instance
  el: '#app', // this all are properties which use to store data and properties
  data: {
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
    cart:0
  },
  methods:{
    addToCart() {
      this.cart +=1;
    },
    updateProduct(index){
      this.selectedVariant = index;
    },
    removeFromCart() {
      if(this.cart > 0)
      this.cart -=1;
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
    }
  }
});
