import React, { useEffect, useState } from 'react'
import { requestPanel } from '../../services/axios';

const ContestGroup = () => {

    const [panelContests,setPanelContests] = useState([]);

  useEffect(() => {
    (async () => {
      const contests = await requestPanel({
        url : "/api/football/contest-groups",
        method : "get"
      });


      debugger;
      setPanelContests(contests?.content);
    })();
  },[])

  return (
    <>
    <div className="page_header">
      <h5>ContestGroups List </h5>
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
                    <th scope="col">Name</th>
                    <th scope="col">Tournament</th>
                    <th scope="col">Season</th>
                    <th scope="col">Mapping</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    panelContests?.map(l => <tr 
                      // style={{
                      //   backgroundColor : l?.gender === "female" && '#ee82ee'
                      // }}
                    key={l?.id}>
                      <td>{l?.id}</td>
                      <td>{l?.name}</td>
                      <td>{l?.tournament?.name}</td>
                      <td>{l?.season?.name}</td>
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

export default ContestGroup
