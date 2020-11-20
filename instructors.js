// fs permite que você captura seus dados e armazene-os em outro arquivo 
const fs = require('fs');
const data = require('./data.json');
const {age} = require('./utils');

exports.show = function (req, res){
  const {id} = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id
  })

  if(!foundInstructor) return res.send('Instructor not found');

  const instructor = {
    ...foundInstructor,
    age: age(foundInstructor.birth),
    services: foundInstructor.services.split(','),
}

  return res.render('instructors/show', { instructor });
}

exports.post = function(req, res){

  // Criando um objeto "array" com os dados trazidos do formulário 
  const keys = Object.keys(req.body)
  
  console.log(keys)
  for(key of keys) { 
    if(req.body[key] == "") {
      return res.send('Please, fill all fields')
    }
  }

  let { avatar_url, birth, name, gender, services} = req.body
  
  // Criando a data 
  birth = Date.parse(req.body.birth)
  
  // Criando a data de criação antes de inserir arquivos no data
  const created_at = (new Date).toLocaleString().substr(11, 8) 
  
  // Criando o id
  const id = Number(data.instructors.length + 1)
  
  data.instructors.push({
    id,
    avatar_url,
    name,
    birth,
    created_at,
    gender,
    services,
  })
  
  // Transformando objeto normal em JSON e escrevendo "adicionando" no arquivo data.json
  fs.writeFile("data.json", JSON.stringify(data, null, 2), function(err) {
    if(err) return res.send("Write file error")

    return res.redirect("instructors")
  })
}

exports.edit = function (req, res){
  const {id} = req.params;

  const foundInstructor = data.instructors.find(function (instructor) {
    return instructor.id == id
  })

  if(!foundInstructor) return res.send('Instructor not found');
  return res.render('instructors/edit', { instructor: foundInstructor })
}