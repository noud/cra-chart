import React from 'react';

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap'

class MyTable extends React.Component {
  componentDidMount() {
  }

  render() {
    const { data: dataValues, labels, onChange: handleChange } = this.props;

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
                  onChange={handleChange}
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