var express = require("express")
var Sequelize = require("sequelize")

//connect to mysql database
//baza de date, username, password
var sequelize = new Sequelize('catalog', 'username', 'password', {
    dialect:'mysql',
    host:'127.0.0.1'
})

sequelize.authenticate().then(function(){
    console.log('Success')
}).catch( function(err) {
    console.log(err)
})

//define a new Model
var Specs = sequelize.define('specs', {
    name: Sequelize.STRING,
    description: Sequelize.STRING,
    memory: Sequelize.STRING,
    HDD: Sequelize.STRING,
    weight: Sequelize.STRING,
    CPU: Sequelize.STRING,
    autonomy: Sequelize.STRING
    
   
})

var Products = sequelize.define('products', {
    name: Sequelize.STRING,
    spec_id: Sequelize.INTEGER,
    company: Sequelize.STRING,
    description: Sequelize.STRING,
    price: Sequelize.INTEGER,
    warranty: Sequelize.STRING,
   

})

var Reviews = sequelize.define('reviews', {
    product_id: Sequelize.INTEGER,
    name: Sequelize.STRING,
    content: Sequelize.STRING,
    score: Sequelize.INTEGER
})

Products.belongsTo(Specs, {foreignKey: 'spec_id', targetKey: 'id'})
Products.hasMany(Reviews, {foreignKey: 'product_id'});

var app = express()

//access static files
app.use(express.static('public'))
app.use('/admin', express.static('admin'))

app.use(express.json());       // to support JSON-encoded bodies
app.use(express.urlencoded()); // to support URL-encoded bodies

app.get('/createdb', (request, response) => {
    sequelize.sync({force: true}).then(() => {
        response.status(200).send('tables created')
    }).catch((err) => {
        response.status(500).send('could not create tables')
    })
})

app.get('/createdata', (req, res) => {
    //TODO add some test data here
})

async function getSpecs(request, response) {
    try {
        let specs = await Specs.findAll();
        response.status(200).json(specs)
    } catch(err) {
        response.status(500).send('something bad happened')
    }
}

// get a list of specs
app.get('/specs', getSpecs)

// get one spec by id
app.get('/specs/:id', function(request, response) {
    Specs.findOne({where: {id:request.params.id}}).then(function(spec) {
        if(spec) {
            response.status(200).send(spec)
        } else {
            response.status(404).send()
        }
    })
})

//create a new spec
app.post('/specs', function(request, response) {
    Specs.create(request.body).then(function(spec) {
        response.status(201).send(spec)
    })
})

app.put('/specs/:id', function(request, response) {
    Specs.findByPk(request.params.id).then(function(spec) {
        if(spec) {
            spec.update(request.body).then(function(spec){
                response.status(201).send(spec)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/specs/:id', function(request, response) {
    Specs.findByPk(request.params.id).then(function(spec) {
        if(spec) {
            spec.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/products', function(request, response) {
    Products.findAll(
        {
            include: [{
                model: Specs,
                where: { id: Sequelize.col('products.spec_id') }
            }, {
                model: Reviews,
                where: { id: Sequelize.col('products.id')},
                required: false
            }]
        }
        
        ).then(
            function(products) {
                response.status(200).send(products)
            }
        )
})

app.get('/products/:id', function(request, response) {
    Products.findByPk(request.params.id, {
            include: [{
                model: Specs,
                where: { id: Sequelize.col('products.spec_id') }
            }, {
                model: Reviews,
                where: { id: Sequelize.col('products.id')},
                required: false
            }]
        }).then(
            function(product) {
                response.status(200).send(product)
            }
        )
})

app.post('/products', function(request, response) {
    Products.create(request.body).then(function(product) {
        response.status(201).send(product)
    })
})

app.put('/products/:id', function(request, response) {
    Products.findByPk(request.params.id).then(function(product) {
        if(product) {
            product.update(request.body).then(function(product){
                response.status(201).send(product)
            }).catch(function(error) {
                response.status(200).send(error)
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.delete('/products/:id', function(request, response) {
    Products.findByPk(request.params.id).then(function(product) {
        if(product) {
            product.destroy().then(function(){
                response.status(204).send()
            })
        } else {
            response.status(404).send('Not found')
        }
    })
})

app.get('/specs/:id/products', function(request, response) {
    Products.findAll({
            where:{spec_id: request.params.id},
            
            include: [{
                model: Specs,
                where: { id: Sequelize.col('products.spec_id') }
            }, {
                model: Reviews,
                where: { id: Sequelize.col('products.id')},
                required: false
            }]
        }
            ).then(
            function(products) {
                response.status(200).send(products)
            }
        )
})

app.get('/reviews', function(request, response) {

})

app.get('/reviews/:id', function(request, response) {
    
})

app.post('/reviews', function(request, response) {

})

app.put('/reviews/:id', function(request, response) {
    
})

app.delete('/reviews/:id', function(request, response) {
    
})

app.listen(8080)
