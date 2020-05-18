import { connect } from 'react-redux'
// import { increment, decrement, reset } from './actionCreators'
import { handleChange } from '../redux/actions'

const Labels = [
'Noud',
'Balder',
]

const Datasets = [{
    data: [],
    tableData: [],
    backgroundColor: [
        '#FF6384',
        '#36A2EB',
        free.color
    ],
    hoverBackgroundColor: [
        '#FF6384',
        '#36A2EB',
        free.color
    ]
}]

const mapStateToProps = (state /*, ownProps*/) => {
  return {
    labels: state.labels,
    datasets: state.datasets

  }
}

class handleChange extends React.Component {
  // ... component implementation
}

// const mapDispatchToProps = { increment, decrement, reset }
const mapDispatchToProps = { handleChange }

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Labels, Datasets)