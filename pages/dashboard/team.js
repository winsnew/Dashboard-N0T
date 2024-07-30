import { useState, useEffect } from "react";
import axios from "../../lib/axios";
import AddTeamModal from "../../components/modal/addTeam";
import EditTeamModal from "../../components/modal/editTeam";
import DeleteMember from "../../components/modal/deleteMember";

const Team = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);
  const [selectedProfileId, setSelectedProfileId] = useState(null);
  const [teamProfiles, setTeamProfiles] = useState([]);
  const [editingProfile, setEditingProfile] = useState(null);
  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  useEffect(() => {
    const fetchTeamProfiles = async () => {
      const token = localStorage.getItem('token');
      try {
        
        const response = await axios.get("/api/team", {
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        }); 
        console.log("Fetched team profiles:", response.data);
        setTeamProfiles(response.data);
      } catch (error) {
        console.error("Error fetching team profiles:", error);
      }
    };

    fetchTeamProfiles();
  }, []);

  const handleProfileCreated = (newProfile) => {
    setTeamProfiles((prevProfiles) => [...prevProfiles, newProfile]);
    closeModal();
  };

  const getUniqueStackImages = (images) => {
    return images.reduce((acc, image) => {
      if (!acc.some(item => item.src === image.src)) {
        acc.push(image);
      }
      return acc;
    }, []);
  };

  const handleEditClick = (profile) => {
    setEditingProfile(profile);
    setIsEditOpen(true);
  };

  const handleUpdate = (updatedProfile) => {
    setTeamProfiles((prevProfiles) =>
      prevProfiles.map((profile) =>
        profile._id === updatedProfile._id ? updatedProfile : profile
      )
    );
    setIsEditOpen(false);
  };

  const openDeleteModal = (profileId) => {
    setSelectedProfileId(profileId);
    setIsDeleteOpen(true);
  };

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedProfileId(null);
  };

  const handleDeleteSuccess = (profileId) => {
    setTeamProfiles(prevProfiles => prevProfiles.filter(profile => profile._id !== profileId));
  };

  return (
    <>
      <div className="w-full mt-5 mb-12">
        <div className="flex justify-between h-max items-center">
          <h5 className="dark:text-white text-lg">Team Profile</h5>
          <button className="bg-brandLinear p-2 rounded-lg" onClick={openModal}>
            Add Member
          </button>
        </div>
        <AddTeamModal isOpen={isModalOpen} onClose={closeModal} onProfileAdded={handleProfileCreated}/>
        {isEditOpen && (
          <EditTeamModal
            profile={editingProfile}
            onUpdate={handleUpdate}
            isEditOpen={isEditOpen}
            onEditClose={() => setIsEditOpen(false)}
          />
        )}
          <DeleteMember
            isDeleteOpen={isDeleteOpen}
            onDeleteClose={closeDeleteModal}
            profileId={selectedProfileId}
            onDeleteSuccess={handleDeleteSuccess}
          />
        
        <div>
          <div className="container py-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {teamProfiles.map((profile) => (
                <div
                  key={profile._id}
                  className=" bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="flex justify-center w-full h-32 items-center">
                    <img
                      alt="ecommerce"
                      className="w-24 h-24 object-cover object-center items-center rounded-full"
                      src={`http://localhost:8000${profile.Images}`}
                    />
                  </div>
                  <div className="p-0 mx-3 ">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      {profile.name}
                    </h2>
                    <h1 className="text-gray-900 text-xl title-font font-medium mb-1">
                      {profile.title}
                    </h1>
                    <p className="leading-relaxed text-sm">
                      {profile.description}
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {getUniqueStackImages(profile.stackImages).map((stackImage) => (
                        <img
                          key={stackImage._id}
                          src={`http://localhost:8000${stackImage.src}`}
                          alt={stackImage.alt}
                          className="w-8 h-8"
                        />
                      ))}
                    </div>
                    <div className="py-2 flex">
                      <span className="title-font font-medium text-xl text-gray-900"></span>
                      <div className="flex flex-row gap-2">
                        <button
                          className=" p-1 w-16 text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded"
                          onClick={() => handleEditClick(profile)}
                        >
                          Edit
                        </button>
                        
                        <button
                          key={profile._id}
                          className=" p-1 w-16 text-gray-800 bg-orange-200 border-0 focus:outline-none hover:bg-orange-400 rounded"
                          onClick={() => openDeleteModal(profile._id)}
                        >
                          Delete
                        </button>
                        
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Team;
