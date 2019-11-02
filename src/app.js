const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// console.log(__dirname)
// console.log(path.join)
const app = express()
const port = process.env.PORT || 3000

//define paths for express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')


//setup handebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath) 
hbs.registerPartials(partialsPath)


//setup static directory to serve
app.use(express.static(publicDirectoryPath))

app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Mehdi Taheri'
    })
})

app.get('/about', (req,res)=>{
    res.render("about",{
        title:'About us',
        name:'Mehdi Taheri'
    })
})


app.get('/help', (req,res)=>{
    res.render('help',{
        msg: 'How may I help you?',
        title: 'help',
        name: 'Mehdi Taheri'
    })
})

// app.get('/weather', (req,res)=>{

//     if(!req.query.address){
//         return res.send({
//             Error: 'You Must Provide an Address!'
//         })
//     }
//     res.send({
//         forecast: 'It is snowing',
//         location: 'Boston',
//         address: req.query.address
//     })
// })

app.get('/weather', (req,res)=>{

    if(!req.query.address){
        return res.send({
            Error: 'You Must Provide an Address!'
        })
    }

    geocode(req.query.address, (error, {latitude,longitude, location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude, (error,forecastData)=>{
            if(error){
                return res.send ({error})
            }
            
        res.send({
            forecast: forecastData,
            location,
            address: req.query.address
        })
    })
    })
    // res.send({
    //     forecast: 'It is snowing',
    //     location: 'Boston',
    //     address: req.query.address
    // })
})

app.get('/products',(req,res)=>{

    if(!req.query.search){
       return  res.send(
                 {
                     error: "You must provide a place"
                 }
        )
    }
    res.send(
           req.query
    )
    })


app.get('/help/*', (req,res)=>{
    // res.send('Help Page is not found!')
    res.render('404', {
        title:'404',
        name: 'Mehdi Taheri',
        errorMessage:' help article Not found...'
    })

})

app.get('*',(req,res)=>{
    // res.send('My 404 Page')
    res.render('404', {
        title:'404',
        name: 'Mehdi Taheri',
        errorMessage: 'Page Not Found'
    })
})

// app.com
//app.com/help
//app.com/about

// app.get('' , (req, res)=>{
//     res.send('hello express!')
// })

// app.get('', (req,res)=>{
//     res.send('<h1>Hello and welcome to the first page</h1>')
// })

// app.get('/help', (req,res)=>{
//     res.send('Help page')
// })
// const helpPath = path.join(__dirname, '../public/help.html')
// app.use(express.static(helpPath))
// const aboutPath = path.join(__dirname, '../public/about.html')
// app.use(express.static(aboutPath))



// app.get('/help', (req,res)=>{
//     res.send({
//         name: 'about',
//         age: 33,
//         location: 'Boston'
//     })
// })




// app.get('/about',(req,res)=>{
//     res.send('About Page')

// })

// app.get('/about', (req,res)=>{
//     res.send([{
//         name: 'PT',
//         age: 33
//     },{
//         name: 'Mike',
//         age: 35
//     },{
//         name: 'Gelg',
//         age: 27
//     }])
// })


// app.get('/title', (req,res)=>{
//     res.send('Title page')
// })

app.get('/weather', (req,res)=>{
    res.send({
        forecast: 'It is snowing',
        location: 'Boston'
    })
})


app.listen(port, ()=>{
    console.log('Server is Up on port ' + port)
})

