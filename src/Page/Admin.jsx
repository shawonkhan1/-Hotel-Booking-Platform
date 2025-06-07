import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import NoDataFound from "./NoDataFound";
import Loadings from "../Components/Loading";

const Admin = () => {
  const [contacts, setContacts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [deletingId, setDeletingId] = useState(null);

  useEffect(() => {
    fetchContacts();
  }, []);

  const fetchContacts = () => {
    setLoading(true);
    fetch("http://localhost:3000/contact")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch contacts");
        return res.json();
      })
      .then((data) => {
        setContacts(data);
        setLoading(false);
      })
      .catch((err) => {
        setError(err.message);
        setLoading(false);
      });
  };

  const handleDelete = (id) => {
    Swal.fire({
      title: "Are you sure you want to delete this data?",
  text: "This action cannot be undone!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then((result) => {
      if (result.isConfirmed) {
        setDeletingId(id);
        fetch(`http://localhost:3000/contact/${id}`, {
          method: "DELETE",
        })
          .then((res) => {
            if (!res.ok) throw new Error("Failed to delete contact");

            fetchContacts();
            setDeletingId(null);

            Swal.fire({
              title: "Deleted!",
              text: "Contact has been deleted.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
          })
          .catch((err) => {
            setDeletingId(null);
            Swal.fire({
              title: "Error!",
              text: "Delete failed: " + err.message,
              icon: "error",
            });
          });
      }
    });
  };

  if (loading) return <Loadings />;

  if (error)
    return (
      <div className="flex justify-center items-center h-48">
        <p className="text-red-600 text-lg font-semibold">Error: {error}</p>
      </div>
    );

  return (
    <div className="max-w-7xl mx-auto p-6  rounded-lg ">
      <h1 className="text-3xl font-bold mb-6 text-center text-blue-700">
        Contact Messages
      </h1>

      {contacts.length === 0 ? (
        <NoDataFound />
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-300 rounded-lg">
            <thead className="bg-blue-600 text-white">
              <tr>
                <th className="py-3 px-6 text-left font-semibold">Name</th>
                <th className="py-3 px-6 text-left font-semibold">Email</th>
                <th className="py-3 px-6 text-left font-semibold">Message</th>
                <th className="py-3 px-6 text-left font-semibold">Date</th>
                <th className="py-3 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {contacts.map(({ _id, name, email, message, createdAt }) => (
                <tr
                  key={_id}
                  className="even:bg-gray-100 hover:bg-gray-200 transition-colors"
                >
                  <td className="py-2 px-6 whitespace-nowrap">{name}</td>
                  <td className="py-2 px-6 whitespace-nowrap">{email}</td>
                  <td className="py-2 px-6 max-w-xs truncate">{message}</td>
                  <td className="py-2 px-6 whitespace-nowrap text-gray-600 text-sm">
                    {new Date(createdAt).toLocaleString()}
                  </td>
                  <td className="py-2 px-6 text-center">
                    <button
                      onClick={() => handleDelete(_id)}
                      disabled={deletingId === _id}
                      className={`px-3 py-1 rounded-md text-white font-semibold transition-colors ${
                        deletingId === _id
                          ? "bg-gray-400 cursor-not-allowed"
                          : "bg-red-600 hover:bg-red-700"
                      }`}
                    >
                      {deletingId === _id ? "Deleting..." : "Delete"}
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Admin;
