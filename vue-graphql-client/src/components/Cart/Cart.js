export default {
    name: 'Cart',
    components: {},
    props: {
        count: {
            default: 0
        },
        lineItems: {
            default: []
        },
        checkoutUrl: String,
        totalPrice: String
    },
    data() {
        return {}
    },
 
    mounted() {
        console.log("lineItems")
        console.log(this.lineItems)
        
    },
    methods: {

        remove(lineItem, event){
            event.preventDefault();
            this.$emit('remove-from-cart', lineItem.id)
        },
        incrementQuantity(lineItem, event) {
            event.preventDefault();
            let quantity = lineItem.quantity+1;
            this.$emit('update-quantity', lineItem.id, lineItem.variantId, quantity)
        },
        decrementQuantity(lineItem, event){
            event.preventDefault();
            let quantity = lineItem.quantity-1;
            if(quantity < 1){
                this.remove(lineItem, event)
                return
            }
            this.$emit('update-quantity', lineItem.id, lineItem.variantId, quantity)
        }
       
    },

}