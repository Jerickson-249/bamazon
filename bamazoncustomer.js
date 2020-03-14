var mysql = require('mysql')
var inquirer = require('inquirer')
require('console.table')
//Prepare the database connection

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "root",
    database: "bamazon"
});

connection.connect(function (err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    showProduct();
});


// first verify if you have enough
// if yes sell and update
// if not tell the customer and send to the menu

function showProduct() {
    console.log("Selecting all products...\n");
    connection.query("SELECT * FROM products", function (err, res) {
        if (err) throw err;
        // Log all results of the SELECT statement
        console.table(res);
        menu()
    });
}

function menu() {
    inquirer
        .prompt([
           // asking for the product id and the quantity
            {
                type: "number",
                message: "What ID of the product would you like to buy?",
                name: "id"
            },

            // Here we ask the user to confirm.
            {
                type: "number",
                message: "How many units of the product would you like to buy?",
                name: "quantity"

            }
        ]).then(function (responses) {

            console.log(responses)
            // with the response we find the product by id and we are going to verify that we have enough stock
            connection.query("SELECT * FROM products WHERE item_id=" + responses.id, function (err, res) {
                if (err) throw err;
                // Log all results of the SELECT statement
                console.log(res);
           
                // verify if the quantity the user want is small or equal that the db stock
                if (responses.quantity > res[0].stock_quantity) {
                    console.log("sorry with virus we dont have enough")
                    menu()
                }
                else {
                    console.log(`perfect, the product is on your way, the total cost is: $${responses.quantity * res[0].price}`)
                    /// update the database
                    // calculate the new stock
                    let newQ = res[0].stock_quantity - responses.quantity
                    console.log(newQ,res[0].stock_quantity,responses.quantity)
                   
                    // update the db with the new stock
                    var query = connection.query(
                        "UPDATE products SET ? WHERE ?",
                        [
                            {
                                stock_quantity: newQ
                            },
                            {
                                item_id: responses.id
                            }
                        ],
                        function (err, res) {
                            if (err) throw err;
                            console.log(res.affectedRows + " products updated!\n");
                            // Call deleteProduct AFTER the UPDATE completes 
                            menu()   
                        }
                    )
                }
            })
        })
}