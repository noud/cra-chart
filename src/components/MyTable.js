import React from 'react';

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
  
    return (
      <form>
        {labels.map((value, index) => (
          <div>
            <label for={index}>{labels[index]}</label>
            <input name={index}
              value={dataValues[index]}
              onChange={(e) => this.setValue(e.target)}
            />
            <br />
        </div>
        ))}
      </form>
    )
  }
}

export default MyTable;
