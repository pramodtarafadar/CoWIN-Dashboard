import {Component} from 'react'
import Loader from 'react-loader-spinner'
import VaccinationCoverage from '../VaccinationCoverage/index'
import VaccinationByGender from '../VaccinationByGender/index'
import VaccinationByAge from '../VaccinationByAge/index'

import './index.css'

const apiStatusObject = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class CowinDashboard extends Component {
  state = {apiStatus: apiStatusObject.initial, cowinData: {}}

  componentDidMount() {
    this.getCovidVaccinationData()
  }

  getCovidVaccinationData = async () => {
    this.setState({apiStatus: apiStatusObject.inProgress})
    const covidVaccinationDataApiUrl =
      'https://apis.ccbp.in/covid-vaccination-data'
    const response = await fetch(covidVaccinationDataApiUrl)

    if (response.ok) {
      const data = await response.json()
      const formattedData = {
        last7DaysVaccination: data.last_7_days_vaccination.map(eachDay => ({
          dose1: eachDay.dose_1,
          dose2: eachDay.dose_2,
          vaccineDate: eachDay.vaccine_date,
        })),
        vaccinationByAge: data.vaccination_by_age,
        vaccinationByGender: data.vaccination_by_gender,
      }

      this.setState({
        apiStatus: apiStatusObject.success,
        cowinData: formattedData,
      })
    } else {
      this.setState({apiStatus: apiStatusObject.failure})
    }
  }

  renderCavidVaccinationGraphs = () => {
    const {cowinData} = this.state
    const {
      last7DaysVaccination,
      vaccinationByGender,
      vaccinationByAge,
    } = cowinData

    return (
      <>
        <VaccinationCoverage graphData={last7DaysVaccination} />
        <VaccinationByGender graphData={vaccinationByGender} />
        <VaccinationByAge graphData={vaccinationByAge} />
      </>
    )
  }

  renderLoadingView = () => (
    <div className="loading-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height={80} width={80} />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
        className="failure-view-image"
      />
      <h1 className="failure-view-title">Something Went Wrong</h1>
    </div>
  )

  renderSwitch = () => {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusObject.inProgress:
        return this.renderLoadingView()
      case apiStatusObject.success:
        return this.renderCavidVaccinationGraphs()
      case apiStatusObject.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="cowin-dashboard-background">
        <div className="cowin-dashboard-container">
          <div className="logo-container">
            <img
              src="https://assets.ccbp.in/frontend/react-js/cowin-logo.png"
              alt="website logo"
              className="website-logo"
            />
            <h1 className="website-logo-name">Co-WIN</h1>
          </div>
          <h1 className="cowin-vaccination-title">
            COWIN Vaccination in India
          </h1>
          {this.renderSwitch()}
        </div>
      </div>
    )
  }
}

export default CowinDashboard
