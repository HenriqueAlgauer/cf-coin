function ProfileInput({ title, data }) {
  return (
    <div className="flex flex-col items-start bg-gray-700 rounded-sm ">
      <h3 className="px-2 font-mono border-1 w-full rounded-t-sm border-green-400">
        {title}
      </h3>
      <p className="py-2 px-2 w-full font-semibold bg-gray-800 rounded-b-sm border-1 border-t-0 border-green-400 outline-none ">
        {data}
      </p>
    </div>
  );
}

export default ProfileInput;
