import getRemainer from './getRemainer';

export default function setRemainer(data) {
  const actualData = data.slice(0);
  actualData.pop();
  data[data.length-1] = getRemainer(actualData);
  return data;
};