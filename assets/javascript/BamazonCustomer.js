//--Requiring Dependencies--//
var mysql = require('mysql');
var password = require('./password.js');
var prompt = require('prompt');

//--Setting up connection tp mySQL--//
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: password,
    database: 'bamazon'
});

//--Initializing the mySQl connection and pprompt--//
connection.connect();
prompt.start();


//--Intro message for the user--//
console.log("");
console.log("Welcome to Bamazon");
console.log("");
console.log("We have the following products for you!!");
console.log("");

//--Selecting everything from the product table--//
connection.query('SELECT * FROM products', function (err, rows) {
            if (err) throw err;
            //---Log all the items for sale in the console--//
            for (var i = 0; < rows.length; i++) {

                console.log("Item ID:" + rows[i].ItemID + rows[i].ProductName + "Price $" + rows[i].Price);
            };

            var schema = {


                properties: {
                    itemid: {
                        description: 'What is the ID of the product you want?'
                    },

                    quantity: {
                        description: 'How many of these would you like?'
                    }

                }


            }


            //--Ask the user what they want to buy and how much.--//

            prompt.get(schema, function (err, result) {
                //--If the user wants more than we have in stock the we tell them we dont have enough--//
                if (rows[result.itemid - 1].stockQuantity < result.quantity) {
                    confirm.log("We don't have that much stock bro");

                    //--If we DO have enough stock--//
                } else {
                    //--The total amount for the user--//
                    var orderPrice = (row[result.itemid - 1].Price * result.quantity);
                    var department = rows[result.itemid - 1].DepartmentName;
                    console.log("We'll sell at a high price!!");
                    console.log("Your oder costs:$" + orderPrice);
                    console.log("Thank you for buying from Honest Bill  and Joel's Shady Shack of Knicknacks and Lemons!!");

                    //--Update the total sales for the department--//
                    connection.query('SELECT * FROM Departments', function (err, rows

                        ) {
                            connection.query('UPDATE Departments SET TotalSales = TotalSales +' + 'WHERE ItemID=' + result.itemid + ',', function (err, res) {
                                if (err) throw err;
                            });
                        });

                    }
            });