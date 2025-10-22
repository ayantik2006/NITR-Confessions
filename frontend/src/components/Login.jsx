import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Toaster } from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Login() {
  const [showLogin, setShowLogin] = useState(true);
  const [isUsernameAvailable, setIsUsernameAvailable] = useState(true);

  if (showLogin)
    return (
      <div className="min-h-screen w-screen flex flex-col items-center justify-center bg-red-300">
        <Toaster position="top-center" reverseOrder={false} />
        <h1 className="text-[#c04a20] font-bold wrap-break-word text-[2rem] mb-[1.3rem] text-center font-[Combo]">
          Boldo Mann ki Baat...Anonymously
        </h1>
        <div className="p-2 bg-[#ca4b15] rounded-lg mx-2 w-fit h-fit">
          <div className="w-[18rem] h-[20rem] bg-[#f68250] rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="flex items-center justify-center gap-3 w-full ml-[4.5rem] mb-4">
              <div className="w-[5rem] h-[4.5rem]  bg-gray-500 rounded-[1rem] flex items-center justify-center">
                <img
                  src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEbs6--dxw9FBUMzte0H4J9hH46_VsnRPANg&s"
                  className=" flex items-center justify-center rounded-[1rem] w-[4.2rem] h-[4.2rem]"
                />
              </div>
              <h1 className="text-black font-bold text-[1.2rem]">
                Login to NITR Confessions
              </h1>
            </div>

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
                className="bg-[#8a2d05f5] outline-none rounded h-[2rem] w-[14rem] px-2 text-white"
                placeholder="Username"
                required
                autoFocus
              />
              <input
                type="password"
                className="bg-[#8a2d05f5] outline-none rounded h-[2rem] w-[14rem] px-2 text-white"
                placeholder="Password"
                required
              />
              <button
                className="bg-blue-800 px-2 py-1  font-semibold cursor-pointer hover:bg-blue-900 bg-linear-to-r from-yellow-200 to-yellow-500 border-2 border-yellow-700 text-black rounded-[0.6rem] hover:scale-[1.08] duration-200"
                type="submit"
              >
                Log in
              </button>
            </form>
            <div
              className="text-[#8a2d05f5] hover:underline cursor-pointer"
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
      <div className="min-h-screen w-screen bg-red-300 flex flex-col items-center justify-center">
        <h1 className="font-bold wrap-break-word text-[2rem] mb-[1.3rem] text-center font-[Combo] text-[#c04a20]">
          Boldo Mann ki Baat...Anonymously
        </h1>
        <Toaster position="top-center" reverseOrder={false} />
        <div className="p-2 rounded-lg mx-2 w-fit h-fit bg-[#ca4b15]">
          <div className="w-[19rem] h-[28rem] bg-[#f68250] rounded-lg flex flex-col items-center justify-center gap-3">
            <div className="w-[4.5rem] h-[4.5rem]  bg-gray-500 rounded-[1rem] flex items-center justify-center">
              <img
                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEbs6--dxw9FBUMzte0H4J9hH46_VsnRPANg&s"
                className=" flex items-center justify-center rounded-[1rem] w-[4.2rem] h-[4.2rem]"
              />
            </div>
            <h2 className="text-black font-bold text-[1.2rem]">
              NITR Confessions
            </h2>
            <h1 className="text-gray-700 font-semi mt-[-0.8rem] bold text-[1rem]">
              Create an Account
            </h1>
            <p className="text-[0.85rem] text-gray-600 italic">
              Please do remember your username and password
            </p>
            <form
              className="flex flex-col items-center justify-center gap-3"
              onSubmit={(e) => {
                e.preventDefault();
                let gender;
                if (e.currentTarget[2].checked) gender = "boy";
                else gender = "girl";

                if (isUsernameAvailable) {
                  fetch(import.meta.env.VITE_BACKEND_URL + "/auth/signup", {
                    method: "POST",
                    credentials: "include",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                      username: e.currentTarget[0].value,
                      password: e.currentTarget[1].value,
                      gender: gender,
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
                className="bg-[#8f3008] outline-none rounded h-[2rem] w-[14rem] px-2 text-white"
                placeholder="Username"
                required
                autoFocus
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
                className="bg-[#8f3008] text-white outline-none rounded h-[2rem] w-[14rem] px-2"
                placeholder="Password"
                required
              />
              <div className="mb-[-0.8rem] text-white font-semibold  text-[1.2rem]">
                I am a
              </div>
              <div className="flex">
                <input
                  type="radio"
                  name="gender"
                  id="boy"
                  className="mr-1 cursor-pointer"
                  required
                />
                <label
                  htmlFor="boy"
                  className="mr-[3.5rem] text-blue-700 font-semibold cursor-pointer"
                >
                  Boy
                </label>
                <input
                  type="radio"
                  name="gender"
                  id="girl"
                  className="mr-1 cursor-pointer"
                  required
                />
                <label
                  htmlFor="girl"
                  className="text-pink-700 font-semibold cursor-pointer"
                >
                  Girl
                </label>
              </div>
              <button
                className={`font-semibold px-2 py-1 rounded-[0.5rem] ${
                  !isUsernameAvailable
                    ? "bg-gray-300 hover:bg-gray-400 pointer-events-none"
                    : "bg-linear-to-r from-yellow-200 to-yellow-500 border-2 border-yellow-700 rounded"
                } `}
                type="submit"
              >
                Sign up
              </button>
            </form>
            <div
              className="hover:underline cursor-pointer text-[#8f3008]"
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
