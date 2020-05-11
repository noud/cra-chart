import React from 'react';

import getRemainer from '../lib/getRemainer';

class MyTable extends React.Component {
  constructor(props) {
    super(props);
  }

  componentWillMount() {
  }

  componentDidMount() {
  }

  setValue = (value) => {
    console.log(value.name, value.value);
  };

  render() {
    var { data: dataValues, labels } = this.props;
    dataValues.push(getRemainer(dataValues));

    return (
      <form>
        <label for="member1">{labels[0]}</label>
        <input name='member1'
          value={dataValues[0]}
          onChange={(e) => this.setValue(e.target)}
        />
        <br />
        <label for="member2">{labels[1]}</label>
        <input name='member2'
          value={dataValues[1]}
          onChange={(e) => this.setValue(e.target)}
        />
      </form>
    )
  }
}

export default MyTable;
