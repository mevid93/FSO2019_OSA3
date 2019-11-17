const mongoose = require('mongoose')

// not enough arguments
if (process.argv.length < 3) {
  console.log('give password as argument')
  process.exit(1)
}

const password = process.argv[2]
const url = `mongodb+srv://fullstack:${password}@cluster0-xuwgh.mongodb.net/phonebook-app?retryWrites=true&w=majority`
mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const personSchema = new mongoose.Schema({
  name: String,
  number: String
})

const Person = mongoose.model('Person', personSchema)

// print database content
if (process.argv.length === 3) {
  console.log('phonebook:')
  Person.find({}).then(result => {
    result.forEach(person => {
      console.log(person.name, person.number)
    })
    mongoose.connection.close()
  })
}

// add person to database
if (process.argv.length === 5) {
  const name = process.argv[3]
  const number = process.argv[4]
  const person = new Person({ name, number })

  person.save().then(response => {
    console.log(`added ${name} number ${number} to phonebook`)
    mongoose.connection.close()
  })
}
