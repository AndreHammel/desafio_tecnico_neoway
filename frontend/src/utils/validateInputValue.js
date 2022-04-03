export default function validateDocNumberWithoutCaracteres(docNumber) {
  if (
    /-|\.|\s|[A-Z]|[a-z]|,|\\|\//g.test(docNumber) ||
    typeof docNumber !== 'string'
  ) {
    return false;
  }
  return true;
}
