const express = require("express");
const app = express();
const port = 3000
const morgan = require("morgan");

app.use(morgan("dev"));
app.use(express.json());

let products = [];

app.get("/products", (req, res) => {

    res.json(products)
});

app.post("/products", (req, res) => {
    const newProducts = {...req.body, id: products.length + 1}
    products.push(newProducts)

    res.json(newProducts)
});

app.put("/products/:id", (req, res) => {

    const newData = req.body

    // Comprobar si el producto existe
    const Productfound = products.find( e => e.id === parseInt(req.params.id));

    // Si hay un error ↓ el producto no se encuentra, no existe
    if(!Productfound){
        return res.status(404).send("Error marisco no se encontro ❌")
    } 

    // Actualizar producto 'newData' → lo que le enviamos
    products = products.map(e => e.id === parseInt(req.params.id) ? {...e, ...newData} : e)
    res.send("PRODUCTS UPDATING ✔")                         //Actualizar ↑     Conservar ↑ el producto    
});

app.delete("/products/:id", (req, res) => {

    // Comprobar si el producto existe
    const Productfound = products.find( e => e.id === parseInt(req.params.id));

    // Si hay un error ↓ el producto no se encuentra, no existe
    if(!Productfound){
        return res.status(404).send("Error marisco no se encontro ❌")
    } 

    // Reagsinando 'products' volviendo a filtrar todos los elementos menos '!==' el del url ID (eliminando)
    products = products.filter( e => e.id !== parseInt(req.params.id))
    res.sendStatus(204)

});

// Params ID ↓
app.get("/products/:id", (req, res) => {

    // Comprobar si el producto existe
    const Productfound = products.find( e => e.id === parseInt(req.params.id));

    if(!Productfound){ // Si hay un error ↓ el producto no se encuentra, no existe
        res.status(404).send("Error marisco no se encontro ❌")
    } else{
        res.json(Productfound);    
    }
});


app.listen(port);
console.log(`Server on port ${port}`);