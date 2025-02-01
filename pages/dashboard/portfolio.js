import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import AddPorto from "../../components/modal/addPorto";
import EditPorto from "../../components/modal/editPorto";
import DeletePorto from "../../components/modal/deletePorto";
import axios from "../../lib/axios";

const Portfolio = () => {
  const [isModalOpen, setModalOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)
  const [isDeleteOpen, setIsDeleteOpen] = useState(false)
  const [selectedPortoId, setSelectedPortoId] = useState(null);
  const [portoTeams, setPortoTeams] = useState([])
  const [editingPorto, setEditingPorto] = useState(null)
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const router = useRouter();
  const openModal = () => setModalOpen(true)
  const closeModal = () => setModalOpen(false)
  useEffect(() => {
    const checkLoginStatus = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        router.push("/login");
        return;
      }

      try {
        const res = await axios.post("/api/auth/verify-token", { token }, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        if (res.data.success) {
          setIsLoggedIn(true);
          fetchPortoTeam(token); 
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        router.push("/login");
      } finally {
        setIsLoading(false);
      }
    };

    const fetchPortoTeam = async (token) => {
      try {
        const response = await axios.get("/api/porto", {
          headers: {
            Authorization: `Bearer ${token}`
          },
        });
        setPortoTeams(response.data);
      } catch (error) {
        console.log(error);
      }
    };

    checkLoginStatus();
  }, [router])

  const handlePortoCreated = (newPorto) => {
    setPortoTeams((prevPorto) => [...prevPorto, newPorto])
    closeModal()
  } 

  const handleEditClick = (porto) => {
    setEditingPorto(porto)
    setIsEditOpen(true)
  }

  const handleUpdate = async (updatedPorto) => {
    const token = localStorage.getItem('token')
    try {
      const response = await axios.get(`/api/porto/${updatedPorto._id}`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      })

      const freshPorto = response.data

      setPortoTeams((prevPorto) => 
        prevPorto.map((porto) => 
          porto._id === freshPorto._id ? freshPorto : porto
      )
      )
      setIsEditOpen(false)
    } catch (error) {
      console.error("error", error)
    }
  }

  const openDeleteModal = (portoId) => {
    setSelectedPortoId(portoId)
    setIsDeleteOpen(true)
  }

  const closeDeleteModal = () => {
    setIsDeleteOpen(false);
    setSelectedPortoId(null);
  };

  const handleDeleteSuccess = (portoId) => {
    setPortoTeams(prevPorto => prevPorto.filter(porto => porto._id !== portoId));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-white">
        <h2>Please log in to view your portfolio.</h2>
      </div>
    );
  }

  return (
    <div className="w-full mt-5">
      <div className="flex justify-between h-max items-center">
        <h5 className="dark:text-white text-lg">Portfolio</h5>
        <button className="bg-brandLinear p-2 rounded-lg" onClick={openModal}>
          Add Project
        </button>
      </div>
        <AddPorto isOpen={isModalOpen} onClose={closeModal} onPortoAdded={handlePortoCreated}/>
        {isEditOpen && (
          <EditPorto
          porto={editingPorto}
          onUpdated={handleUpdate}
          isEditOpen={isEditOpen}
          onEditClose={() => setIsEditOpen(false)}
          />
        )}
        <DeletePorto isDeleteOpen={isDeleteOpen} onDeleteClose={closeDeleteModal} portoId={selectedPortoId} onDeleteSuccess={handleDeleteSuccess}/>
      <div className="container py-4 mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {portoTeams.map((porto) => (
                <div
                  key={porto._id}
                  className=" bg-white shadow-lg rounded-lg overflow-hidden"
                >
                  <div className="flex justify-center w-full h-32 items-center">
                    {porto.Images && (
                      <img
                      alt="ecommerce"
                      className="w-24 h-24 object-cover object-center items-center rounded-full"
                      src={`http://localhost:8000${porto.Images}`}
                    />
                    )}
                  </div>
                  <div className="p-0 mx-3 ">
                    <h2 className="text-sm title-font text-gray-500 tracking-widest">
                      {porto.name}
                    </h2>
                    <h1 className="text-gray-900 text-xl title-font font-medium mb-1">
                      {porto.category}
                    </h1>
                    <p className="leading-relaxed text-sm">
                      {porto.technology}
                    </p>
                    <p className="leading-relaxed text-sm">
                      {porto.description}
                    </p>
                    <div className="py-2 flex">
                      <span className="title-font font-medium text-xl text-gray-900"></span>
                      <div className="flex flex-row gap-2">
                        <button
                          className=" p-1 w-16 text-white bg-indigo-500 border-0 focus:outline-none hover:bg-indigo-600 rounded"
                          onClick={() => handleEditClick(porto)}
                        >
                          Edit
                        </button>

                        <button
                          key={porto._id}
                          className=" p-1 w-16 text-gray-800 bg-orange-200 border-0 focus:outline-none hover:bg-orange-400 rounded"
                          onClick={() => openDeleteModal(porto._id)}
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
  );
};

export default Portfolio;
