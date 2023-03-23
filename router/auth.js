const express = require('express')
const User = require("../Models/Users")
const Product = require("../Models/Products")
const Order = require("../Models/Orders")
const Category = require('../Models/Category')
const Restaurant = require("../Models/Restaurant")
var mongoose = require('mongoose');
const bcrypt = require("bcryptjs")
const Authenticate = require("../Middleware/Authenticate")
const router = express.Router()
const multer = require('multer')
const cookieParser = require('cookie-parser')
router.use(cookieParser())

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './Uploads/images');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '_' + file.originalname);
    }
})
var upload = multer({ storage: storage })

const path = require("path");
const Messages = require('../Models/Message')

router.use("/images", express.static(path.join("Uploads/images")));

router.post("/edit", async (req, res) => {
    try {
        const _id = req.body._id
        const name = req.body.name.toString()
        const number = req.body.number.toString()
        const email = req.body.email.toString()

        const Updateprofile = await User.findByIdAndUpdate({ _id: _id }, { $set: { name: name, number: number, email: email } })

        if (!Updateprofile) {
            return res.status(404).send({ message: "Profile Is not Updated" });
        }
        else {
            res.send({ message: "Profile Is Updated" });
        }
    }
    catch (e) {
        res.send({ message: "Error" })
    }
})
router.post('/signout', async (req, res) => {
    try {
        const cartEmptied = await User.updateOne({ _id: req.body.rootUserId }, { $set: { "incart": [] } })
        if (cartEmptied === null) {
            res.status(404).send()
        }
        else {
            console.log(cartEmptied)
            res.clearCookie('jwtoken').send("logout succesfull")
        }

    } catch (e) {
        console.log(e.message)
    }
})
router.post("/login", (req, res) => {

    const { email, password } = req.body
    //  console.log(req.body)
    User.findOne({ email: email, state: true }, async (err, user) => {
        if (user) {
            const isMatch = await bcrypt.compare(password[0], user.password)
            if (isMatch) {

                token = await user.generateAuthToken();
                res.cookie("jwtoken", token, {
                    expires: new Date(Date.now() + 1200000),
                    httpOnly: true,
                    secure: true,
                    sameSite: 'none'
                }).send()
            }
            else {
                //  console.log("Password Did Not Match")

                res.send({ message: "Incorrect Credienteals" })
            }
        } else {
            //    console.log("User Not Registered")
            res.send({ message: "Incorrect Credienteals" })
        }
    })
})

router.post("/register", (req, res) => {
    console.log(req.body)

    const { name, email, password, number } = req.body

    User.findOne({ email: email }, (err, user) => {
        if (user) {
            res.send({ message: "User Already Registered" })
        } else {
            const user = new User({
                name: name[0],
                number: number[0],
                email: email[0],
                password: password[0],
            })
            user.save(err => {
                if (err) {
                    console.log(err)
                    console.log("Hello")
                    res.send(err)
                }
                else {
                    res.send({ message: "Successfully Registration" })
                }
            })
        }

    })
    // res.send('my register api')
})

router.get("/login", (req, res) => {
    res.send("hii login get method")
})
router.get("/home", Authenticate, async (req, res) => {
    res.send({ rootUser: req.rootUser, message: "on home page" })
})

router.get("/account", Authenticate, async (req, res) => {
    res.send({ rootUser: req.rootUser, message: "on account page" })
})
router.get("/cart", Authenticate, async (req, res) => {
    res.send({ rootUser: req.rootUser, message: "on cart page" })
})

router.post('/getproduct', async (req, res) => {
    try {
        const item = await Product.findOne({ _id: req.body.productId })
        console.log(item)
        res.send(item)
    } catch (err) {
        res.send(err)
    }
})

router.post('/getusername', async (req, res) => {
    // console.log(req.body)
    try {
        const user = await User.findOne({ _id: req.body.userId })
        console.log(user.name)
        res.send(user.name)
    } catch (err) {
        res.send(err)
    }
})
router.get('/getproducts', async (req, res) => {
    try {
        const items = await Product.find()
        res.send(items)
    } catch (err) {
        res.send(err)
    }
})
router.post('/incart', async (req, res) => {
    // console.log(req.body)
    try {

        const incartArray = await User.findOne({ _id: req.body.rootUserId }, { incart: 1, _id: 0 })
        if (incartArray === null) {
            console.log("no data")
            res.send([])
        } else {
            // console.log(incartArray.incart)
            res.status(200).send(incartArray.incart)
        }
    } catch (err) {
        console.log(err)
        res.send(err)
    }
})

router.post('/gettotal', async (req, res) => {

    let total = 0;
    let gst = 0;
    const orderArray = await User.findOne({ _id: req.body.userId }, { incart: 1, _id: 0 })
    orderArray.incart.forEach(arrayItem => {
        total = total + arrayItem.total
    })
    gst = (total * 5) / 100
    // console.log("total ", total)
    // console.log("gst ", gst)
    res.status(200).send({ total, gst })

})


router.post('/addtocart', async (req, res) => {
    console.log(req.body.name)
    let total = 0;
    let gst = 0;
    if (!(req.body.count === 0)) {
        var item = {
            productId: req.body.productId,
            name: req.body.name,
            count: req.body.count,
            total: req.body.price * req.body.count
        }
        console.log("we are in working..")
        const itemOrNot = await User.findOne({ _id: req.body.userId, incart: { $elemMatch: { productId: item.productId } } })
        if (itemOrNot === null) {

            const addedItemIncart = await User.findOneAndUpdate({ _id: req.body.userId }, { $push: { incart: item } })
            if (!addedItemIncart) {
                res.status(404).send()
            } else {
                //calculate total and gst and send
                const orderArray = await User.findOne({ _id: req.body.userId }, { incart: 1, _id: 0 })
                orderArray.incart.forEach(arrayItem => {
                    total = total + arrayItem.total
                })
                gst = (total * 5) / 100
                // console.log("total ", total)
                // console.log("gst ", gst)
                res.status(200).send({ total, gst })
            }
        }
        else {
            const updatedItem = await User.findOneAndUpdate(
                { _id: req.body.userId, "incart.productId": item.productId },
                {
                    $set: {
                        "incart.$.count": item.count,
                        "incart.$.total": item.total
                    }
                }
            )
            if (!updatedItem) {
                res.status(404).send()
            } else {
                //calculate total and gst and send
                const orderArray = await User.findOne({ _id: req.body.userId }, { incart: 1, _id: 0 })
                orderArray.incart.forEach(arrayItem => {
                    total = total + arrayItem.total
                })
                gst = (total * 5) / 100
                // console.log("total ", total)
                // console.log("gst ", gst)

                res.status(200).send({ total, gst })
            }


        }

    }
    else {

        console.log("item is removed")
        const garbage2 = await User.findOneAndUpdate(
            { _id: req.body.userId },
            { $pull: { "incart": { "productId": req.body.productId } } }
        )
        if (garbage2) {
            //calculate total and gst and send
            const orderArray = await User.findOne({ _id: req.body.userId }, { incart: 1, _id: 0 })
            orderArray.incart.forEach(arrayItem => {
                total = total + arrayItem.total
            })
            gst = (total * 5) / 100
            // console.log("total ", total)
            // console.log("gst ", gst)

            res.status(200).send({ total, gst })
        } else {
            res.status(404).send()
        }
    }

})



//place order

router.post('/placeorder', async (req, res) => {
    console.log(req.body)

    Order.findOne({ userId: req.body.rootUserId }, async (err, user) => {

        if (user) {
            console.log("User has previously ordered")

            const orderArray = await User.findOne({ _id: req.body.rootUserId }, { incart: 1, _id: 0 })
            // console.log(orderArray.incart)
            if (orderArray.incart.length === 0) {
                res.send({ message: "Order array is empty" })
            }
            else {
                const order = new Order({
                    userId: req.body.rootUserId,
                    order: orderArray.incart,
                    total: req.body.total,
                    dateTime: req.body.dateTime,
                    Instructions: req.body.instruct
                })
                order.save(async err => {
                    if (err) {
                        console.log(err)
                        console.log("Order not saved")
                        res.send(err)
                    }
                    else {
                        const cartEmptied = await User.updateOne({ _id: req.body.rootUserId }, { $set: { "incart": [] } })
                        if (cartEmptied === null) {
                            res.status(404).send()
                        }
                        else {
                            console.log(cartEmptied)
                        }
                        res.send({ message: "Successfully Ordered" })
                    }
                })
            }

        } else {
            const orderArray = await User.findOne({ _id: req.body.rootUserId }, { incart: 1, _id: 0 })
            if (orderArray === null) {
                res.send({ message: "Order array is empty" })
            }
            else {
                const order = new Order({
                    userId: req.body.rootUserId,
                    order: orderArray.incart,
                    total: req.body.total,
                    dateTime: req.body.dateTime
                })
                order.save(err => {
                    if (err) {
                        console.log(err)
                        console.log("Order not saved")
                        res.send(err)
                    }
                    else {
                        res.send({ message: "Successfully Ordered" })
                    }
                })
            }
        }

    })
})

// get order history

router.post('/adminorderhistory', async (req, res) => {
    const pastOrders = await Order.aggregate(
        [{ $match: { state: true } }]
    )
    const liveOrders = await Order.aggregate(
        [{ $match: { state: false } }]
    )

    if (pastOrders && liveOrders) {
        res.status(200).send({ pastOrders, liveOrders })
    } else {
        console.log("not found")
    }
})

router.post('/orderhistory', async (req, res) => {
    const ObjectId = mongoose.Types.ObjectId;
    console.log(req.body.rootUserId)
    const pastOrders = await Order.aggregate(
        [{ $match: { $and: [{ userId: ObjectId(req.body.rootUserId) }, { state: true }] } }]
    );
    const liveOrders = await Order.aggregate(
        [{ $match: { $and: [{ userId: ObjectId(req.body.rootUserId) }, { state: false }] } }]
    );
    if (pastOrders && liveOrders) {
        res.status(200).send({ pastOrders, liveOrders })
    } else {
        console.log("not found")
    }
})
router.post('/changestate', async (req, res) => {
    console.log(req.body._id)
    const updated = await Order.updateOne({ _id: req.body._id }, { $set: { 'state': true } })
    if (updated === null) {
        res.status(404).send()
    }
    else {
        console.log(updated)
    }
    res.send({ message: "Successfully Delivered" })
})


//admin item page

router.post('/addcategory', async (req, res) => {
    const { name } = req.body

    Category.findOne({ name: name }, (err, category) => {
        if (category) {
            res.send({ message: "category already exists" })
        }
        else {
            const category = new Category({
                name: name
            })

            category.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "category added" })
                }
            })
        }
    })

})
router.post('/addrestaurant', async (req, res) => {

    const { name } = req.body

    Restaurant.findOne({ name: name }, (err, rest) => {
        if (rest) {
            res.send({ message: "restaurant already exists" })
        }
        else {
            const restaurant = new Restaurant({
                name: name
            })

            restaurant.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "restaurant added" })
                }
            })
        }
    })

})
router.post('/addproduct', upload.single('image'), async (req, res) => {
    console.log(req.body)
    const { name, price, desc, category, city } = req.body

    Product.findOne({ $and: [{ name: name }, { restaurant: city }] }, (err, product) => {
        if (product) {
            res.send({ message: "Iteam Already Exists in this Restaurant" })
        } else {
            const product = new Product({
                image: req.file.filename,
                name: name,
                price: parseFloat(price).toFixed(2),
                desc: desc,
                category: category,
                restaurant: city
            })
            product.save(err => {
                if (err) {
                    res.send(err)
                }
                else {
                    res.send({ message: "Successfully Added" })
                }
            })
        }
    })
})




router.post('/readcategory', async (req, res) => {
    try {
        const items = await Category.find()
        res.send(items)
    } catch (err) {
        res.send(err)
    }

})
router.post('/readrestaurant', async (req, res) => {
    try {
        const items = await Restaurant.find()
        res.send(items)
    } catch (err) {
        res.send(err)
    }

})
router.post('/readproduct', async (req, res) => {
    const { category, city } = req.body
    const products = await Product.aggregate(
        [{ $match: { $and: [{ category: category }, { restaurant: city }] } }]
    )
    if (products) {
        res.send(products)
    }
})




router.post('/updatecategory', async (req, res) => {
    const updated = await Category.updateOne({ name: req.body.category }, { $set: { name: req.body.editCategory } })
    if (updated) {
        res.send({ message: "category updated" })
    } else {
        res.send()
    }
})
router.post('/updaterestaurant', async (req, res) => {
    const updated = await Restaurant.updateOne({ name: req.body.city }, { $set: { name: req.body.editCity } })
    if (updated) {
        res.send({ message: "restaurant updated" })
    } else {
        res.send()
    }

})
router.post('/updateproduct', upload.single('image'), async (req, res) => {
    const { name, price, desc, category, city } = req.body
    const updated = await Product.updateOne({ _id: req.body.ID }, {
        $set: {
            image: req.file.filename, name: name, price: parseFloat(price).toFixed(2)
            , desc: desc, restaurant: city, category: category
        }
    })
    if (updated) {
        res.send({ message: "product updated" })
    } else {
        res.send()
    }

})

router.post('/updateproduct2', async (req, res) => {
    try {
        const name = req.body.name.toString()
        const price = req.body.price.toString()
        const desc = req.body.desc.toString()
        const category = req.body.category.toString()
        const city = req.body.restaurant.toString()
        const updated = await Product.updateOne({ _id: req.body._id }, { $set: { name: name, price: parseFloat(price).toFixed(2), desc: desc, restaurant: city, category: category } })
        if (updated) {
            res.send({ message: "product updated" })
        } else {
            res.send()
        }
    } catch (err) { console.log(err) }

})




router.post('/deletecategory', async (req, res) => {
    const deleted = await Category.deleteOne({ name: req.body.category })
    if (deleted) {
        res.send({ message: "category deleted" })
        console.log(deleted)
    } else {
        res.send()
    }

})
router.post('/deleterestaurant', async (req, res) => {
    const deleted = await Restaurant.deleteOne({ name: req.body.city })
    if (deleted) {
        res.send({ message: "restaurant deleted" })
        console.log(deleted)
    } else {
        res.send()
    }

})
router.post('/deleteproduct', async (req, res) => {
    const deleted = await Product.deleteOne({ _id: req.body._id })
    if (deleted) {
        res.send({ message: "product deleted" })
        console.log(deleted)
    } else {
        res.send()
    }
})


router.post('/submitform', async (req, res) => {
    const { data, from } = req.body

    const message = new Messages({
        name: data.name,
        email: from,
        subject: data.subject,
        message: data.message
    })

    message.save(async (err) => {
        if (err) {
            res.send(err)
        } else {
            res.send({message:"your message has been recived, you will here from us shortly"})

        }
    })
})

router.get("/readmessages",async(req,res)=>{
    const data = await Messages.find()

    res.send(data)
})

router.post('/deletemessage',async(req,res)=>{
    // console.log(req.body)
    const deleteMessage = await Messages.findByIdAndDelete({_id:req.body._id})
    res.send()
})

module.exports = router
