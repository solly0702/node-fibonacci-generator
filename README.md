# node-fib-sequence-generator

### Objective

```
- This is simple RESTful Web serivce with node-express.
- API(/api/fib-gen) accepts a number, N and returns N length of Fibonacci sequence
- {"fib_sequence":"5"} => {"payload":["0", "1", "1", "2", "3"]}
```

### Deployment

```
-> cd node_fib_gen_api
-> docker build -t fib_gen:1.0.0-alpine .
-> docker-compose up -d
```

### Test

```
-> yarn install
-> yarn test
```

#### api provide GET and POST method

```
-> api GET entry: localhost:5005/api/fib-gen?fib_sequence={param}
-> api POST entry: localhost:5005/api/fib-gen
-> api POST field: fib_sequence
```

#### Deactive Server and Remove Container

```
-> docker-compose kill
-> docker-compose rm
```

#### Requirement

*   node 8.9.4
*   docker
