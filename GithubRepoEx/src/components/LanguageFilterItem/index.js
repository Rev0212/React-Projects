import './index.css'

const LanguageFilterItem = ({languageFiltersData, onClickLanguage}) => (
  <div>
    {languageFiltersData.map(eachItem => (
      <button
        type="button"
        key={eachItem.id}
        onClick={() => onClickLanguage(eachItem.id)}
        className="language-button"
        aria-label={`Filter by ${eachItem.language}`}
      >
        {eachItem.language}
      </button>
    ))}
  </div>
)

export default LanguageFilterItem
