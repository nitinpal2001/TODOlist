import React, { useState, useEffect } from "react";
import "../index.css";
import todoimg from '../images/todo.svg'


const Todolist = () => {
  
  // getting local Storage data 
     const getLocalData=()=>{
       const lists=localStorage.getItem("listItems");
       if(lists){
         return JSON.parse(lists);
       }
       else return [];
     } 
  
  const [inputData, setInputData] = useState("")
  const [itemList, setItemList] = useState(getLocalData())
  const [isEditItem, setIsEditItem] = useState("")
  const [toggleBtn, setToggleBtn] = useState(false)

  useEffect(() => {
    localStorage.setItem('listItems',JSON.stringify(itemList))
  }, [itemList])
  
    // Editing Items in the list
    const edititem=(id)=>{
      const item_to_edit=itemList.find((element)=>{
        return element.id===id;
      })
      setInputData(item_to_edit.name);
      setToggleBtn(true);
      setIsEditItem(item_to_edit.id)
    }
    // Adding Items to the List
    const addItem=()=>{
        if(!inputData){
            alert('Please Add Any Task')
        }
        else if(inputData && toggleBtn){
          setItemList(
            itemList.map((element)=>{
              if (element.id===isEditItem) {
                return {...itemList,name:inputData}
              }
              else return element;
            })
            )
            setToggleBtn(false);
            setInputData("");
        }
        else{
          const newInputData={
                id:new Date().getTime().toString(),
                name:inputData
              };
            setItemList([...itemList,newInputData])
            setInputData("")
            console.log(setInputData);
        }
        
    };

    // document.querySelector(".enterkey").addEventListener('keypress',handleKey);
    // const handleKey=(event)=>{
    //   if(event.code==13){
    //     console.log("press enter")
    //     addItem();
    //   }
    // }

    // Deleting the Items
    const deleteItem=(id)=>{
      setItemList(itemList.filter((element)=>{return element.id!==id}))
      return;
    }

  return (
    <>
      <div className="main-div">
        <div className="child-div">
          <figure>
            <img src={todoimg} alt="todologo" />
            <figcaption>Add Your List Here ✌</figcaption>
          </figure>
          <div className="addItems">
            <input
              type="text"
              placeholder="✍ Add Item"
              // autoFocus
              className="form-control enterkey"
              value={inputData}
              onChange={(event)=>{setInputData(event.target.value)}}
            />
            {toggleBtn ? <i className="far fa-edit add-btn" onClick={addItem}></i>:
            <i className="fa fa-solid fa-plus enterkey" onClick={addItem}></i>}          
        </div>
          
          {/* show our items  */}
          <div className="showItems">
          {itemList.map((element)=>{
            return(
                <div className="eachItem" key={element.id}>
                  <h3>{element.name}</h3>
                  <div className="todo-btn">
                    <i
                      className="far fa-edit add-btn" onClick={()=>{edititem(element.id)}}></i>
                    <i
                      onClick={()=>deleteItem(element.id)}
                      className="far fa-trash-alt add-btn"></i>
                  </div>
                </div>
          )})}
          </div>

          {/* rmeove all button  */}
          <div className="showItems">
            <button
              className="btn effect04"
              data-sm-link-text="Remove All"
              onClick={()=>{setItemList([])}}
              >
              <span> CHECK LIST</span>
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Todolist;