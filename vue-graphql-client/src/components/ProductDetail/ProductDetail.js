import config from '../../../config.js';
import ShopifyClient from '../../services/ShopifyClient'

export default {
    name: 'ProductDetail',
    components: {},
    props: {
        product: Object,
        checkoutId: String 
    },
    data() {
        return {
            selectedVariant: null
        }
    },
 
    mounted() {
        console.log("product", this.product)
        this.shopifyClient = new ShopifyClient(config.shopifyDomain, config.shopifyToken)
        this.selectedVariant = this.product.variants[0]
    },
    
    methods: {
        selectVariant(variant, event) {
            event.preventDefault();
            this.selectedVariant = variant
            console.log(this.selectedVariant)
        },
        addToCart(variantId, event) {
            event.preventDefault();
            
            this.shopifyClient.addToCart(variantId, this.checkoutId, successResponse => {
                console.log(successResponse)
                if(config.googleAnalyticsId){
                    this.$ga.event('cart', 'added', 'variantId', variantId)
                }
                this.$emit('cart-updated')
            }, errorResponse => {
                console.log(errorResponse)
            })
        },
        updateSelectedImage(image) {
            this.product.selectedImage = image
        }
    }

}