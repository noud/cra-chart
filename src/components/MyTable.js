import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

class MyTable extends React.Component {
  constructor(props) {
    super(props);
    const { data } = this.props;
    this.state = { data };
  }

  componentDidMount() {
  }

  handleChange(value) {
    var { data } = this.state;
    data[parseInt(value.name)] = parseInt(value.value);
    this.setState({data});
  };

  render() {
    const { data: dataValues, labels } = this.props;
  
    return (
      <form>
        <Container>
          {labels.map((value, index) => (
            <Row key={index}>
              <Col sm={2}></Col>
              <Col sm={2}>{labels[index]}</Col>
              <Col sm={4}>
                <input name={index}
                  value={dataValues[index]}
                  onChange={(e) => this.handleChange(e.target)}
                />
              </Col>
            </Row>
          ))}
        </Container>
      </form>
    )
  }
}

export default MyTable;