import React from "react";

const Season = () => {
  return (
    <>
      <div className="page_header">
        <h5>Seasons List </h5>
        <button type="button" className="btn btn-primary" id="createbtn">
          Get Seasons List
        </button>
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
                  {/* @foreach (var c in Model)
                        {
                            <tr>
                                <th scope="row">@c.id</th>
                                <td>@c.name</td>
                                <td>
                                    @{
                                        if (c?.mapping?.TryGetValue("flashScore", out string contestproviderId) ?? false)
                                        {
                                            <text>@contestproviderId</text>
                                        }
                                    }
                                </td>
                            </tr>
                        } */}
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
