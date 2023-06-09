/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
// import styled from "styled-components";
import { useForm, SubmitHandler } from "react-hook-form";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const MainProfile = (props) => {
  const { data } = props;
  const [imageLoading, setImageLoading] = useState(false);
  const [image, setImage] = useState(data?.image);
  const [blogData, setBlogData] = useState([]);
  const [startDate, setStartDate] = useState(data?.birthDate);

  const {
    handleSubmit,
    register,
    reset,
    formState: { errors },
  } = useForm();

  const dragOver = (e) => {
    e.preventDefault();
  };

  const dragEnter = (e) => {
    e.preventDefault();
  };

  const dragLeave = (e) => {
    e.preventDefault();
  };

  const imageFileDrop = async (e) => {
    e.preventDefault();
    const files = e.dataTransfer.files;

    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ubmhennq");
    setImageLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/de0px8abs/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();

    const field = "thumbnail";
    const value = file.secure_url;
    const newBlogData = { ...blogData };
    newBlogData[field] = value;
    setBlogData(newBlogData);

    setImage(file.secure_url);
    // setImage(files[0])
    setImageLoading(false);
  };

  const uploadImage = async (e) => {
    const files = e.target.files;
    const data = new FormData();
    data.append("file", files[0]);
    data.append("upload_preset", "ubmhennq");
    setImageLoading(true);

    const res = await fetch(
      "https://api.cloudinary.com/v1_1/de0px8abs/image/upload",
      {
        method: "POST",
        body: data,
      }
    );
    const file = await res.json();
    const field = e.target.name;
    const value = file.secure_url;
    setImage(file.secure_url);
    setImageLoading(false);
  };

  // Save User Information
  const submitHandler = (info) => {
    const userInfo = {
      email: data?.email,
      ...info,
      birthDate: Date.parse(startDate),
      image: image,
    };
    if (
      (startDate && startDate !== data?.birthDate) ||
      image !== data?.image ||
      (userInfo?.address && userInfo?.address !== data?.address) ||
      (userInfo?.phone && userInfo?.phone !== data?.phone) ||
      (userInfo?.displayName && userInfo?.displayName !== data?.displayName) ||
      (userInfo?.gender && userInfo?.gender !== data?.gender) ||
      (userInfo?.profession && userInfo?.profession !== data?.profession)
    ) {
      fetch(
        "https://hostel-management-system-server.onrender.com/profile-update",
        {
          method: "PUT",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(userInfo),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.acknowledged) {
            swal("Profile updated successfully!", {
              icon: "success",
            });
          }
        });
    } else {
      swal("You didn't make any changes yet to update the profile!", {
        icon: "warning",
      });
    }
  };
  return (
    <div>
      <div>
        <div className="container mx-auto my-5 font-sansita card-design p-5">
          <div
            // style={{
            //   // boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
            //   backgroundColor: "#36393e52",
            // }}
            className="mb-5 rounded px-4 py-4 text-center "
          >
            <h4 className="text-3xl font-bold">
              Make Your Profile Look Better by Filling the Form
            </h4>
          </div>
          <div style={{}}>
            <form
              onSubmit={handleSubmit(submitHandler)}
              // style={{
              //   // boxShadow: "0 0 2rem 0 rgb(136 152 170 / 15%)",
              //   backgroundColor: "#36393e52",
              // }}
              // className="my-5 rounded shadow-xl bg-slate-200 dark:bg-darkBlue p-6 text-Dark dark:text-white"
            >
              <div className="grid grid-cols-12 gap-3">
                {/* Profile picture  */}
                <div className="col-span-12 flex justify-center md:col-span-6">
                  <div
                    className="mx-auto flex self-center overflow-hidden rounded-full border-2 border-white sm:mx-0"
                    style={{ height: "150px", width: "150px" }}
                  >
                    <img
                      style={{ height: "150px", width: "150px" }}
                      className="mx-auto rounded-full border-2 border-white object-cover"
                      src={image}
                      // src="https://img.freepik.com/free-icon/important-person_318-10744.jpg?w=2000"
                      alt=""
                    />
                  </div>
                </div>
                {/* Profile Photo Update Handling  */}
                <div className="col-span-12 flex flex-col md:col-span-6">
                  <label className="rounded-lg border-2 border-dotted border-gray-400 p-3 text-center">
                    <div
                      // className="mt-12 text-center"
                      onDragOver={dragOver}
                      onDragEnter={dragEnter}
                      onDragLeave={dragLeave}
                      onDrop={imageFileDrop}
                    >
                      <div className="">
                        {imageLoading && (
                          <div>
                            <img
                              className="mx-auto animate-ping"
                              style={{ height: "50px", width: "50px" }}
                              src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                              alt=""
                            />
                            <p className="text-xl text-gray-400">Loading ...</p>
                          </div>
                        )}
                        {!imageLoading && (
                          <div>
                            <img
                              className="mx-auto animate-pulse"
                              style={{ height: "50px", width: "50px" }}
                              src="https://i.ibb.co/gJLdW8G/cloud-upload-regular-240.png"
                              alt=""
                            />
                            <p className="text-md text-gray-400">
                              Drag & Drop your profile photo
                            </p>
                          </div>
                        )}
                        <p className="py-4">
                          <span className="rounded-lg bg-gray-400 px-2 py-2 font-semibold  text-Docy-Dark dark:text-white">
                            Browse File
                          </span>
                        </p>
                      </div>
                    </div>
                    <input
                      className="hidden"
                      type="file"
                      name="thumbnail"
                      placeholder="upload"
                      onChange={uploadImage}
                    />
                  </label>
                </div>
              </div>
              <div className="grid grid-cols-12 gap-3 py-2">
                <div className="col-span-12 flex flex-col  md:col-span-6">
                  <label htmlFor="displayName">Name</label>
                  <input
                    // onBlur={blogTitle}
                    defaultValue={data?.displayName}
                    required
                    placeholder="Name"
                    className="h-14 w-full rounded-md border-2 p-3 text-lg"
                    type="text"
                    {...register("displayName")}
                  />
                </div>
                <div className="col-span-12 flex flex-col  md:col-span-6">
                  <label htmlFor="title">Date of Birth(mm/dd/yyyy)</label>
                  <DatePicker
                    className="h-14 w-full rounded-md border-2 p-3 text-lg"
                    placeholderText="mm/dd/yyyy"
                    selected={startDate}
                    onChange={(date, Date) => {
                      setStartDate(date);
                    }}
                  />
                </div>
                <div className="col-span-12 flex flex-col  md:col-span-6">
                  <label htmlFor="profession">Profession</label>
                  <input
                    className="rounded-md border p-2 text-lg"
                    type="text"
                    placeholder="Profession"
                    {...register("profession")}
                    defaultValue={data?.profession}
                  />
                </div>
                <div className="col-span-12 flex flex-col  md:col-span-6">
                  <label htmlFor="gender">Gender</label>
                  <input
                    className="rounded-md border p-2 text-lg"
                    type="text"
                    placeholder="Gender"
                    {...register("gender")}
                    defaultValue={data?.gender}
                  />
                </div>
                <div className="col-span-12 flex flex-col  md:col-span-6">
                  <label htmlFor="address">Address</label>
                  <input
                    className="rounded-md border p-2 text-lg"
                    type="text"
                    placeholder="Address"
                    {...register("address")}
                    defaultValue={data?.address}
                  />
                </div>
                <div className="col-span-12 flex flex-col  md:col-span-6">
                  <label htmlFor="phone">Phone</label>
                  <input
                    className="rounded-md border p-2 text-lg"
                    type="text"
                    placeholder="Phone"
                    {...register("phone")}
                    defaultValue={data?.phone}
                  />
                </div>
              </div>
              <span className="">
                <input
                  type="submit"
                  className=" mt-5 cursor-pointer rounded-lg bg-indigo-500 px-6 py-3 text-lg font-semibold text-white"
                  value="Save changes"
                />
              </span>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainProfile;
