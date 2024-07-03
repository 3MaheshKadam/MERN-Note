import { useSelector } from "react-redux";

const Profile = () => {
  const { currentUser } = useSelector((state) => state.user);
  return (
    <div className="mx-auto max-w-lg my-20  border rounded-xl  border-teal-300 p-4 bg-teal-50 shadow-lg">
      <h1 className="text-3xl font-semibold text-center my-7">Profile</h1>
      <form className="flex flex-col gap-4  ">
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
        />
        <input
          type="email"
          className="border p-4  rounded-lg border-teal-300  "
          placeholder="email"
          id="email"
          defaultValue={currentUser.email}
        />
        <input
          type="password"
          className="border  p-4 rounded-lg border-teal-300 "
          placeholder="password"
          id="password"
        />
        <button className="bg-gray-900 rounded-lg uppercase hover:opacity-95 p-3 text-white bg-primary">
          Update
        </button>
      </form>
      <div className="flex justify-between mt-5">
        <span className="text-red-500 cursor-pointer">Delete account</span>
        <span className="text-red-500 cursor-pointer">Sign out</span>
      </div>
    </div>
  );
};

export default Profile;
