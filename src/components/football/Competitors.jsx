import React, { useEffect, useState } from 'react'
import { requestPanel } from '../../services/axios';

const Competitors = () => {

    const [panelCompetitors,setPanelCompetitors] = useState([]);

    useEffect(() => {
        (async () => {
          const competitors = await requestPanel({
            url : "/api/football/competitors",
            method : "get"
          });
    
    
          debugger;
          setPanelCompetitors(competitors?.content);
        })();
      },[])

  return (
    <>
    <div className="page_header">
      <h5>Competitors List </h5>
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
                    <th scope="col">Country</th>
                    <th scope="col">Gender</th>
                    <th scope="col">Type</th>
                    <th scope="col">Mapping</th>
                  </tr>
                </thead>
                <tbody>
                  {
                    panelCompetitors?.map(l => <tr 
                      // style={{
                      //   backgroundColor : l?.gender === "female" && '#ee82ee'
                      // }}
                    key={l?.id}>
                      <td>{l?.id}</td>
                      <td>{l?.name}</td>
                      <td>{l?.country?.name}</td>
                      <td>{l?.gender}</td>
                      <td>{l?.type}</td>
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

export default Competitors
