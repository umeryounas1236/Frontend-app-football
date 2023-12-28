import React, { useEffect, useState } from "react";
import Select from "react-select";
import {
  GetCountriesFromPanel,
  GetDetailsFromFlash,
  GetSeasonsFromPanel,
  GetTournamentsFromPanel,
  createCompetitors,
  createContestGroupinPanel,
  createRounds,
  postcontestparticipants,
} from "./helper";
import { orderBy } from "lodash";
import axios from "axios";

const Dashboard = () => {
  const [tournaments, setTournaments] = useState([]);
  const [countries, setCountries] = useState([]);
  const [seasons, setSeasons] = useState([]);

  const [selectedTournament, setSelectedTournament] = useState({});
  const [isLeague, setIsLeague] = useState(true);
  const [isMale, setIsMale] = useState(true);
  const [flashData, setFlashData] = useState({});
  const [currentContest, setCurrentContest] = useState({});

  useEffect(() => {
    (async () => {
      const data = await GetTournamentsFromPanel();
      setTournaments(
        orderBy(
          data.content.map((p) => ({
            label: `${p?.name} (${p?.country?.name})`,
            value: p,
          })),
          "label"
        )
      );

      const temp = await GetCountriesFromPanel();
      setCountries(temp);

      const tempseasons = await GetSeasonsFromPanel();
      setSeasons(tempseasons);
    })();
  }, []);

  const CreateContest = async () => {
    debugger;
    const obj = {
      name: flashData?.name,
      season: {
        id: seasons?.find((s) => s?.name === flashData?.season)?.id,
      },
      tournament: {
        id: selectedTournament?.value?.id,
      },
      system: isLeague ? "league" : "cup",
      mapping: {
        ...flashData?.mapping,
      },
    };

    const resp = await createContestGroupinPanel(obj);
    setCurrentContest(resp);
  };

  const AddCompetitors = async () => {
    debugger;

    const competitors = flashData?.participants?.map((c) => ({
      name: c?.name,
      country: {
        id: countries?.find((country) => country?.name === flashData?.country)
          ?.id,
      },
      gender: isMale ? "male" : "female",
      type: isLeague ? "club" : "national",
      mapping: {
        ...c?.mapping,
      },
    }));

    const resp = await createCompetitors(competitors);

    for (const c of resp) {
      document.querySelector(`.contest-participants[data-name="${c?.name}"]`)?.setAttribute('panelid',c?.id);
    }
    console.log(resp);
  };

  const addRounds = async () => {
    debugger
    const rounds = flashData?.rounds?.map((r) => ({
      name: r?.name,
      mapping : {
        flashScore : r?.name
      },
      contestGroup: {
        id: currentContest?.id,
      },
    }));

    const resp = await createRounds(rounds);
    console.log(resp);
  };

  const addParticipants = async () => {
    debugger;
    let participants = [];

    document.querySelectorAll(`.contest-participants`)?.forEach((p) => {
      const id = p?.getAttribute("panelid");
      participants.push({
        contestGroup: {
          id: currentContest?.id,
        },
        competitor : {
          id : id
        }
      });
    });

    const resp = await postcontestparticipants(participants);
    console.log(resp)
  }

  const GetContestDetailFromFlash = async () => {
    const resp = await GetDetailsFromFlash(selectedTournament?.value);
    setFlashData(resp);
    console.log(resp);
  };
  return (
    <>
      <div className="pagetitle">
        <h1>Football Dashboard </h1>
      </div>

      <section className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">
                  Get Selected Tournament Detail From FlashScore
                </h5>

                <form>
                  <div className="row mb-3">
                    <label
                      htmlFor="inputText"
                      className="col-sm-2 col-form-label"
                    >
                      Tournaments
                    </label>
                    <div className="col-sm-6">
                      <Select
                        options={tournaments}
                        onChange={(op) => setSelectedTournament(op)}
                      />
                    </div>
                    <div className="col-sm-2 league_optioncontainer">
                      <input
                        type="checkbox"
                        checked={isLeague}
                        onChange={(e) => setIsLeague(e.target.checked)}
                      />
                      <label className="mar15">Is League</label>
                      <input
                        type="checkbox"
                        checked={isMale}
                        onChange={(e) => setIsMale(e.target.checked)}
                      />
                      <label>Is Male</label>
                    </div>
                    <div className="col-sm-2">
                      <button
                        type="button"
                        className="btn btn-secondary btnmr"
                        onClick={() => GetContestDetailFromFlash()}
                      >
                        Search
                      </button>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <h5 className="card-title">Contest Detail</h5>
                  </div>
                  <div className="col-lg-6 buttoncontainer">
                    <button
                      type="button"
                      className="btn btn-secondary btnmr"
                      id="addcontest"
                      onClick={() => CreateContest()}
                    >
                      Add Contest
                    </button>
                  </div>
                </div>

                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Name</th>
                      <th scope="col">season</th>
                      <th scope="col">country</th>
                      <th scope="col">mapping</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <th scope="row"></th>
                      <td>{flashData?.name}</td>
                      <td>{flashData?.season}</td>
                      <td>{flashData?.country}</td>
                      <td>{flashData?.mapping?.flashScore}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <h5 className="card-title">Contest Participants</h5>
                  </div>
                  <div className="col-lg-6 buttoncontainer">
                    <button
                      type="button"
                      className="btn btn-secondary btnmr"
                      id="addcontest"
                      onClick={() => AddCompetitors()}
                    >
                      Add Competitors
                    </button>
                    <button
                      type="button"
                      className="btn btn-secondary btnmr"
                      id="addcontest"
                      onClick={() => addParticipants()}
                    >
                      Add Participants
                    </button>
                  </div>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Provider ID</th>
                      <th scope="col">Name</th>
                      <th scope="col">logo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flashData?.participants?.map((p) => (
                      <tr className={`contest-participants`} data-name={p?.name} key={p?.name}>
                        <td>{p?.mapping?.flashScore}</td>
                        <td>{p?.name}</td>
                        <td>
                          <img src={p?.img} alt={p?.name} />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <h5 className="card-title">Contest Rounds</h5>
                  </div>
                  <div className="col-lg-6 buttoncontainer">
                    <button
                      type="button"
                      className="btn btn-secondary btnmr"
                      id="addcontest"
                      onClick={() => addRounds()}
                    >
                      Add Rounds
                    </button>
                  </div>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">mapping</th>
                      <th scope="col">Name</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flashData?.rounds?.map((p) => (
                      <tr key={p?.name}>
                        <td>{p?.name}</td>
                        <td>{p?.name}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <h5 className="card-title">Contest Results</h5>
                  </div>
                  <div className="col-lg-6 buttoncontainer">
                    <button
                      type="button"
                      className="btn btn-secondary btnmr"
                      id="addcontest"
                    >
                      Add Results
                    </button>
                  </div>
                </div>

                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Provider ID</th>
                      <th scope="col">Match Date</th>
                      <th scope="col">Home Team</th>
                      <th scope="col">Away Team</th>
                      <th scope="col">Round</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flashData?.results?.map((r) => (
                      <tr key={r?.mapping?.flashScore}>
                        <td>{r?.mapping?.flashScore}</td>
                        <td>{r?.matchDate}</td>
                        <td>{r?.homeTeam}</td>
                        <td>{r?.awayTeam}</td>
                        <td>{r?.round}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="section">
        <div className="row">
          <div className="col-lg-12">
            <div className="card">
              <div className="card-body">
                <div className="row">
                  <div className="col-lg-6">
                    <h5 className="card-title">Contest Fixtures</h5>
                  </div>
                  <div className="col-lg-6 buttoncontainer">
                    <button
                      type="button"
                      className="btn btn-secondary btnmr"
                      id="addcontest"
                    >
                      Add Fixtures
                    </button>
                  </div>
                </div>
                <table className="table table-hover">
                  <thead>
                    <tr>
                      <th scope="col">Provider ID</th>
                      <th scope="col">Match Date</th>
                      <th scope="col">Home Team</th>
                      <th scope="col">Away Team</th>
                      <th scope="col">Round</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flashData?.fixtures?.map((r) => (
                      <tr key={r?.mapping?.flashScore}>
                        <td>{r?.mapping?.flashScore}</td>
                        <td>{r?.matchDate}</td>
                        <td>{r?.homeTeam}</td>
                        <td>{r?.awayTeam}</td>
                        <td>{r?.round}</td>
                      </tr>
                    ))}
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

export default Dashboard;
