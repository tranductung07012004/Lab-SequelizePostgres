const express = require('express');
const app = express();
const port = 3000;
const expressHbs = require('express-handlebars');
const {createPagination} = require('express-handlebars-paginate');


//cau hinh thu muc web tinh

app.use(express.static(__dirname + '/html'));
app.engine('hbs', 
           expressHbs.engine({
            layoutsDir: __dirname + '/views/layouts',
            partialsDir: __dirname + '/views/partials',
            extname: 'hbs',
            defaultLayout: 'layout', 
            runtimeOptions: {
              allowProtoPropertiesByDefault: true,
            },
            helpers: {
              createPagination,
              formatDate: (date) => {
                return new Date(date).toLocaleDateString('en-US', {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                });
              },
            },
           })
);

app.set('view engine', 'hbs');
//routes
// index: /, /blogs
// details: /blog/:id
app.get('/', (req, res) => {res.redirect('/blogs');});
app.use('/blogs', require('./routes/blogRouter'));


app.listen(port, () => console.log(`Emxample app listening on port ${port}!`));