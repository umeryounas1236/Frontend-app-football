import React, { useEffect, useState } from "react";
import { GetSeasonsFromPanel } from "../football/helper";

const Season = () => {

  const [panelSeasons,setPanelSeasons] = useState([]);

  useEffect(() => {
    (async () => {
      const seasons = await GetSeasonsFromPanel();
      setPanelSeasons(seasons);
    })();
  },[])

  return (
    <>
      <div className="page_header">
        <h5>Seasons List </h5>
      </div>

      <div className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <table className="table table-hover">
                <thead>
                    <tr>
                      <th scope="col">id</th>
                      <th scope="col">Name</th>
                      <th scope="col">mapping</th>
                    </tr>
                  </thead>
                  <tbody>
                    {
                      panelSeasons.map(c => <tr key={c.name}>
                        <td>{c?.id}</td>
                        <td>{c?.name}</td>
                        <td>{c?.mapping?.flashScore}</td>
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

export default Season;
