const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR').format(date);
  };

  
const date = new Date();
export const dateNow = formatDate(date)
 