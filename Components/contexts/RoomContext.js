import { useRouter } from "next/router";
import { createContext, useEffect, useState } from "react";
import swal from "sweetalert";

const RoomContext = createContext();

export const RoomProvider = ({ children }) => {
  const [roomData, setRoomData] = useState();
  const router = useRouter();

  useEffect(() => {
    const getRooms = async () => {
      const res = await fetch(
        "https://hostel-management-system-server.onrender.com/rooms"
      );
      const data = await res.json();

      setRoomData(data.reverse());
    };

    getRooms();
  }, [router]);
  const deleteItem = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    }).then((willDelete) => {
      if (willDelete) {
        fetch(
          `https://hostel-management-system-server.onrender.com/delete-room/${id}`,
          {
            method: "DELETE",
          }
        )
          .then((res) => res.json())
          .then(() =>
            swal("Room delete successful!", {
              icon: "success",
            })
          )
          .then((data) => console.log(data));

        const remainingRoom = roomData.filter((room) => room._id !== id);
        setRoomData(remainingRoom);
      }
    });
  };

  return (
    <RoomContext.Provider value={{ roomData, deleteItem }}>
      {children}
    </RoomContext.Provider>
  );
};

export default RoomContext;
