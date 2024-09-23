import React, { useState } from "react";

export default function FileCard({ fileList, darkmode, searchText }) {
  //   const [list, setList] = useState([...fileList]);
  console.log(fileList);

  return (
    <div>
      {fileList.filter((e)=>{return e.name.toLowerCase().includes(searchText.toLowerCase())}).map((e, i) => {
        return (
          <div
            key={i}
            className="files flex flex-col py-2 px-3 border border-[#00] mr-5 mb-5 rounded-xl"
          >
            <p className="text-xl font-bold flex items-center justify-between -mb-1">
              {e.name}
              <img
                src={`/pencil${darkmode ? "-white" : ""}.png`}
                alt="pencil"
                className="h-4"
              />
            </p>
            <p className="text-[8px]">10 jun 24 . 1 day ago</p>
            <hr className="border-[#c9c9c9] h-[1px] w-[90%] self-center my-2" />
            <p className="text-xs h-20">
              Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quasi
              suscipit, provident non facere ad excepturi sunt? Pariatur
              provident non facere
            </p>
            <div className="flex justify-between mt-3">
              <div className="flex space-x-3">
                <img
                  src={
                    e.favourite
                      ? "/heart-red.png"
                      : `/heart${darkmode ? "-white" : ""}.png`
                  }
                  alt="heart"
                  className="h-4 cursor-pointer"
                  onClick={""}
                />
                <img
                  src={`/user-add${darkmode ? "-white" : ""}.png`}
                  alt="user-add"
                  className="h-4"
                />
              </div>
              <div className="flex space-x-3">
                <img
                  src={`/archive${darkmode ? "-white" : ""}.png`}
                  alt="archive"
                  className="h-4"
                />
                <img
                  src={`/trash${darkmode ? "-white" : ""}.png`}
                  alt="trash"
                  className="h-4"
                />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
