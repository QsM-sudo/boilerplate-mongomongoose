require('dotenv').config();
const mongoose = require('mongoose');
const Person =require('./config/db')

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const createAndSavePerson = (done) => {
  const newPersone = new Person({
   name:'qasim',
   age:'25',
   favortieFoods:['pizza', 'Biryan']
  });
  newPersone.save((err,data) =>{
   if(err) return done(err);
   return done(null,data)
  })
};

const createManyPeople = (arrayOfPeople, done) => {
   Person.create(arrayOfPeople, function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};

const findPeopleByName = (personName, done) => {
  Person.find({ name: personName }, function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};

const findOneByFood = (food, done) => {
 Person.findOne({ favoriteFoods: food }, function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};

const findPersonById = (personId, done) => {
  Person.findById(personId, function(err, data) {
    if (err) return done(err);
    return done(null, data);
  });
};

const findEditThenSave = (personId, done) => {
  const foodToAdd = "hamburger";

   Person.findById(personId, function(err, person) {
    if (err) return done(err);
    if (!person) return done(new Error("Person not found"));

    person.favoriteFoods.push(foodToAdd); // ✅ Add food to array

    person.save(function(err, updatedPerson) {
      if (err) return done(err);
      return done(null, updatedPerson); // ✅ Return updated document
    });
  });
};

const findAndUpdate = (personName, done) => {
  const ageToSet = 20;

   Person.findOneAndUpdate(
    { name: personName },           // Search condition
    { age: ageToSet },              // Update
    { new: true },                  // Return updated doc
    function(err, updatedPerson) {  // Callback
      if (err) return done(err);
      return done(null, updatedPerson);
    }
  );
};

const removeById = (personId, done) => {
  Person.findByIdAndRemove(personId, function(err, removedPerson) {
    if (err) return done(err);
    return done(null, removedPerson);
  });
};

const removeManyPeople = (done) => {
  const nameToRemove = "Mary";

  Person.remove({ name: nameToRemove }, function(err, result) {
    if (err) return done(err);
    return done(null, result);
  });
};

const queryChain = (done) => {
  const foodToSearch = "burrito";

  done(null /*, data*/);
};

/** **Well Done !!**
/* You completed these challenges, let's go celebrate !
 */

//----- **DO NOT EDIT BELOW THIS LINE** ----------------------------------

exports.PersonModel = Person;
exports.createAndSavePerson = createAndSavePerson;
exports.findPeopleByName = findPeopleByName;
exports.findOneByFood = findOneByFood;
exports.findPersonById = findPersonById;
exports.findEditThenSave = findEditThenSave;
exports.findAndUpdate = findAndUpdate;
exports.createManyPeople = createManyPeople;
exports.removeById = removeById;
exports.removeManyPeople = removeManyPeople;
exports.queryChain = queryChain;
