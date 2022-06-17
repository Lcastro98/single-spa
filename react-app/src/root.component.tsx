import { useEffect, useState } from "react";

export default function Root(props) {

  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(`https://api.covidtracking.com/v1/us/daily.json`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(
            `This is an HTTP error: The status is ${response.status}`
          );
        }
        return response.json();
      })
      .then((actualData) => {
        setData(actualData);

      })
  }, []);

  return (
    <div className="App">
      <br></br>
      <br></br>
      <h1>Daily US Covid Data</h1>

      <table>
        <thead>
          <tr>
          <td>Date</td>
            <td>Positive</td>
            <td>Negative</td>
            <td>Death</td>
            <td>Number of States</td>
          </tr>
        </thead>
        {data &&
          data.map((data) => (
            <tbody key={data.hash}>
              <tr>
              <td>{data.dateChecked}</td>
              <td>{data.positive}</td>
              <td>{data.negative}</td>
              <td>{data.death}</td>
              <td>{data.states}</td>
              </tr>
            </tbody>
            
          ))}
  </table>
    </div>
  );
}
