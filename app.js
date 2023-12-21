const express = require("express");
const app = express();
const cors = require('cors');
app.use(cors());
app.use(express.json());
app.listen(8080, () => {
    console.log("Server running on port 8080");
});

const categories = [
    {
        id: 1,
        name: 'Cake'
    },
    {
        id: 2,
        name: 'Candy'
    },
    {
        id: 3,
        name: 'Vegetable'
    },
    {
        id: 4,
        name: 'Medicine'
    }
]
const products = [
    {
        id: 1,
        name: 'Bánh mì',
        description: 'Lần đầu tiên trái thanh long có trong bánh mì',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLctr9Ua1-ALXfWsDVTLxK3WGZDn76Ech45___PE4nIw&s',
        price: 4000,
        category: {
            id: 1
        }
    },
    {
        id: 2,
        name: 'Kẹo mút',
        description: 'Ngọt như tình yêu Pink dành cho Trang',
        image: 'https://cdn.tgdd.vn/Files/2023/02/02/1506619/tet-them-vui-voi-cac-loai-keo-mut-trai-cay-chupa-chups-202302020959489948.jpg',
        price: 3000,
        category: {
            id: 2
        }
    },
    {
        id: 3,
        name: 'Hành tươi',
        image: 'https://i.ytimg.com/vi/YJme-JHHMSM/hq720.jpg?sqp=-oaymwEhCK4FEIIDSFryq4qpAxMIARUAAAAAGAElAADIQj0AgKJD&rs=AOn4CLAAtnJQsZnzW3JkkG0G2EUMl7hVuw',
        description: 'Cường hành',
        price: 700,
        category: {
            id: 3
        },
    },
    {
        id: 4,
        name: 'Tỏi sống',
        image: 'https://img.dantocmiennui.vn/t620/uploaddtmn//2017/11/17/toi-chua-xoang-1.jpg',
        description: 'Ngon ngọt',
        price: 900,
        category: {
            id: 3
        },
    },
    {
        id: 5,
        name: 'Berberin',
        description: 'Bạn sẽ cần vào một ngày your shit not solid',
        image: 'https://cdn.tgdd.vn/Files/2021/11/18/1398813/berberin-la-thuoc-gi-nhung-loi-ich-tuyet-voi-cua-berberin-202111181726286516.jpg',
        price: 850,
        category: {
            id: 4
        },
    }
];

app.get("/products", (req, res, next) => {
    let studentsRes = [];
    console.log(req.query)
    let name = req.query.name;
    if(!name) {
        for (let i = 0; i < products.length; i++) {
            for (let j = 0; j < categories.length; j++) {
                if (products[i].category.id === categories[j].id) {
                    let s = {...products[i], category: {...categories[j]}}
                    studentsRes.push(s);
                    break;
                }
            }
        }
    } else {
        for (let i = 0; i < products.length; i++) {
            if(products[i].name.toLocaleLowerCase().includes(name.toLocaleLowerCase())){
                for (let j = 0; j < categories.length; j++) {
                    if (products[i].category.id === categories[j].id) {
                        let s = {...products[i], category: {...categories[j]}}
                        studentsRes.push(s);
                        break;
                    }
                }
            }
        }
    }
    res.json(studentsRes);
});
app.get("/products/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findStudentIndex(id);
    if (index !== -1) {
        for (let i = 0; i < categories.length; i++) {
            if (categories[i].id === products[index].category.id) {
                let s = {...products[index], category: {...categories[i]}}
                res.status(200).json(s);
                return;
            }
        }

    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.post("/products", (req, res, next) => {
    req.body.category.id = +req.body.category.id;
    const newProduct = {
        ...req.body,
        id: new Date().getTime()
    }
    products.push(newProduct);
    res.json(newProduct);
});
app.delete("/products/:id", (req, res, next) => {
    const id = +req.params.id;
    const index = findStudentIndex(id);
    if (index !== -1) {
        products.splice(index, 1);
        res.json({message: 'Deleted', id: id});
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
app.put("/products/:id", (req, res, next) => {
    const id = +req.params.id;
    req.body.category.id = +req.body.category.id;
    const index = findStudentIndex(id);
    if (index !== -1) {
        const product = products[index];
        product.category = req.body.category;
        product.name = req.body.name;
        product.iamge = req.body.image;
        product.description = req.body.description;
        product.price = req.body.price;
        res.json(product);
    } else {
        res.status(404).json({message: 'Not found'});
    }
});
function findStudentIndex(id) {
    for (let i = 0; i < products.length; i++) {
        if (products[i].id === id) {
            return i;
        }
    }
    return -1;
}

app.get("/categories", ((req, res) => {
    res.json(categories);
}));




