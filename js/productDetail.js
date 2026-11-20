import { productsData } from "./productData.js";

let params = new URLSearchParams(window.location.search);
let productID = params.get("id");

let product = productsData.find(item => item.id === productID);

