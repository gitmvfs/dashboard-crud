function formatDate(dateString) {
    // Convertendo a string da data para um objeto Date
    const dateObject = new Date(dateString);
  
    // Obtendo os componentes da data
    const year = dateObject.getFullYear();
    const month = String(dateObject.getMonth() + 1).padStart(2, '0'); // adicionando zero à esquerda, se necessário
    const day = String(dateObject.getDate()).padStart(2, '0'); // adicionando zero à esquerda, se necessário
  
    // Formatando a data no padrão "yyyy-mm-dd"
    const formattedDate = `${year}-${month}-${day}`;
  
    return formattedDate;
  }
  
module.exports = formatDate