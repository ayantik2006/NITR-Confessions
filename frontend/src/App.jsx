import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useEffect, useState } from "react";
import { Heart, MessageCircle, SmilePlus } from "lucide-react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";
import Login from "./components/Login";

function App() {
  const [open, setOpen] = useState(false);
  const [confessionAddedOpen, setConfessionAddedOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [confessions, setConfessions] = useState([]);
  const [isOldest, setIsOldest] = useState(false);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    fetch(import.meta.env.VITE_BACKEND_URL + "/auth/user", {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.msg === "logged out") setIsLoggedIn(false);
        else {
          setIsLoggedIn(true);
          fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
            method: "POST",
            credentials: "include",
            headers: { "Content-Type": "application/json" },
          })
            .then((res) => res.json())
            .then((res) => {
              setUserData(res.userData);

              res.confessions.forEach((confession) => {
                confession.time = new Date().getTime() / 1000 - confession.time;
              });
              setConfessions(res.confessions.reverse());
            })
            .catch((err) => {
              console.log(err);
            });
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  if (isLoggedIn)
    return (
      <div className="min-h-screen w- bg-[#1b1f23] flex flex-col items-center">
        <Snackbar
          open={confessionAddedOpen}
          autoHideDuration={4000}
          onClose={() => {
            setConfessionAddedOpen(false);
          }}
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        >
          <Alert
            onClose={() => {
              setConfessionAddedOpen(false);
            }}
            severity="success"
            variant="standard"
            sx={{ width: "100%" }}
          >
            Your confession is now public!
          </Alert>
        </Snackbar>
        <nav className="w-full h-[5.5rem] bg-[#252a30] border-b-gray-600 border-1 flex gap-3 items-center justify-center">
          <div className="w-[4.5rem] h-[4.5rem] flex items-center justify-center bg-gray-500 rounded-[1rem] ml-5">
            <img
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEbs6--dxw9FBUMzte0H4J9hH46_VsnRPANg&s"
              className="rounded-[1rem] w-[4.2rem] h-[4.2rem]"
            />
          </div>
          <div className="flex flex-col">
            <h1
              className="font-barrio text-white text-[1.5rem] font-bold"
              id="nav-main-heading"
            >
              {/* National Institute of Technology, Rourkela */}NIT R
              Confessions
            </h1>
            <h2 className="text-gray-200 font-semibold" id="tagline">
              Boldo Mann ki Baat 😉
            </h2>
          </div>
        </nav>

        <button
          className="w-[18rem]  m-4 h-[2.3rem] bg-[#3033d5] px-2 rounded text-white font-semibold cursor-pointer hover:bg-[#2225d5] duration-300"
          onClick={() => {
            setOpen(true);
          }}
        >
          <i className="fa-solid fa-plus mr-1"></i>
          Confess!
        </button>

        <div className="flex flex-wrap items-center justify-center gap-2">
          <div className="fit mx-3 flex bg-gray-700 px-2 py-1 rounded">
            <div className="text-white font-semibold flex gap-2">
              <p className="bg-gray-600 px-2 py-1 rounded">
                Sort by <i className="fa-solid fa-filter text-[0.9rem]"></i>
              </p>
              <select
                className="outline-none cursor-pointer"
                onClick={(e) => {
                  if (!isOldest && e.target.value === "oldest") {
                    setConfessions([...confessions].reverse());
                    setIsOldest(true);
                  } else if (isOldest && e.target.value === "default") {
                    setConfessions([...confessions].reverse());
                    setIsOldest(false);
                  }
                }}
              >
                <option
                  value="default"
                  className="text-black rounded cursor-pointer"
                >
                  Default
                </option>
                <option
                  value="oldest"
                  className="text-black rounded cursor-pointer"
                >
                  Oldest first
                </option>
              </select>
            </div>
          </div>
          <div className="fit mx-3 flex bg-gray-700 px-2 py-1 rounded">
            <div className="text-white font-semibold flex gap-2">
              <p className="bg-gray-600 px-2 py-1 rounded">
                Category <i className="fa-solid fa-sort text-[0.9rem]"></i>
              </p>
              <select
                className="outline-none cursor-pointer"
                onClick={async (e) => {
                  if (e.currentTarget.value === "All") {
                    console.log(e.currentTarget.value);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        if (!isOldest)
                          setConfessions(res.confessions.reverse());
                        else setConfessions(res.confessions);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (e.currentTarget.value === "😂 Funny / Random") {
                    console.log(e.currentTarget.value);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        if (!isOldest)
                          setConfessions(res.confessions.reverse());
                        else setConfessions(res.confessions);
                        let tempConfessions = [];
                        res.confessions.forEach((confession) => {
                          if (confession.category === "😂 Funny/Random") {
                            tempConfessions.push(confession);
                          }
                        });
                        setConfessions([...tempConfessions]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (e.currentTarget.value === "📚 Academics") {
                    console.log(e.currentTarget.value);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        if (!isOldest)
                          setConfessions(res.confessions.reverse());
                        else setConfessions(res.confessions);
                        let tempConfessions = [];
                        res.confessions.forEach((confession) => {
                          if (confession.category === "📚 Academics") {
                            tempConfessions.push(confession);
                          }
                        });
                        setConfessions([...tempConfessions]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (e.currentTarget.value === "❤️ Crush/Love") {
                    console.log(e.currentTarget.value);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        if (!isOldest)
                          setConfessions(res.confessions.reverse());
                        else setConfessions(res.confessions);
                        let tempConfessions = [];
                        res.confessions.forEach((confession) => {
                          if (confession.category === "❤️ Crush/Love") {
                            tempConfessions.push(confession);
                          }
                        });
                        setConfessions([...tempConfessions]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (e.currentTarget.value === "👨‍🏫 Prof Moments") {
                    console.log(e.currentTarget.value);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        if (!isOldest)
                          setConfessions(res.confessions.reverse());
                        else setConfessions(res.confessions);
                        let tempConfessions = [];
                        res.confessions.forEach((confession) => {
                          if (confession.category === "👨‍🏫 Prof Moments") {
                            tempConfessions.push(confession);
                          }
                        });
                        setConfessions([...tempConfessions]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (e.currentTarget.value === "💭 Deep Thoughts") {
                    console.log(e.currentTarget.value);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        if (!isOldest)
                          setConfessions(res.confessions.reverse());
                        else setConfessions(res.confessions);
                        let tempConfessions = [];
                        res.confessions.forEach((confession) => {
                          if (confession.category === "💭 Deep Thoughts") {
                            tempConfessions.push(confession);
                          }
                        });
                        setConfessions([...tempConfessions]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (e.currentTarget.value === "😤 Rant") {
                    console.log(e.currentTarget.value);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        if (!isOldest)
                          setConfessions(res.confessions.reverse());
                        else setConfessions(res.confessions);
                        let tempConfessions = [];
                        res.confessions.forEach((confession) => {
                          if (confession.category === "😤 Rant") {
                            tempConfessions.push(confession);
                          }
                        });
                        setConfessions([...tempConfessions]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  } else if (e.currentTarget.value === "😈 Dark secret") {
                    console.log(e.currentTarget.value);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        if (!isOldest)
                          setConfessions(res.confessions.reverse());
                        else setConfessions(res.confessions);
                        let tempConfessions = [];
                        res.confessions.forEach((confession) => {
                          if (confession.category === "😈 Dark secret") {
                            tempConfessions.push(confession);
                          }
                        });
                        setConfessions([...tempConfessions]);
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  }
                }}
              >
                <option value="All" className="rounded text-black">
                  All
                </option>
                <option
                  value="😂 Funny / Random"
                  className="rounded text-black"
                >
                  😂 Funny / Random
                </option>
                <option value="📚 Academics" className="rounded text-black">
                  📚 Academics
                </option>
                <option value="❤️ Crush/Love" className="rounded text-black">
                  ❤️ Crush/Love
                </option>
                <option value="👨‍🏫 Prof Moments" className="rounded text-black">
                  👨‍🏫 Prof Moments
                </option>
                <option value="💭 Deep Thoughts" className="rounded text-black">
                  💭 Deep Thoughts
                </option>
                <option value="😤 Rant" className="rounded text-black">
                  😤 Rant
                </option>
                <option value="😈 Dark secret" className="rounded text-black">
                  😈 Dark secret
                </option>
              </select>
            </div>
          </div>
        </div>

        <Dialog
          open={open}
          onClose={() => {
            setOpen(false);
          }}
        >
          <DialogTitle>Create a new Confession :)</DialogTitle>
          <DialogContent>
            <DialogContentText className="mb-5">
              Write down your confession below and hit create to make your
              confession public!
            </DialogContentText>
            <form
              onSubmit={(e) => {
                e.preventDefault();
                console.log(e.currentTarget[1].value);

                fetch(import.meta.env.VITE_BACKEND_URL + "/new", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    category: e.currentTarget[0].value,
                    content: e.currentTarget[1].value,
                  }),
                })
                  .then(() => {
                    setConfessionAddedOpen(true);
                    setOpen(false);
                    fetch(import.meta.env.VITE_BACKEND_URL + "/confessions", {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                    })
                      .then((res) => res.json())
                      .then((res) => {
                        res.confessions.forEach((confession) => {
                          confession.time =
                            new Date().getTime() / 1000 - confession.time;
                        });
                        setConfessions(res.confessions.reverse());
                      })
                      .catch((err) => {
                        console.log(err);
                      });
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
              className=""
            >
              <select
                type="text"
                className="border-1 border-gray-400 w-full mt-3 rounded-lg h-[2.3rem] px-3 h-max-[2rem] overflow-auto"
                placeholder="Title"
                required
                defaultValue=""
              >
                <option value="" disabled>
                  Choose your confession vibe 💭
                </option>
                <option value="❤️ Crush/Love" className="rounded">
                  ❤️ Crush/Love
                </option>
                <option value="📚 Academics" className="rounded">
                  📚 Academics
                </option>
                <option value="😂 Funny/Random" className="rounded">
                  😂 Funny / Random
                </option>
                <option value="👨‍🏫 Prof Moments" className="rounded">
                  👨‍🏫 Prof Moments
                </option>
                <option value="💭 Deep Thoughts" className="rounded">
                  💭 Deep Thoughts
                </option>
                <option value="😤 Rant" className="rounded">
                  😤 Rant
                </option>
                <option value="😈 Dark secret" className="rounded">
                  😈 Dark secret
                </option>
              </select>
              <textarea
                className="w-full border-1 border-gray-400 rounded-lg mt-4 min-h-[10rem] px-3 py-2"
                required
                placeholder="The confession"
              ></textarea>
              <button className="w-full h-[2.3rem] bg-[#3033d5] px-2 rounded text-white font-semibold cursor-pointer hover:bg-[#2225d5] duration-300 mt-2 mb-[-0.3rem]">
                Create
              </button>
            </form>
          </DialogContent>
        </Dialog>

        <div className="flex flex-col mt-5 gap-5 mb-[5rem] items-center px-3">
          {confessions.length === 0 ? (
            <div className="text-gray-400 italic font-semibold">
              No items to display!
            </div>
          ) : (
            ""
          )}
          {confessions.map((confession, index) => {
            return (
              <div
                className="w-full h-fit p-2 bg-gray-700 rounded hover:scale-[1.05] duration-300 max-w-[30rem] mx-5 shadow-[0_0_10px_black]"
                key={index}
              >
                <div className="bg-[#293037] w-full h-full rounded px-4 py-1 font-bold flex flex-col">
                  <div className="flex items-center justify-between">
                    <h1 className="text-white text-[1rem]">
                      {confession.category}
                    </h1>
                    <p className="text-gray-600 text-[0.8rem]">
                      {confession.time < 60
                        ? parseInt(confession.time) + " s"
                        : confession.time >= 60 && confession.time < 3600
                        ? parseInt(confession.time / 60) + " min"
                        : confession.time >= 3600 && confession.time < 3600 * 24
                        ? parseInt(confession.time / 3600) + " hr"
                        : confession.time >= 3600 * 24 &&
                          confession.time < 3600 * 24 * 7
                        ? parseInt((confession.time / 3600) * 24) + " day"
                        : confession.time >= 3600 * 24 * 7 &&
                          confession.time < 3600 * 24 * 7 * 30
                        ? parseInt((confession.time / 3600) * 24 * 7) + " week"
                        : confession.time >= 3600 * 24 * 7 * 30 &&
                          confession.time < 3600 * 24 * 7 * 30 * 12
                        ? parseInt(
                            (confession.time / confession.time / 3600) *
                              24 *
                              7 *
                              30
                          ) + " month"
                        : parseInt(
                            (confession.time / 3600) * 24 * 7 * 30 * 12
                          ) + " year"}{" "}
                      ago
                    </p>
                  </div>
                  <p className="text-gray-300 italic my-2">
                    "{confession.content}"
                  </p>
                </div>
                <div className="w-full h-fit bg-gray-700 flex items-center justify-start flex-wrap">
                  <Heart
                    className={`ml-3 mt-2 w-5 cursor-pointer hover:scale-[1.1] transition-transform ${
                      userData.likes.includes(confession._id)
                        ? "fill-[red] stroke-[red]"
                        : "fill-none stroke-[#9099a7]"
                    }`}
                    onClick={async () => {
                      const alreadyLiked = userData.likes.includes(
                        confession._id
                      );

                      const updatedConfessions = confessions.map((c, i) =>
                        i === index
                          ? { ...c, likes: c.likes + (alreadyLiked ? -1 : 1) }
                          : c
                      );
                      setConfessions(updatedConfessions);
                      const updatedLikes = alreadyLiked
                        ? userData.likes.filter((id) => id !== confession._id)
                        : [...userData.likes, confession._id];
                      setUserData({ ...userData, likes: updatedLikes });

                      await fetch(
                        import.meta.env.VITE_BACKEND_URL + "/update-reaction",
                        {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            reactionType: "like",
                            reactionCount:
                              confession.likes + (alreadyLiked ? -1 : 1),
                            id: confession._id,
                            type: alreadyLiked ? "decrease" : "increase",
                          }),
                        }
                      );
                    }}
                  />

                  <p className="text-[#9099a7] mt-2 ml-1 font-semibold text-[0.8rem]">
                    {confession.likes}
                  </p>

                  <div
                    className={`ml-2 mt-[0.4rem] cursor-pointer hover:scale-[1.1] duration-300 rounded-[0.5rem] flex items-center justify-center w-7 h-7 ${
                      userData.lol.includes(confession._id)
                        ? "bg-[rgb(159,7,18)]"
                        : "bg-[#364153]"
                    }`}
                    onClick={async () => {
                      const alreadyLaughed = userData.lol.includes(
                        confession._id
                      );

                      const updatedConfessions = confessions.map((c, i) =>
                        i === index
                          ? { ...c, lol: c.lol + (alreadyLaughed ? -1 : 1) }
                          : c
                      );
                      setConfessions(updatedConfessions);

                      const updatedLol = alreadyLaughed
                        ? userData.lol.filter((id) => id !== confession._id)
                        : [...userData.lol, confession._id];
                      setUserData({ ...userData, lol: updatedLol });

                      await fetch(
                        import.meta.env.VITE_BACKEND_URL + "/update-reaction",
                        {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            reactionType: "lol",
                            reactionCount:
                              confession.lol + (alreadyLaughed ? -1 : 1),
                            id: confession._id,
                            type: alreadyLaughed ? "decrease" : "increase",
                          }),
                        }
                      );
                    }}
                  >
                    😂
                  </div>

                  <p className="text-[#9099a7] mt-2 ml-1 font-semibold text-[0.8rem]">
                    {confession.lol}
                  </p>

                  <div
                    className={`ml-2 mt-[0.4rem] cursor-pointer hover:scale-[1.1] duration-300 rounded-[0.5rem] flex items-center justify-center w-7 h-7 ${
                      userData.cry.includes(confession._id)
                        ? "bg-[rgb(159,7,18)]"
                        : "bg-[#364153]"
                    }`}
                    onClick={async () => {
                      const alreadyCried = userData.cry.includes(
                        confession._id
                      );

                      const updatedConfessions = confessions.map((c, i) =>
                        i === index
                          ? { ...c, cry: c.cry + (alreadyCried ? -1 : 1) }
                          : c
                      );
                      setConfessions(updatedConfessions);

                      const updatedCry = alreadyCried
                        ? userData.cry.filter((id) => id !== confession._id)
                        : [...userData.cry, confession._id];
                      setUserData({ ...userData, cry: updatedCry });

                      await fetch(
                        import.meta.env.VITE_BACKEND_URL + "/update-reaction",
                        {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            reactionType: "cry",
                            reactionCount:
                              confession.cry + (alreadyCried ? -1 : 1),
                            id: confession._id,
                            type: alreadyCried ? "decrease" : "increase",
                          }),
                        }
                      );
                    }}
                  >
                    😭
                  </div>

                  <p className="text-[#9099a7] mt-2 ml-1 font-semibold text-[0.8rem]">
                    {confession.cry}
                  </p>

                  <div
                    className={`ml-2 mt-[0.4rem] cursor-pointer hover:scale-[1.1] duration-300 rounded-[0.5rem] flex items-center justify-center w-7 h-7 ${
                      userData.angry.includes(confession._id)
                        ? "bg-[rgb(159,7,18)]"
                        : "bg-[#364153]"
                    }`}
                    onClick={async () => {
                      const alreadyAngry = userData.angry.includes(
                        confession._id
                      );

                      const updatedConfessions = confessions.map((c, i) =>
                        i === index
                          ? { ...c, angry: c.angry + (alreadyAngry ? -1 : 1) }
                          : c
                      );
                      setConfessions(updatedConfessions);

                      const updatedAngry = alreadyAngry
                        ? userData.angry.filter((id) => id !== confession._id)
                        : [...userData.angry, confession._id];
                      setUserData({ ...userData, angry: updatedAngry });

                      await fetch(
                        import.meta.env.VITE_BACKEND_URL + "/update-reaction",
                        {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            reactionType: "angry",
                            reactionCount:
                              confession.angry + (alreadyAngry ? -1 : 1),
                            id: confession._id,
                            type: alreadyAngry ? "decrease" : "increase",
                          }),
                        }
                      );
                    }}
                  >
                    😡
                  </div>
                  <p className="text-[#9099a7] mt-2 ml-1 font-semibold text-[0.8rem]">
                    {confession.angry}
                  </p>

                  <div
                    className={`ml-2 mt-[0.4rem] cursor-pointer hover:scale-[1.1] duration-300 rounded-[0.5rem] flex items-center justify-center w-7 h-7 ${
                      userData.wonder.includes(confession._id)
                        ? "bg-[rgb(159,7,18)]"
                        : "bg-[#364153]"
                    }`}
                    onClick={async () => {
                      const alreadyWonder = userData.wonder.includes(
                        confession._id
                      );

                      const updatedConfessions = confessions.map((c, i) =>
                        i === index
                          ? {
                              ...c,
                              wonder: c.wonder + (alreadyWonder ? -1 : 1),
                            }
                          : c
                      );
                      setConfessions(updatedConfessions);

                      const updatedWonder = alreadyWonder
                        ? userData.wonder.filter((id) => id !== confession._id)
                        : [...userData.wonder, confession._id];
                      setUserData({ ...userData, wonder: updatedWonder });

                      await fetch(
                        import.meta.env.VITE_BACKEND_URL + "/update-reaction",
                        {
                          method: "POST",
                          credentials: "include",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({
                            reactionType: "wonder",
                            reactionCount:
                              confession.wonder + (alreadyWonder ? -1 : 1),
                            id: confession._id,
                            type: alreadyWonder ? "decrease" : "increase",
                          }),
                        }
                      );
                    }}
                  >
                    😳
                  </div>

                  <p className="text-[#9099a7] mt-2 ml-1 font-semibold text-[0.8rem]">
                    {confession.wonder}
                  </p>

                  <div className="flex items-center">
                    <div
                      className={`ml-2 mt-[0.4rem] cursor-pointer hover:scale-[1.1] duration-300 rounded-[0.5rem] flex items-center justify-center w-7 h-7 ${
                        userData.think.includes(confession._id)
                          ? "bg-[rgb(159,7,18)]"
                          : "bg-[#364153]"
                      }`}
                      onClick={async () => {
                        const alreadyThink = userData.think.includes(
                          confession._id
                        );

                        const updatedConfessions = confessions.map((c, i) =>
                          i === index
                            ? { ...c, think: c.think + (alreadyThink ? -1 : 1) }
                            : c
                        );
                        setConfessions(updatedConfessions);

                        const updatedThink = alreadyThink
                          ? userData.think.filter((id) => id !== confession._id)
                          : [...userData.think, confession._id];
                        setUserData({ ...userData, think: updatedThink });

                        await fetch(
                          import.meta.env.VITE_BACKEND_URL + "/update-reaction",
                          {
                            method: "POST",
                            credentials: "include",
                            headers: { "Content-Type": "application/json" },
                            body: JSON.stringify({
                              reactionType: "think",
                              reactionCount:
                                confession.think + (alreadyThink ? -1 : 1),
                              id: confession._id,
                              type: alreadyThink ? "decrease" : "increase",
                            }),
                          }
                        );
                      }}
                    >
                      🤔
                    </div>

                    <p className="text-[#9099a7] mt-2 ml-1 font-semibold text-[0.8rem]">
                      {confession.think}
                    </p>
                  </div>

                  {/* <div className="flex items-center">
                    <MessageCircle className="ml-3 mt-2 text-gray-400 w-5 cursor-pointer hover:scale-[1.1]" />
                    <p className="text-[#9099a7] mt-2 ml-1 font-semibold text-[0.8rem]">
                      {confession.comments.length}
                    </p>
                  </div> */}
                </div>
              </div>
            );
          })}
        </div>

        <footer className="w-full h-fit py-2 fixed bottom-0 bg-[#252a30] border-1 border-t-gray-600 flex gap-2 flex-col justify-center items-center">
          <p className="text-white font-semibold text-center">
            Made with ❤️ by Ayantik Sarkar <br />
            Arka and Shuvam! 
          </p>
        </footer>
      </div>
    );
  else return <Login />;
}

export default App;
