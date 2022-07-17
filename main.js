// creating the reveiw component
Vue.component('product-review', {
  template: `
  <div>
     <form class='review-from' @submit.prevent='onSubmit'>
        <p v-if="errors.length">
            <b> Please correct the following error:</b>
            <ul>
               <li v-for="error in errors">{{error}}</li>
            </ul>
        </p>
        <p>
           <label for='name'>Name:</label >
           <input id='name' v-model='name' />
        </p>
        <p>
          <label for='review' >Review:</label>
          <textarea id='review' v-model='review'></textarea>
        </p>
        <p>
          <label for='rating'>Rating:</label>
          <select id='rating' v-model.number='rating'>
            <option>5</option>
            <option>4</option>
            <option>3</option>
            <option>2</option>
            <option>1</option>
          </select>
        </p>
        <p>
          <input type='submit' />
        </p>
     </form>  
  </div>
  
  `,
  data() {
    return {
      name: null,
      review: null,
      rating: null,
      errors: []
    };
  },
  methods: {
    onSubmit() {
      if(this.name && this.review && this.rating){
        let productReview = {
          name: this.name,
          review: this.review,
          rating: this.rating,
        };
        this.$emit('review-submitted', productReview);
        this.name = null;
        this.rating = null;
        this.review = null;
      }
      else{
        if(!this.name) this.errors.push("Name Required");
        if(!this.rating) this.errors.push("Rating Required");
        if(!this.review) this.errors.push("Review Required");
      }
      
    },
  },
});
// creating the product  component
Vue.component('product', {
  props: {
    premium: {
      type: Boolean,
      required: true,
    },
  },
  template: `
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

        <div>
         <h3>Reviews:</h3>
         <p  > There are no review Yet.</p>
         <ul>
            <li v-for="review in reviews" >
                <p> by {{review.name}}</p>
                <p> Rating: {{review.rating}}</p>
                <p> {{review.review}}</p>
            </li>
         </ul>
         
        </div>
        <hr>
        
        <product-review @review-submitted="addReview"></product-review>
      </div>
      
  </div>
  `,
  data() {
    return {
      brand: 'Vue',
      product: 'Socks',
      selectedVariant: 0,
      textDecoration: 'line-through',
      stockcolor: 'red',
      style1: {
        backgroundColor: 'white',
        fontSize: '20px',
      },
      style2: {
        padding: '30px',
      },
      details: ['80% Cotton', '20% polyester', 'Gender-neutral'],
      variants: [
        {
          variantId: 2234,
          variantColor: 'green',
          variantImage: 'resources/green-socks.png',
          variantQuantity: 10,
        },
        {
          variantId: 2235,
          variantColor: 'blue',
          variantImage: 'resources/blue-socks.png',
          variantQuantity: 1,
        },
      ],
      reviews: [],
    };
  },
  methods: {
    addToCart() {
      console.log(this.variants[this.selectedVariant].variantId);
      this.$emit('add-to-cart', this.variants[this.selectedVariant].variantId);
    },
    updateProduct(index) {
      this.selectedVariant = index;
    },
    removeFromCart() {
      this.$emit('remove-from-cart');
    },
    addReview(productReview) {
      this.reviews.push(productReview);
    },
  },
  computed: {
    title() {
      return this.brand + ' ' + this.product;
    },
    image() {
      return this.variants[this.selectedVariant].variantImage;
    },
    inStock() {
      const quantity = this.variants[this.selectedVariant].variantQuantity;
      console.log(quantity);
      if (quantity < 10 && quantity > 0) return 0;
      else if (quantity >= 10) return 1;
      return -1;
    },
    shipping() {
      if (this.premium) {
        return 'Free';
      }
      return 'Rs.40';
    },
  },
});

const app = new Vue({
  //creating a vue instance
  el: '#app', // this all are properties which use to store data and properties
  data: {
    cart: [],
    premium: false,
  },
  methods: {
    updateCart(id) {
      this.cart.push(id);
    },
    removeCart() {
      if (this.cart.length > 0) this.cart.pop();
    },
  },
});
