import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Legend,
  ResponsiveContainer,
} from 'recharts'

import './index.css'

const VaccinationCoverage = props => {
  const {graphData} = props

  const DataFormatter = number => {
    if (number > 1) {
      return `${(number / 1).toString()}00k`
    }
    return number.toString()
  }

  return (
    <div className="vaccination-graph-container">
      <h1 className="vaccination-graph-title">Vaccination Coverage</h1>
      <BarChart
        width={1000}
        height={300}
        data={graphData}
        margin={{
          top: 5,
        }}
      >
        <XAxis
          dataKey="vaccineDate"
          tick={{
            stroke: 'gray',
            strokeWidth: 1,
          }}
        />
        <YAxis
          tickFormatter={DataFormatter}
          tick={{
            stroke: 'grey',
            strokeWidth: 0,
          }}
        />
        <Legend
          wrapperStyle={{
            padding: 30,
          }}
        />
        <Bar dataKey="dose1" name="Dose 1" fill="#5a8dee" barSize="20%" />
        <Bar dataKey="dose2" name="Dose 2" fill=" #f54394" barSize="20%" />
      </BarChart>
    </div>
  )
}

export default VaccinationCoverage
