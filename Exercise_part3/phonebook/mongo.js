const mongoose = require('mongoose')

const password = process.argv[2]

const url =
  `mongodb+srv://fullstack:${password}@cluster0-ojioi.mongodb.net/phone-book?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const phoneBookSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', phoneBookSchema)

const person = new Person({
  name: process.argv[3],
  number: process.argv[4]
})

if (process.argv.length == 3) {
  Person.find({}).then(result => {
    console.log('Phone book:')
    result.forEach(person => {
      console.log(`${person.name} ${person.number}`)
    })
  })
}
else {
  person.save().then(response => {
    console.log(`Added ${response.name} number ${response.number} to phone book`)
    mongoose.connection.close()
  })
}
