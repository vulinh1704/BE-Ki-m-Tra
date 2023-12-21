# Install dependencies

```$ npm install```

# Running server

```$ npm start```

- The server listens at port 8080

# APIs

#### Student model

    {
        id: 1,
        name: 'Bánh mì',
        description: 'Lần đầu tiên trái thanh long có trong bánh mì',
        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSLctr9Ua1-ALXfWsDVTLxK3WGZDn76Ech45___PE4nIw&s',
        price: 4000,
        category: {
            id: 1,
            name: 'Cake'
        }
    }

#### Getting all products (Có name thì là tìm kiếm theo tên gần đúng)
```GET http://localhost:8080/products```
```GET http://localhost:8080/products?name=B```

#### Getting a product by id
```GET http://localhost:8080/products/1```

#### Creating a product
```POST http://localhost:8080/products```

#### Deleting a product by id
```DELETE http://localhost:8080/products/1```

#### Updating a product by id
```PUT http://localhost:8080/products/1```

#### Getting all categories 
```GET http://localhost:8080/categories```