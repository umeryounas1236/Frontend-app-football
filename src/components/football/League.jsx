import React, { useEffect, useState } from "react";
import { GetTournamentsFromPanel, UpdateTournament } from "./helper";

const League = () => {

  const [panelLeagues,setPanelLeagues] = useState([]);

  useEffect(() => {
    (async () => {
      const tournaments = await GetTournamentsFromPanel();

      debugger;
      setPanelLeagues(tournaments);
    })();
  },[])

  const ChangeGender = async (t,value) => {
    t.gender = value;
    const update = await UpdateTournament(t);
    const tournaments = await GetTournamentsFromPanel();
    setPanelLeagues(tournaments);
    console.log(update)
  }

  return (
    <>
      <div className="page_header">
        <h5>Tournaments List </h5>
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
                      <th scope="col">mapping</th>
                      <th scope="col">actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      panelLeagues?.map(l => <tr 
                        style={{
                          backgroundColor : l?.gender === "female" && '#ee82ee'
                        }}
                      key={l?.id}>
                        <td>{l?.id}</td>
                        <td>{l?.name}</td>
                        <td>{l?.country?.name}</td>
                        <td>{l?.gender}</td>
                        <td>{l?.mapping['flashScore']}</td>
                        <td>
                          <button type="button" 
                          style={{
                            padding : '5px 5px 5px 5px',
                            marginRight : '5px'
                          }}
                          className="btn btn-primary btn-sm" 
                          onClick={() => ChangeGender(l,"female")}>
                            Set Female
                          </button>
                          <button type="button" 
                          style={{
                            padding : '5px 5px 5px 5px'
                          }}
                          className="btn btn-primary btn-sm" 
                          onClick={() => ChangeGender(l,"male")}>
                            Set Male
                          </button>
                        </td>
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
  );
};

export default League;
