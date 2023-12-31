import React, { useEffect, useState } from 'react'
import { requestPanel } from '../../services/axios';

const Matches = () => {
    const [panelMatches,setPanelMatches] = useState([]);

    useEffect(() => {
        (async () => {
          const matches = await requestPanel({
            url : "/api/football/matches",
            method : "get"
          });
    
          setPanelMatches(matches?.content);
        })();
      },[])

  return (
    <>
    <div className="page_header">
      <h5>Matches List </h5>
      {/* <button type="button" className="btn btn-primary" id="createbtn">
        Get Tournaments List
      </button> */}
    </div>

    <div className="section">
      <div className="row">
        <div className="col-lg-12">
          <div className="card">
            <div className="card-body">
              <table className="table table-hover table_layout">
                <thead>
                  <tr>
                    <th scope="col">id</th>
                    <th scope="col">DateTime</th>
                    <th scope="col">Round</th>
                    <th scope="col">Home</th>
                    <th scope="col">Away</th>
                    <th scope="col">Status</th>
                    <th scope="col">Mapping</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    panelMatches?.map(l => <tr 
                      // style={{
                      //   backgroundColor : l?.gender === "female" && '#ee82ee'
                      // }}
                    key={l?.id}>
                      <td>{l?.id}</td>
                      <td>{l?.dateTime}</td>
                      <td>{l?.contestRound?.name}</td>
                      <td>{l?.home?.competitor?.name}</td>
                      <td>{l?.away?.competitor?.name}</td>
                      <td>{l?.status}</td>
                      <td>{l?.mapping['flashScore']}</td>
                    </tr>)
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </>
  )
}

export default Matches
