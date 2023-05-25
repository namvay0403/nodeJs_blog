const path = require('path');
const express = require('express');
const morgan = require('morgan');
const handlebars = require('express-handlebars');
const methodOverride = require('method-override')

const app = express();
const port = 3000;

const route = require('./routes');

const db = require('./config/db');
const { helpers } = require('handlebars');

const SortMiddleware = require('./app/middlewares/SortMiddleware');

db.connect();

app.use(express.static(path.join(__dirname, 'public')));

// Custom middleware
app.use(SortMiddleware);

app.use(
    express.urlencoded({
        extended: true,
    }),
); // middleWare xử lý dữ liệu từ html
app.use(express.json()); // middleWare xử lý dữ liệu gửi từ các file ngoài html như là: json, javascript...

app.use(morgan('combined'));

app.use(methodOverride('_method'));

app.engine('handlebars', handlebars.engine({
    helpers: {
        sum(a, b) { return a + b },
        sortable: (field, sort) => {
            const sortType = field === sort.column ? sort.type : 'default';

            const icons = {
                default: 'bi bi-filter',
                asc: 'bi bi-sort-down-alt',
                desc: 'bi bi-sort-down'
            }
            const types = {
                default: 'desc',
                asc: 'desc',
                desc: 'asc'
            }
            const icon = icons[sortType];
            const type = types[sortType];
            return `<a href="?_sort&column=${field}&type=${type}">
            <i class="${icon}"></i>
          </a>`
        }
    }
}));


app.set('view engine', 'handlebars');
app.set('views', path.join(__dirname, 'resources/views'));

route(app);

app.listen(port, () => {
    console.log(`App listening on port http://localhost:${port}`);
});
