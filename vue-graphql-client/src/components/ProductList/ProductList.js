import config from '../../../config.js';
import ShopifyClient from '../../services/ShopifyClient'

export default {
    name: 'ProductList',
    components: {},
    props: {
        checkoutId: String
    },
    data() {
        return {
            products: [],
            gridColumnsClass: 'grid-3',
            gridColumnsClassMobile: 'grid-1-mobile'
        }
    },
    mounted() {
        this.$emit('reveal-loader')

        this.shopifyClient = new ShopifyClient(config.shopifyDomain, config.shopifyToken);

        if(config.collectionHandle) {
            this.shopifyClient.productsFromCollection(config.collectionHandle, products => {
                console.log(products)
                this.products = products
                this.$emit('hide-loader')
            })
        } else {
            this.shopifyClient.allProducts(products => {
                console.log(products)
                this.products = products
                this.$emit('hide-loader')
            })
        }

        if(config.productListColumns){
            this.gridColumnsClass = 'grid-' + config.productListColumns 
        }
        if(config.productListColumnsMobile){
            this.gridColumnsClassMobile = 'grid-' + config.productListColumnsMobile + '-mobile'
        }
            
    },
    methods: {

        showProductDetails(product, event){
            event.preventDefault();
            this.$emit('reveal-loader')
            let productId = product.id;

            this.shopifyClient.productDetails(productId, product => {
                console.log("Product", product);
                this.$emit('reveal-product-details', product)
                this.$emit('hide-loader')
            }, errorResponse => {
                console.log(errorResponse);
            })
        },

        addToCart(product, event){
            event.preventDefault();
            
            let variantId = product.variants[0].id;
            this.shopifyClient.addToCart(variantId, this.checkoutId, successResponse => {
                console.log(successResponse)
            }, errorResponse => {
                console.log(errorResponse)
            })
        }
    }
}