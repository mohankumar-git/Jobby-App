import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroups = props => {
  const onChangeEmploymentType = event => {
    const {changeActiveEmploymentType} = props

    changeActiveEmploymentType(event.target.id)
  }

  const renderEmploymentTypesList = employmentType => (
    <li key={employmentType.employmentTypeId} className="filter-type">
      <input
        id={employmentType.employmentTypeId}
        type="checkbox"
        name={employmentType.employmentTypeId}
        onChange={onChangeEmploymentType}
      />
      <label className="filter-label" htmlFor={employmentType.employmentTypeId}>
        {employmentType.label}
      </label>
    </li>
  )

  const renderEmploymentTypes = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Types of Employment</h1>
      <ul className="filter-list">
        {employmentTypesList.map(types => renderEmploymentTypesList(types))}
      </ul>
    </div>
  )

  const onChangeSalaryRange = event => {
    const {changeActiveSalaryRange} = props

    changeActiveSalaryRange(event.target.id)
  }

  const renderSalaryRangesList = salaryRange => (
    <li key={salaryRange.salaryRangeId} className="filter-type">
      <input
        id={salaryRange.salaryRangeId}
        type="radio"
        name="salaryRange"
        onChange={onChangeSalaryRange}
      />
      <label className="filter-label" htmlFor={salaryRange.salaryRangeId}>
        {salaryRange.label}
      </label>
    </li>
  )

  const renderSalaryRange = () => (
    <div className="filter-container">
      <h1 className="filter-heading">Salary Range</h1>
      <ul className="filter-list">
        {salaryRangesList.map(range => renderSalaryRangesList(range))}
      </ul>
    </div>
  )

  return (
    <div className="filters-group-container">
      {renderEmploymentTypes()}
      <hr className="horizontal-line" />
      {renderSalaryRange()}
    </div>
  )
}

export default FilterGroups
