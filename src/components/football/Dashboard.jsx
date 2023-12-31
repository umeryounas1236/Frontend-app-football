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
import { isEmpty, orderBy } from "lodash";
import { requestPanel } from "../../services/axios";

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
          data.map((p) => ({
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
      document.querySelector(`.contest-participants[data-name="${c?.name}"]`).style.backgroundColor = '#84c61d';
    }
  };

  const addRounds = async () => {

    const rounds = flashData?.rounds?.map((r) => ({
      name: r?.name,
      mapping : {
        flashScore : r?.name
      },
      contestGroup: {
        id: currentContest?.id,
      }
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

  const AddFixtures = async () => {
    const matches = flashData?.fixtures?.map(m => ({
      mapping : {
        flashScore : m?.id?.replace('','')
      },
      dateTime : "",
      status : "",
      home : {
        competitor : {
          id : ''
        }
      },
      away : {
        competitor : {
          id : ""
        }
      },
      contestGroup : {
        id : currentContest?.id
      },
      contestRound : { 
        id : ""
      }
    }));
  }
  const GetContestDetailFromFlash = async () => {
    const resp = await GetDetailsFromFlash(selectedTournament?.value);
    setFlashData(resp);

    const seasonId = seasons?.find((s) => s?.name === resp?.season)?.id || 0;
    const tournamentId = selectedTournament?.value?.id
    
    const contestbyseasonandtournament = await requestPanel({
      url : `/api/football/contest-groups?tournamentId=${tournamentId}&seasonId=${seasonId}`,
      method : "get"
    });

    debugger;

    if(contestbyseasonandtournament?.content?.length){
      let tempContest = contestbyseasonandtournament?.content?.[0];

      resp.rounds = resp.rounds.map(r => {
        let temp = tempContest?.contestRounds?.find(r => r.mapping?.flashScore === r?.name);
        if(isEmpty(temp)){
          return r;
        }
        else {
          return {...r, isCreated : true}
        }
      });

      resp.participants = resp.participants?.map(p => {
        const isaAdded = tempContest?.contestParticipants?.find(c => c.competitor?.mapping?.flashScore === p?.mapping?.flashScore);
        if(isEmpty(isaAdded)){
          return p;
        }
        else{
          return {...p, isAdded : true}
        }
      });
      setCurrentContest(tempContest)
    }

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
                    <tr
                    style={{
                      backgroundColor : !isEmpty(currentContest) && '#84c61d'
                    }}
                    >
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
                      <th scope="col">Is Added {!isEmpty(currentContest) && `(${currentContest?.name})`}</th>
                      <th scope="col">logo</th>
                    </tr>
                  </thead>
                  <tbody>
                    {flashData?.participants?.map((p) => (
                      <tr className={`contest-participants`} 
                      style={{
                        backgroundColor : p?.isCreated && '#84c61d'
                      }}
                      data-name={p?.name} key={p?.name}>
                        <td>{p?.mapping?.flashScore}</td>
                        <td>{p?.name}</td>
                        <td>{p?.isAdded}</td>
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
                      <tr key={p?.name}
                      style={{
                        backgroundColor : p?.isCreated && '#84c61d'
                      }}>
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
                      // onClick={() => AddResults()}
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
                       onClick={() => AddFixtures()}
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
