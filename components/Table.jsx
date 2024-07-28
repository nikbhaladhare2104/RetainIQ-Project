"use client";
import List from "../constants/data";
import { DragDropContext, Droppable, Draggable } from "@hello-pangea/dnd";
import Row from "./Row";
import { useEffect, useState } from "react";

export default function Table() {
  const [rows, setRows] = useState(List.getList());

  useEffect(() => {
    List.saveList(rows);
  }, [rows]);

  // console.log(rows)
  const addRow = () => {
    const newRow = {
      id: `${rows.length + 1}`,
      columns: Array(rows[0].columns.length).fill(""),
    };
    setRows([...rows, newRow]);
  };

  const addColumn = () => {
    setRows(rows.map((row) => ({ ...row, columns: [...row.columns, ""] })));
  };


  const onRemoveRow = (rowIndex) => {
    const newRows = rows.filter((_, index) => index !== rowIndex);
    setRows(newRows);
  };

  const handleImageUpload = (e, rowIndex, colIndex) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      const newRows = [...rows];
      newRows[rowIndex].columns[colIndex] = reader.result;
      // console.log(reader.result)
      setRows(newRows);
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  };
    // const handleImageUpload = (e, rowIndex, colIndex) => {
    //   const file = e.target.files[0];
    //   const reader = new FileReader();
    //   reader.onloadend = () => {
    //     const newRows = [...rows];
    //     newRows[rowIndex].columns[colIndex] = reader.result;
    //     setRows(newRows);
    //   };
    //   if (file) {
    //     reader.readAsDataURL(file);
    //   }
    // };
  // const handleDragEnd = (result) => {
  //   if (!result.destination) return;

  //   const reorderedRows = Array.from(rows);
  //   const [removed] = reorderedRows.splice(result.source.index, 1);
  //   reorderedRows.splice(result.destination.index, 0, removed);

  //   setRows(reorderedRows);
  // };

  const handleDragEnd = (param) => {
    const srcI = param.source.index;
    const desI = param.destination?.index;
    if (desI) {
      rows.splice(desI, 0, rows.splice(srcI, 1)[0]);
      List.saveList(rows);
    }
  };

  return (
    <div className="w-full bg-gray-100 mb-10 h-full rounded-md p-10">
      <div className="flex w-full mb-10">
        <div className="w-[40%] flex flex-shrink-0">
          <div className="w-[25%] "> </div>
          <div className="w-[75%] flex items-center justify-center border-r-[1px] border-r-gray-200">
            Product Filter
          </div>
        </div>
        <div className="w-[60%] overflow-x-auto scrollbar-hide">
          <div className="flex gap-4">
            {rows  &&
              rows[0].columns.map((col, index) => (
                <div key={index
                } className="w-[200px] flex justify-between flex-shrink-0 px-4">
                  {index === 0 ? "Primary Variant" : `Variant ${index + 1}`}
                  <img src="/menu.png" alt="" className="w-[20px]" />
                </div>
              ))}
          </div>
        </div>
      </div>
      <DragDropContext onDragEnd={handleDragEnd}>
        <Droppable droppableId="droppable-1">
          {(provided, _) => (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className="space-y-10 w-full "
            >
              {rows.map((row, rowIndex) => (
                <Draggable
                  key={row.id}
                  draggableId={`draggable-${row.id}`}
                  index={rowIndex}
                >
                  {(provided, snapshot) => (
                    <div
                      ref={provided.innerRef}
                      {...provided.draggableProps}
                      style={{
                        ...provided.draggableProps.style,
                        boxShadow: snapshot.isDragging
                          ? "0 0 .4rem #666"
                          : "none",
                      }}
                      // {...provided.dragHandleProps}
                      className="flex items-center space-x-2 p-2 w-full rounded-lg h-[180px] group"
                    > 
                      <div className="w-[40%] flex flex-shrink-0 h-full ">
                        <div className="w-[25%] flex flex-col justify-center mr-2 items-center gap-2 border-r-2 border-r-gray-200">
                          <img src="/trash.png" alt="" className="h-6 w-6 cursor-pointer opacity-0 group-hover:opacity-100 transition-opacity " onClick={() => onRemoveRow(rowIndex)} />
                          <div className="flex gap-2 text-center justify-center items-center">
                            <p className="text-3xl font-serif font-bold">
                              {rowIndex + 1}
                            </p>
                            <img
                              src="/dots.png"
                              alt="drag-icon"
                              className="w-5 h-5"
                              {...provided.dragHandleProps}
                            />

                          </div>
                        </div>
                        <div className="w-[75%] flex items-center justify-center border-r-[1px] px-4  border-r-gray-200">
                          <div className="bg-white w-full h-full rounded-lg flex items-center justify-center">Tags</div>
                        </div>
                      </div>
                      <div className="w-[60%] overflow-x-auto h-full ">
                        <div className="flex gap-4 h-full ">
                          {row.columns.slice(0, 2).map((col, colIndex) => (
                            <div
                              key={colIndex}
                              className="w-[200px] flex flex-col justify-between items-center flex-shrink-0 p-6 rounded-md bg-white "
                            >
                              <img src="/logo.png" alt="" className="w-full rounded-lg" />
                              <p className="text-center text-sm w-full flex-wrap">Image of {colIndex + 1}</p>
                            </div>
                          ))}
                           {row.columns.slice(2).map((col, colIndex) => (
                            <div key={colIndex + 2} className="w-[200px] flex flex-col justify-between items-center flex-shrink-0 p-6 rounded-md bg-white">
                               {col ? (    
                                <>
                                  <img src={col} alt={`Row ${rowIndex + 1} Column ${colIndex + 2}`} className="w-full rounded-lg" />
                                  <p className="text-center text-sm w-full flex-wrap">Image of {colIndex + 1}</p>
                                   
                                </> 
                               ) : (
                                   <div className="w-full h-full flex items-center justify-center">
                                    <button
                                      onClick={() => document.getElementById(`imageInput-${rowIndex}-${colIndex + 2}`).click()}
                                      className="border px-3 py-1 text-sm rounded-md border-gray-200"
                                    >
                                      <span className="text-xl">+</span> Add Design
                                    </button>
                                   </div>
                                     
                              )}
                              <input
                                type="file"
                                id={`imageInput-${rowIndex}-${colIndex + 2}`}
                                accept="image/*"
                                onChange={(e) => handleImageUpload(e, rowIndex, colIndex + 2)}
                                className="hidden"
                              />
                            </div>
                          ))}

                          <div className="w-full h-full flex items-center ml-5">
                            <button
                              className="text-2xl text-gray-800  font-bold p-2 w-10 h-10 flex items-center justify-center rounded-sm border bg-white"
                              onClick={addColumn}
                            >
                              +
                            </button>
                         </div>
                        </div>

                      </div>
                    </div>
                  )}
                </Draggable>
              ))}
              {provided.placeholder}
            </div>
          )}
        </Droppable>
      </DragDropContext>
      {/* <img src={rows[0].columns[2]} alt="" className="h-[100px] w-[100px]" /> */}
      <button
        onClick={addRow}
        className="mt-4 px-4 py-2 border font-bold text-2xl border-gray-200 ml-12 bg-white rounded"
      >
        + 
      </button>
    </div>
  );
}
