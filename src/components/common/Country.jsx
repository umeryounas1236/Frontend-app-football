import React, { useEffect, useState } from "react";
import { GetCountriesFromPanel } from "../football/helper";

const Country = () => {

  const [panelCountries,setPanelCountries] = useState([]);

  useEffect(() => {
    (async () => {
      const countries = await GetCountriesFromPanel();
      setPanelCountries(countries);
    })();
  },[])

  return (
    <>
      <div className="page_header">
        <h5>Countries List </h5>
        {/* <button type="button" disabled onClick={() => GetCountriesFromFlash()} className="btn btn-primary" id="createbtn">
          Get Countries List
        </button> */}
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
                      panelCountries.map(c => <tr key={c.name}>
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

export default Country;
