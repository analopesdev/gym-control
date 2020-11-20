module.exports = {
  age: function(timestamp){
    // Data atual
     const today = new Date()
  
    //  Data de aniversário
     const birthDate = new Date(timestamp)
  
    //  Pegando o ano atual - o ano de nascimento
     let age = today.getFullYear() - birthDate.getFullYear()
     
    //  Verificando se o mes atual - o mes de aniversário 
     const month = today.getMonth() - birthDate.getMonth()
     
    // Pegando o dia do mes da data atual
    // today.getDate()
  
    // pegando o dia do mes da data de aniversário
    // birthDate.getDate()
  
     if(month < 0 || month == 0 && today.getDate() < birthDate.getDate()){
       age = age - 1
     }
  
     return age;
  }
}




