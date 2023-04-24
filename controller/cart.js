const { response } = require("express");
const Cart = require("../models/cart");

// function runUpdate(condition, updateData) {
//   return new Promise((resolve, reject) => {
//     Cart.findOneAndUpdate(condition, updateData, { upsert: true })
//       .then((result) => resolve())
//       .catch((err) => reject(err));
//   });
// }


const runUpdate = (condition, update) => {
  return new Promise((resolve, reject) => {
    Cart.findOneAndUpdate(condition, update, { new: true })
      .then((result) => resolve(result))
      .catch((error) => reject(error));
  });
};


// exports.addItemToCart = (req, res) => {
//   Cart.findOne({ user: req.user._id }).then((cart, error) => {
//     if (error) return res.status(400).json({ error });
//     if (cart) {
//       //if cart already exists then update cart by quantity
//       let promiseArray = [];

//       if (!Array.isArray(req.body.cartItems)) {
//         return res.status(400).json({ error: 'Cart items should be an array' });
//       }

//       req.body.cartItems.forEach((cartItem) => {
//         const product = cartItem.product;
//         const item = cart.cartItems.find((c) => c.product == product);
//         let condition, update;
//         if (item) {
//           condition = { user: req.user._id, "cartItems.product": product };
//           update = {
//             $set: {
//               "cartItems.$": {
//                 ...cartItem,
//                 quantity: item.quantity + cartItem.quantity // increment quantity
//               },
//             },
//           };
//         } else {
//           condition = { user: req.user._id };
//           update = {
//             $push: {
//               cartItems: cartItem,
//             },
//           };
//         }
//         promiseArray.push(runUpdate(condition, update));
//       });
//       Promise.all(promiseArray)
//         .then((response) => res.status(201).json({ cart: response }))
//         .catch((error) => res.status(400).json({ error }));
//     } else {
//       //if cart not exist then create a new cart
//       const cart = new Cart({
//         user: req.user._id,
//         cartItems: req.body.cartItems,
//       });
//       cart.save().then((cart) => {
//         if (cart) {
//           return res.status(201).json({ cart });
//         }
//       }).catch((error) => res.status(400).json({ error }));
//     }
//   });
// };

exports.addItemToCart = async (req, res) => {
  try {
    await Cart.findOne({ user: req.user._id }).then((cart, error) => {
      if (error) return res.status(400).json({ error });

      if (cart) {
        let promiseArray = [];
        console.log(req.body.cartItems);
        req.body.cartItems.forEach((cartItem) => {
          const product = cartItem.product;
          const item = cart.cartItems.find((c) => c.product == product);
          let condition, update;
          if (item) {
            condition = { user: req.user._id, "cartItems.product": product };
            update = {
              "$set": {
                "cartItems.$": cartItem,
              },
            };
          } else {
            condition = { user: req.user._id };
            update = {
              "$push": {
                "cartItems": cartItem,
              },
            };
          }
          promiseArray.push(runUpdate(condition, update))
        });
        Promise.all(promiseArray)
          .then(response => res.status(201).json({ response }))
          .catch(error => res.status(400).json({ error }))
      }else {
        const cart = new Cart({
          user: req.user._id,
          cartItems: req.body.cartItems
        });
          cart.save().then((cart, error) => {
          if(cart) return res.status(201).json({ cart })
          if(error) return res.status(400).json({ error })
        })
      }
    });

    // if (cart) {
    //   //if cart already exist then update cart by quantity

    //   const product = req.body.cartItems.product;
    //   const item = cart.cartItems.find((c) => c.product == product);
    //   let condition, update;

    //   if (item) {
    //     condition = { user: req.user._id, "cartItems.product": product };
    //     update = {
    //       $set: {
    //         "cartItems.$": {
    //           ...req.body.cartItems,
    //           quantity: item.quantity + req.body.cartItems.quantity,
    //         },
    //       },
    //     };
    //   } else {
    //     condition = { user: req.user._id };
    //     update = {
    //       $push: {
    //         cartItems: req.body.cartItems,
    //       },
    //     };
    //   }
    //   await Cart.findOneAndUpdate(condition, update).then((_cart, error) => {
    //     if (_cart) return res.status(201).json({ cart: _cart });
    //     if (error) return res.status(400).json({ error });
    //   });
    // } else {
    //   const cart = new Cart({
    //     user: req.user._id,
    //     cartItems: [req.body.cartItems],
    //   }
    //   );

    //   await cart.save().then((cart, error) => {
    //     if (cart) return res.status(201).json({ cart });
    //     if (error) return res.status(400).json({ error });
    //   });
    // }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

exports.getCartItems = async (req, res) => {
  try {
    
    await Cart.findOne({ user: req.user._id })
      .populate('cartItems.product', '_id name price productPictures')
      .then((cart, error) => {
        if (error) return res.status(400).json({ error });
        if(cart){
          let cartItems = {};
          cart.cartItems.forEach((item, index) => {
            cartItems[item.product._id.toString()] = {
              _id: item.product._id.toString(),
              name: item.product.name,
              img: item.product.productPictures[0].img,
              price: item.product.price,
              qty: item.quantity
            }
          })
          // console.log({cartItems});
          res.status(200).json({ cartItems })
        }
      })

  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};


exports.removeCartItems = async (req, res) => {
  try {
    const { productId } = req.body.payload;
    if (productId) {
      await Cart.findOneAndUpdate(
        { user: req.user._id },
        {
          $pull: {
            cartItems: {
              product: productId,
            },
          },
        }
      ).then((result, error) => {
        if (error) return res.status(400).json({ error });
        if (result) {
          res.status(202).json({ result });
        }
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};
