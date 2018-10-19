export const onlyNumeric = (input) => {

  const clean = input.replace(/\D/g,'');
    console.log(clean)
  return clean;
};
