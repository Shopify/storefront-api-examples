const fetch = require('node-fetch');

// Shop specific setup constants 
const args = process.argv.slice(2);
const shopUrl = args[0] || "<myshopify shop url>";
const accessToken = args[1] || "<storefront api access token found from private app page>";

// Simple GraphQL with no variables
const query1 = `query FirstProduct {
    products(first:1) {
        edges {
            node {
                id
                title
                description
                variants(first:1) {
                    edges {
                        node {
                            title
                            id
                            priceV2 {
                                amount
                                currencyCode
                            }
                        }
                    }
                }
            }
        }
    }   
}`;

// Search GraphQL with one typed variable
const query2 = `query SpecificProduct($id: ID!) {
    node(id: $id) {
        id
        ... on Product {
            title
            description
            id
            handle
        }
    }
}`;

const fetchQuery1 = () => {
    // Define options for first query with no variables and body is string and not a json object
    const optionsQuery1 = {
        method: "post",
        headers: {
            "Content-Type": "application/graphql",
            "X-Shopify-Storefront-Access-Token": accessToken
        },
        body: query1
    };

    // Fetch data and remember product id
    fetch(shopUrl + `/api/graphql`, optionsQuery1)
        .then(res => res.json())
        .then(response => {
            productId = response.data.products.edges[0].node.id; 
            console.log("=============== Fetch First Product ===============");
            console.log(JSON.stringify(response, null, 4));
            fetchQuery2(productId)  
        });
}

// Fetch a specific product with example of json body with both query and variables
const fetchQuery2 = (productId) => {
    const params = {
        query: query2,
        variables: { id: productId}
    }
    const optionsQuery2 = {
        method: "post",
        headers: {
        "Content-Type": "application/json",
        "Accept": "application/json",
        "X-Shopify-Storefront-Access-Token": accessToken
        },
        body: JSON.stringify(params)
    };

    fetch(shopUrl + `/api/graphql`, optionsQuery2)
        .then(res => res.json())
        .then(response => {  
            console.log("=============== Fetch Specific Product ===============");
            console.log(JSON.stringify(response, null, 4)) 
        });        
}

fetchQuery1();