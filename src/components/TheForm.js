import React from 'react';

import { connect } from 'react-redux'
import { handleChange } from '../redux/actions'

import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col, Form } from 'react-bootstrap'

const total = {
  label: 'Total'
};

class TheForm extends React.Component {
  render() {
    // const { labels, enriche, state, handleChange } = this.props;

    // total.value = state.datasets[0].tableData.reduce((accumulator, currentValue) => accumulator + currentValue);
    // total.color = total.value > 100 ? 'text-danger' : null;

    return (
      <Container>
        <Col xs={{ span: 10, offset: 3 }}>
          <Form className="Form">
            {labels.map((value, index) => (
              <Form.Group as={Row} className="Form-Group-left" controlId={index} key={index}>
                <Col xs={1}>
                  <Form.Label>{labels[index]}</Form.Label>
                </Col>
                <Col xs={{ span: 3, offset: 1 }}>
                  <Form.Control className="Form-Control-numeric"
                    name={index}
                    type="number"
                    min="0"
                    max="99"
                    value={datasets[0].tableData[index]}
                    onChange={(e) => handleChange(enriche, {labels: labels, datasets: datasets}, e.target)}
                  />
                </Col>
              </Form.Group>
            ))}
            <Form.Group as={Row} className="Form-Group-left" controlId={labels.length+1}>
              <Col xs={1} sm={1} md={1}>
                <Form.Label>{total.label}</Form.Label>
              </Col>
              <Col xs={{ span: 3, offset: 1 }}>
                <Form.Control className={(total.value > 100 ? 'text-danger' : null) + " Form-Control-numeric" }
                  name={"total"}
                  disabled
                  type="number"
                  value={datasets[0].tableData.reduce((accumulator, currentValue) => accumulator + currentValue)}
                />
              </Col>
            </Form.Group>
          </Form>
        </Col>
      </Container>
    );
  }
}

const mapStateToProps = (state /*, ownProps*/) => {
  // ... computed data from state and optionally ownProps
  return {
    labels: state.labels,
    datasets: state.datasets
  }
}

const mapDispatchToProps = {
  // ... normally is an object full of action creators
  handleChange
}

// `connect` returns a new function that accepts the component to wrap:
const connectToStore = connect(
  mapStateToProps,
  mapDispatchToProps
)
// and that function returns the connected, wrapper component:
const ConnectedComponent = connectToStore(Component)

// We normally do both in one step, like this:
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(TheForm);