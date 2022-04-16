import React from 'react'
import { createRoot } from 'react-dom/client'
import SeasonDisplay from './SeasonDisplay'
import Spinner from './Spinner'

class App extends React.Component {
  state = { lat: null, errorMessage: '' }

  componentDidMount () {
    // Use Geolocation API to get the current location
    window.navigator.geolocation.getCurrentPosition(
      position => this.setState({ lat: position.coords.latitude }),
      err => this.setState({ errorMessage: err.message })
    )
  }

  renderContent () {
    if (this.state.errorMessage && !this.state.lat) {
      return (
        <div>
          <strong>Error:</strong> {this.state.errorMessage}
        </div>
      )
    }

    if (!this.state.errorMessage && this.state.lat) {
      return <SeasonDisplay lat={this.state.lat} />
    }

    return <Spinner message='Please accept location request. Loading...' />
  }

  render () {
    return <div>{this.renderContent()}</div>
  }
}

// Render using createRoot
createRoot(document.querySelector('#root')).render(<App />)
