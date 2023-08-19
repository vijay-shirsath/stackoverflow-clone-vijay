import React from 'react'
import LeftSidebar from '../../components/LeftSidebar/LeftSidebar'
import Avatar from '../../components/Avatar/Avatar'
import moment from 'moment'
import {useSelector} from "react-redux"
import { useParams } from 'react-router-dom'
import { useState } from 'react'
import "./UsersProfile.css";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBirthdayCake } from '@fortawesome/free-solid-svg-icons';
import { faPen } from '@fortawesome/free-solid-svg-icons';
import ProfileBio from './ProfileBio'
import EditProfileForm from './EditProfileForm'


const UserProfile = () => {
  const {id} = useParams();
    const allUsers = useSelector((state) => state.auth.getAllUsers);
    const currentProfileUsers = allUsers.filter((user) => user._id === id)[0];
    const currentUser = useSelector((state) => state.auth);

    console.log(allUsers);
    console.log(currentProfileUsers);
    console.log(currentUser);

    const [Switch, setSwitch] = useState(false);


  return (
    <div className="home-container-1">
    <LeftSidebar />
    <div className="home-container-2">
      <section>
        <div className="user-details-container">
          <div className="user-details">
            <Avatar
              backgroundColor="purple"
              color="white"
              fontSize="50px"
              px="40px"
              py="30px"
            >
              {currentProfileUsers?.name.charAt(0).toUpperCase()}
            </Avatar>
            <div className="user-name">
              <h1>{currentProfileUsers?.name}</h1>
              <p>
                <FontAwesomeIcon icon={faBirthdayCake} /> Joined{" "}
                {moment(currentProfileUsers?.joinedOn).fromNow()}
              </p>
            </div>
          </div>
          {currentUser?._id === id && (
            <button
              type="button"
              onClick={() => setSwitch(true)}
              className="edit-profile-btn"
            >
              <FontAwesomeIcon icon={faPen} /> Edit Profile
            </button>
          )}
        </div>
        <>
          {Switch ? (
            <EditProfileForm
              currentUser={currentUser}
              setSwitch={setSwitch}
            />
          ) : (
            <ProfileBio currentProfile={currentProfileUsers} />
          )}
        </>
      </section>
    </div>
  </div>
  )
}

export default UserProfile