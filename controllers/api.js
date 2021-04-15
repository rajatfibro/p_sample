/* eslint-disable no-undef */
var db = require('../db.js')


let queryHandler = {
    fetchAllProductsList:()=>{
        return new Promise(function (resolve, reject) {
            let query = `select * from products`
      
            db.get().query(query, function (err, rows) {
              if (err) return reject(err)
              resolve(rows)
            })
          })
    },

    AddproductToCart: (data) =>{
        return new Promise(function (resolve, reject) {
            let query = `insert into  cart_products SET ?`
        
      
            db.get().query(query,data, function (err, rows) {
              if (err) return reject(err)
              resolve(rows)
            })
          })
    },

    getCartByUser: (data, obj) =>{
        return new Promise(function (resolve, reject) {
            let query = `select * from cart where user_id = ? `
        
      
            db.get().query(query,[data.user_id], function (err, rows) {
              if (err) return reject(err)
              resolve(rows)
            })
          })
    }

}
let fetchAllproducts =  async (req, res, next) => {


    // fetch products list
    let fetchAllProducts = await queryHandler.fetchAllProductsList()

    res.send ({
        status: 200,
        success: true,
        error: [],
        data: fetchAllProducts
    })
}


let AddproductToCart =  async (req, res, next) => {


    // fetch products list
    let user =  req.session
    let data =  req.body

    let getCartByuser = await queryHandler.getCartByUser(user, data)

    if(!getCartByuser.length){
        res.send ({
            status: 400,
            success: true,
            error: ['User does not have This cart '],
            data: fetchAllProducts
        })
    }
    
    let cart_obj = {
        products_id : data.p_id,
        cart_id: data.cart_id,
        
    }
    let fetchAllProducts = await queryHandler.AddproductToCart(cart_obj)

    res.send ({
        status: 200,
        success: true,
        error: [],
        data: fetchAllProducts
    })
}


let fetchCartByUser =  async (req, res, next) => {


    // fetch products list
    let user =  req.session
   let data = {}
    let getCartByuser = await queryHandler.getCartByUser(user, data)

    if(!getCartByuser.length){
        res.send ({
            status: 400,
            success: true,
            error: ['User does not have This cart '],
            data: fetchAllProducts
        })
    }
    


    res.send ({
        status: 200,
        success: true,
        error: [],
        data: getCartByuser
    })
}



module.exports = {
    fetchAllproducts: fetchAllproducts,
    AddproductToCart: AddproductToCart,
    fetchCartByUser: fetchCartByUser
}
