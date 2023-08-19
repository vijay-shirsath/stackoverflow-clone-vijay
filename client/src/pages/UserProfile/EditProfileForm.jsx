import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllUsers, updateUserProfile } from "../../store/slices/userSlice";
import { useNavigate } from "react-router-dom";


const EditProfileForm = ({ currentUser, setSwitch }) => {

  const updateUser = useSelector((state) => state.auth.updateUser);
  const [name, setName] = useState(updateUser?.name);
  const [about, setAbout] = useState(updateUser?.about);
  const [tags, setTags] = useState([]);
  const dispatch = useDispatch();
  console.log(currentUser._id);
  const navigate = useNavigate();
  console.log(updateUser);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (tags[0] === "" || tags.length === 0) {
      alert("Update tags field");
    } else {
      dispatch(updateUserProfile({ _id: currentUser._id, profileData: { name, about, tags } }));
      setTimeout(() => {
        dispatch(getAllUsers());
      }, 500)
    }
    setSwitch(false);


  };

  return (
    <div>
      <h1 className="edit-profile-title">Edit Your Profile</h1>
      <h2 className="edit-profile-title-2">Public information</h2>
      <form className="edit-profile-form" onSubmit={handleSubmit}>
        <label htmlFor="name">
          <h3>Display name</h3>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </label>
        <label htmlFor="about">
          <h3>About me</h3>
          <textarea
            id="about"
            cols="30"
            rows="10"
            value={about}
            onChange={(e) => setAbout(e.target.value)}
          ></textarea>
        </label>
        <label htmlFor="tags">
          <h3>Watched tags</h3>
          <p>Add tags separated by 1 space</p>
          <input
            type="text"
            id="tags"
            onChange={(e) => setTags(e.target.value.split(" "))}
          />
        </label>
        <br />
        <input type="submit" value="Save profile" className="user-submit-btn" />
        <button
          type="button"
          className="user-cancel-btn"
          onClick={() => setSwitch(false)}
        >
          Cancel
        </button>
      </form>
    </div>
  );
};

export default EditProfileForm;