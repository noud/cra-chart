// redux/actions.js
import { HANDLE_CHANGE } from './actionTypes'

export const handleChange = content => ({
  type: HANDLE_CHANGE,
  payload: {
    labels,
    datasets
  }
})

// ... other actions