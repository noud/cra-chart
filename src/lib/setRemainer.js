import getRemainer from './getRemainer';

export default function setRemainer(data) {
  const actualData = data.slice(0);
  console.log('setRemainer 1',actualData)
  actualData.pop();
  console.log('setRemainer 2',actualData)
  data[data.length - 1] = getRemainer(actualData);
  return data;
};