import React, { useEffect, useState } from "react";
import adminCheck from "../../Firebase/adminCheck";
import Loading from "../../Shared/Loading/Loading";
import Counting from "./Counting";
import LatestCustomers from "./LatestCustomers";
import LatestTransactions from "./LatestTransactions";
import RoomLeaving from "./RoomLeaving";
import RoomRequests from "./RoomRequests";

const MainAdminDashboardHome = () => {
  const [isLoading, setIsLoading] = useState();
  const [payments, setPayments] = useState();
  const [rooms, setRooms] = useState();
  const [users, setUsers] = useState();
  const [meals, setMeals] = useState();

  useEffect(() => {
    setIsLoading(true);
    fetch("https://hostel-management-system-server.onrender.com/payments")
      .then((res) => res.json())
      .then((data) => setPayments(data.reverse()))
      .then(() => {
        fetch("https://hostel-management-system-server.onrender.com/rooms")
          .then((res) => res.json())
          .then((data) => setRooms(data.reverse()));
      })
      .then(() => {
        fetch("https://hostel-management-system-server.onrender.com/users")
          .then((res) => res.json())
          .then((data) => setUsers(data.reverse()));
      })
      .then(() => {
        fetch("https://hostel-management-system-server.onrender.com/meals")
          .then((res) => res.json())
          .then((data) => setMeals(data.reverse()));
      })
      .then(() => setIsLoading(false));
  }, []);

  return (
    <>
      {isLoading && <Loading></Loading>}
      {!isLoading && (
        <div>
          <div className="w-full grid grid-cols-1 xl:grid-cols-2 2xl:grid-cols-3 gap-4">
            <RoomRequests payments={payments}></RoomRequests>
            <LatestTransactions rooms={rooms}></LatestTransactions>
          </div>
          <div className="mt-4 w-full grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            <Counting rooms={rooms} users={users} meals={meals}></Counting>
          </div>
          <div className="grid grid-cols-1 2xl:grid-cols-2 gap-4 my-4">
            <LatestCustomers users={users}></LatestCustomers>
            <RoomLeaving payments={payments}></RoomLeaving>
          </div>
        </div>
      )}
    </>
  );
};

export default adminCheck(MainAdminDashboardHome);
