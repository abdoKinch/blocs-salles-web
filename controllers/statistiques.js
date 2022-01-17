const Salle = require('../models/salles')
const Occupation = require('../models/occupations')

const getNbrOccupations = async (req, res) => {
  var array = []
  const salles = await Salle.find()
  const occupations = await Occupation.find()
  var k = 0
  for (var i = 0; i < salles.length; i++) {
    for (var j = 0; j < occupations.length; j++) {
      if (salles[i]._id + '' == occupations[j].salle + '') {
        k++
      }
    }
    array.push({ salle: salles[i].nom, nombreoccupations: k })
    k = 0
  }
  res.status(200).send(array)
}
module.exports = { getNbrOccupations }
