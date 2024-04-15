import { createServer, Model, belongsTo, hasMany } from "miragejs";

//This is a mirage mock of a simple API
// Find more about mirage at:
//    http://miragejs.com/docs/

//To use, call "startMirage()" before running your webpages
export function startMirage() {
  return createServer({
    models: {
      customer: Model.extend({
        adverts: hasMany(),
      }),
      advert: Model.extend({
        customer: belongsTo(),
      }),
      
    },

    routes() {
      this.urlPrefix = 'http://localhost:3000'
      this.namespace = 'http://localhost:3000'

      this.get("/api/customers", (schema, request) => {
        return schema.customers.all()
      })

      this.get("/api/customers/:id", (schema, request) => {
        let customerId = request.params.id
        let customer = schema.customers.find(customerId)

        return customer
      })

      this.get("/api/customers/:id/advertids", (schema, request) => {
        let customerId = request.params.id
        let customer = schema.customers.find(customerId)

        return customer.adverts
      })

      this.get("/api/adverts/:id", (schema, request) => {
        let advertId = request.params.id
        let advert = schema.adverts.find(advertId)

        return advert
      })

      this.get("/api/adverts/bytoken/:token", (schema, request) => {
        let advertToken = request.params.token
        let advert = schema.adverts.findby({token: advertToken})

        return advert
      })

      this.post("/api/customers", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        attrs.id = newId++
	    attrs.adverts = []

        return schema.customers.create(attrs)
      })

      this.post("/api/customers/:id/adverts", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        attrs.id = newId++
        let customerId = request.params.id
        let customer = schema.customers.find(customerId)

        customer.adverts.push(attrs.id)
        customer.update(customer)
        return schema.adverts.create(attrs)
      })

      this.post("/api/customers/:id/advertids/:advertid", (schema, request) => {
        let customerId = request.params.id
        let advertId = request.params.advertid
        let customer = schema.customers.find(customerId)
        let advert = schema.adverts.find(advertId)

        if (advert && !customer.adverts.includes(advertId)) {
          customer.adverts.push(advertId)
          customer.update(customer)
        }
        return advert
      })

      this.post("/api/adverts", (schema, request) => {
        let attrs = JSON.parse(request.requestBody)
        attrs.id = newId++
        
        return schema.adverts.create(attrs)
      })
    }
  })
}

