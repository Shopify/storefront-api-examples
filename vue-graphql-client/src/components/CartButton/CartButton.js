export default {
    name: 'CartButton',
    components: {},
    props: {
        count: {
            default: 0
        }
    },
    data() {
        return {}
    },
 
    mounted() {
        
    },
    methods: {
        showCart(){
            this.$emit('reveal-cart')
        }
    },

}