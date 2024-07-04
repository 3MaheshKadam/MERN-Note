import { useSelector } from "react-redux";
import {
  updateUserStart,
  updateUserFailure,
  updateUserSuccess,
  deleteUserStart,
  deleteUserFailure,
  deleteUserSuccess,

  // signOutStart,
  // signOutSuccess,
  // signOutFailure,
} from "../redux/user/userSlice";
import { useDispatch } from "react-redux";
import { useState } from "react";
// const { currentUser, l } = useSelector((state) => state.user);

const Profile = () => {
  const [updateSuccess, setUpdateSuccess] = useState(false);
  const [formData, setFormData] = useState();
  const [updateUser, setUpdateUser] = useState(false);
  const { currentUser, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(`api/user/update/${currentUser._id}`, {
        method: "Post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data.message));
        return;
      }

      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error.message));
    }
  };
  const handleDeleteUser = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`, {
        method: "DELETE",
      });
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data.message));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error.message));
    }
  };

  // const handleSignOut = async () => {
  //   try {
  //     dispatch(signOutStart());
  //     const res = await fetch("/api/auth/signout");
  //     const data = await res.json();
  //     if (data.success === false) {
  //       dispatch(signOutFailure(data.message));
  //       return;
  //     }
  //     dispatch(signOutSuccess(data));
  //   } catch (error) {
  //     dispatch(signOutFailure(error.message));
  //   }
  // };
  return (
    <div className="mx-auto max-w-lg my-20  border rounded-xl  border-teal-300 p-4 bg-teal-50 shadow-lg">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4  " onSubmit={handleSubmit}>
        <img
          src={currentUser.avatar}
          alt="profile"
          className="rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2 my-7"
        />
        <input
          type="text"
          className="border p-4  rounded-lg border-teal-300 "
          placeholder="name"
          id="username"
          defaultValue={currentUser.username}
          onChange={handleChange}
        />
        <input
          type="email"
          className="border p-4  rounded-lg border-teal-300  "
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
          onChange={handleChange}
        />
        <input
          type="password"
          className="border  p-4 rounded-lg border-teal-300 "
          placeholder="password"
          id="password"
          onChange={handleChange}
        />
        <button
          disabled={loading}
          className="bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80"
        >
          {loading ? "Loading..." : "Update"}
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span
          onClick={handleDeleteUser}
          className="text-red-500 cursor-pointer"
        >
          Delete account
        </span>{" "}
        <span
          // onClick={handleSignOut}
          className="text-red-500 cursor-pointer"
        >
          Sign out
        </span>
      </div>
      <p className="text-red-700 mt-5">{error ? error : ""}</p>
      <p className="text-green-700 mt-5">
        {updateSuccess ? "User is updated successfully!" : ""}
      </p>
    </div>
  );
};

export default Profile;
