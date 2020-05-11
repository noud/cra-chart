export default function getRemainer(values) {
  var total = 0;
  values.map((value) => (
    total += value
  ));
  let rest = 100 - total;
  return rest > 0 ? rest : 0;
};