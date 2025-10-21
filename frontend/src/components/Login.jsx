import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  if (showLogin)
    return (
      <div className="min-h-screen w-screen bg-[#1b1f23] flex flex-col items-center justify-center">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-gray-300 font-bold wrap-break-word text-[2rem] mb-[1.3rem] text-center mask-radial-from-neutral-50">
          Boldo Mann ki Baat...Anonymously
        </h1>
        <div className="p-2 bg-gray-600 rounded-lg mx-2 w-fit h-fit">
          <div className="w-[18rem] h-[20rem] bg-gray-800 rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="w-[4.5rem] h-[4.5rem]  bg-gray-500 rounded-[1rem] flex items-center justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEbs6--dxw9FBUMzte0H4J9hH46_VsnRPANg&s"
                className=" flex items-center justify-center rounded-[1rem] w-[4.2rem] h-[4.2rem]"
              />
            </div>
            <h1 className="text-white font-bold text-[1.2rem]">
              Login to NITR Confessions
            </h1>
            <form
              className="flex flex-col items-center justify-center gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                fetch(import.meta.env.VITE_BACKEND_URL + "/auth/login", {
                  method: "POST",
                  credentials: "include",
                  headers: { "Content-Type": "application/json" },
                  body: JSON.stringify({
                    username: e.currentTarget[0].value,
                    password: e.currentTarget[1].value,
                  }),
                })
                  .then((res) => res.json())
                  .then((res) => {
                    if (res.msg === "failure") {
                      toast.error("Invalid credentials!", { duration: 3000 });
                    } else {
                      window.location.reload();
                    }
                  })
                  .catch((err) => {
                    console.log(err);
                  });
              }}
            >
              <input
                type="text"
                className="bg-gray-500 outline-none rounded h-[2rem] w-[14rem] px-2"
                placeholder="Username"
                required
              />
              <input
                type="password"
                className="bg-gray-500 outline-none rounded h-[2rem] w-[14rem] px-2"
                placeholder="Password"
                required
              />
              <button
                className="bg-blue-800 px-2 py-1 rounded font-semibold text-white cursor-pointer hover:bg-blue-900"
                type="submit"
              >
                Log in
              </button>
            </form>
            <div
              className="text-gray-400 hover:underline cursor-pointer"
              onClick={() => {
                setShowLogin(false);
              }}
            >
              Create a new Account
            </div>
          </div>
        </div>
      </div>
    );
  else
    return (
      <div className="min-h-screen w-screen bg-[#1b1f23] flex flex-col items-center justify-center">
        <h1 className="text-gray-300 font-bold wrap-break-word text-[2rem] mb-[1.3rem] text-center mask-radial-from-neutral-50">
          Boldo Mann ki Baat...Anonymously
        </h1>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="p-2 bg-gray-600 rounded-lg mx-2 w-fit h-fit">
          <div className="w-[19rem] h-[24rem] bg-gray-800 rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="w-[4.5rem] h-[4.5rem]  bg-gray-500 rounded-[1rem] flex items-center justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEbs6--dxw9FBUMzte0H4J9hH46_VsnRPANg&s"
                className=" flex items-center justify-center rounded-[1rem] w-[4.2rem] h-[4.2rem]"
              />
            </div>
            <h2 className="text-white font-bold text-[1.2rem]">
              NITR Confessions
            </h2>
            <h1 className="text-white font-semi mt-[-0.8rem] bold text-[1rem]">
              Create an Account
            </h1>
            <p className="text-[0.85rem] text-gray-600 italic">
              Please do remember your username and password
            </p>
            <form
              className="flex flex-col items-center justify-center gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                if (isUsernameAvailable) {
                  fetch(import.meta.env.VITE_BACKEND_URL + "/auth/signup", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      username: e.currentTarget[0].value,
                      password: e.currentTarget[1].value,
                    }),
                  })
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.msg !== "failure") {
                        toast.success("Account created successfully!", {
                          duration: 3000,
                        });
                      } else {
                        toast.error("User already exists!", {
                          duration: 3000,
                        });
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }
              }}
            >
              <input
                type="text"
                className="bg-gray-500 outline-none rounded h-[2rem] w-[14rem] px-2"
                placeholder="Username"
                required
                onInput={(e) => {
                  fetch(
                    import.meta.env.VITE_BACKEND_URL + "/auth/find-username",
                    {
                      method: "POST",
                      credentials: "include",
                      headers: { "Content-Type": "application/json" },
                      body: JSON.stringify({
                        username: e.currentTarget.value,
                      }),
                    }
                  )
                    .then((res) => res.json())
                    .then((res) => {
                      if (res.msg === "exists") {
                        setIsUsernameAvailable(false);
                      } else {
                        setIsUsernameAvailable(true);
                      }
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                }}
              />
              {!isUsernameAvailable && (
                <span className="text-red-700 mt-[-0.5rem] mb-[-0.3rem] italic font-semibold self-center ml-2 text-[0.9rem] font-">
                  username unavailable!
                </span>
              )}
              <input
                type="password"
                className="bg-gray-500 outline-none rounded h-[2rem] w-[14rem] px-2"
                placeholder="Password"
                required
              />
              <button
                className={`${
                  !isUsernameAvailable
                    ? "bg-gray-400 hover:bg-gray-400 pointer-events-none"
                    : ""
                } bg-blue-800 px-2 py-1 rounded font-semibold text-white cursor-pointer hover:bg-blue-900`}
                type="submit"
              >
                Sign up
              </button>
            </form>
            <div
              className="text-gray-400 hover:underline cursor-pointer"
              onClick={() => {
                setShowLogin(true);
                setIsUsernameAvailable(true);
              }}
            >
              Go to Login
            </div>
          </div>
        </div>
      </div>
    );
}

export default Login;
