import React, { useState, useEffect } from "react";
import { AiOutlineLogout } from "react-icons/ai";
import { useParams, useNavigate } from "react-router-dom";
import {
  userCreatedPinsQuery,
  userQuery,
  userSavedPinsQuery,
} from "../utils/data";
import { GoogleLogout } from "react-google-login";
import { client } from "../client";
import MasonryLayout from "./MasonryLayout";
import Spinner from "./Spinner";
const randomImage =
  "https://source.unsplash.com/random/900x700/?nature,photography";
const activeBtnStyles =
  "bg-red-500 text-white font-bold p-2 rounded-full w-20 outline-none ";
const notActiveBtnStyles =
  "bg-primary text-black mr-4 font-bold p-2 rounded-full w-20 outline-none ";
function UserProfile() {
  const [user, setUser] = useState(null);
  const [pins, setPins] = useState(null);
  const [text, setText] = useState("Created");
  const [activeButton, setActivebutton] = useState("created");
  const navigate = useNavigate();
  const { userId } = useParams();
  useEffect(() => {
    const query = userQuery(userId);
    client.fetch(query).then((data) => {
      setUser(data[0]);
    });
  }, [userId]);
  useEffect(() => {
    if (text === "Created") {
      const createdPinsQuery = userCreatedPinsQuery(userId);
      client.fetch(createdPinsQuery).then((data) => setPins(data));
    } else {
      if (text === "Saved") {
        const savedPinsQuery = userSavedPinsQuery(userId);
        client.fetch(savedPinsQuery).then((data) => setPins(data));
      }
    }
  }, [text, userId]);
  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  if (!user) {
    return <Spinner message="Loading profile..." />;
  }

  return (
    <div className="relative pb-2 h-full justify-center">
      <div className="flex flex-col pb-5">
        <div className="relative flex flex-col mb-7">
          <div className="flex flex-col justify-center items-center">
            <img
              src={randomImage}
              className="w-full h-370 2xl:h-510 shadow-lg object-cover"
              alt="banner-pic"
            />
            <img
              src={user.image}
              className="rounded-full w-20 h-20 -mt-10 shadow-xl object-cover"
              alt="user-profile"
            />
            <h1 className="font-bold text-3xl text-center mt-3">
              {user.userName}
            </h1>
            <div className="absolute top-0 right-0 z-1 p-2">
              {userId === user._id && (
                <GoogleLogout
                  clientId={process.env.REACT_APP_GOOGLE_API_TOKEN}
                  render={(renderProps) => (
                    <button
                      type="button"
                      className="bg-white p-2 rounded-full cursor-pointer outline-none shadow-md"
                      onClick={renderProps.onClick}
                      disabled={renderProps.disabled}
                    >
                      <AiOutlineLogout color="red" fontSize={21} />
                    </button>
                  )}
                  onLogoutSuccess={logout}
                />
              )}
            </div>
          </div>
          <div className="text-center mb-7">
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActivebutton("created");
              }}
              className={`${
                activeButton === "created"
                  ? activeBtnStyles
                  : notActiveBtnStyles
              }`}
            >
              Created
            </button>
            <button
              type="button"
              onClick={(e) => {
                setText(e.target.textContent);
                setActivebutton("saved");
              }}
              className={`${
                activeButton === "saved" ? activeBtnStyles : notActiveBtnStyles
              }`}
            >
              Saved
            </button>
          </div>
          {pins?.length > 0 ? (
            <div className="px-2">
              <MasonryLayout pins={pins} />
            </div>
          ) : (
            <div className="flex justify-center font-bold items-center text-xl w-full mt-2">
              No Pins Found.!
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
