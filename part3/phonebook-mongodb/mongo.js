const mongoose = require('mongoose')

const password = process.argv[2]

const url =
    `mongodb+srv://fullstack:${password}@cluster0-tnvmj.mongodb.net/phonebook?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true })

const contactSchema = new mongoose.Schema({
    name: String,
    number: String
})

const Contact = mongoose.model('Contact', contactSchema)

if (process.argv.length === 3) {
    console.log("phonebook:")
    Contact.find({}).then(result => {
        result.forEach(contact => {
            console.log(`${contact.name} ${contact.number}`)
        })
        mongoose.connection.close()
    })
} else if (process.argv.length === 5) {
    const name = process.argv[3]
    const number = process.argv[4]
    const contact = new Contact({ name, number })

    contact.save().then(response => {
        console.log(`added ${name} number ${number} to phonebook`)
        mongoose.connection.close()
    })
} else {
    console.log("Command doesn't have the correct number of arguments")
    process.exit(1)
}