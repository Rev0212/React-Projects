import { Component } from 'react'
import LanguageFilterItem from '../LanguageFilterItem'
import RepositoryItem from '../RepositoryItem'
import { ThreeDots } from 'react-loader-spinner' // Correct import
import './index.css'

const languageFiltersData = [
  { id: 'ALL', language: 'All' },
  { id: 'JAVASCRIPT', language: 'Javascript' },
  { id: 'RUBY', language: 'Ruby' },
  { id: 'JAVA', language: 'Java' },
  { id: 'CSS', language: 'CSS' },
]

const API_STATUS = {
  success: 'SUCCESS',
  failure: 'FAILURE',
  loading: 'LOADING',
}

class GithubPopularRepos extends Component {
  state = {
    languageList: [],
    apiStatus: API_STATUS.loading,
    selectedLanguage: 'ALL',
  }

  componentDidMount() {
    this.getLanguageList()
  }

  getLanguageList = async () => {
    this.setState({ apiStatus: API_STATUS.loading });
    const { selectedLanguage } = this.state;
    const url = `https://apis.ccbp.in/popular-repos?language=${selectedLanguage}`;
    const options = {
      method: 'GET',
    };
    
    try {
      const response = await fetch(url, options);
      if (response.ok) {
        const data = await response.json();
        const updatedData = data.popular_repos.map(repo => ({
          id: repo.id,
          name: repo.name,
          issuesCount: repo.issues_count,
          forksCount: repo.forks_count,
          starsCount: repo.stars_count,
          avatarUrl: repo.avatar_url,
        }));
        this.setState({
          languageList: updatedData,
          apiStatus: API_STATUS.success,
        });
      } else {
        // If the response is not OK, set failure status
        this.setState({ apiStatus: API_STATUS.failure });
      }
    } catch (error) {
      // Handle network errors and other issues
      console.error('Fetch error:', error); // Log the error
      this.setState({ apiStatus: API_STATUS.failure }); // Set failure status
    }
  }
  

  onClickLanguage = id => {
    this.setState({ selectedLanguage: id }, this.getLanguageList)
  }

  renderLoadingView = () => (
    <div className="loading-view">
      <ThreeDots
        color="#00BFFF" 
        height={80} 
        width={80} 
      />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-view">
      <img
        src="https://assets.ccbp.in/frontend/react-js/api-failure-view.png"
        alt="failure view"
      />
    </div>
  )

  renderSuccessView = () => {
    const { languageList } = this.state
    return (
      <ul className="repository-list">
        {languageList.map(repo => (
          <li key={repo.id} className="repository-item">
            <RepositoryItem {...repo} />
          </li>
        ))}
      </ul>
    )
  }

  renderApiStatusView = () => {
    const { apiStatus } = this.state
    switch (apiStatus) {
      case API_STATUS.success:
        return this.renderSuccessView()
      case API_STATUS.failure:
        return this.renderFailureView()
      case API_STATUS.loading:
        return this.renderLoadingView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="github-popular-repos">
        <h1 className="header">Popular</h1>
        <LanguageFilterItem
          languageFiltersData={languageFiltersData}
          onClickLanguage={this.onClickLanguage}
        />
        {this.renderApiStatusView()}
      </div>
    )
  }
}

export default GithubPopularRepos
