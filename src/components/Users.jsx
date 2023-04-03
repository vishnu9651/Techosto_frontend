import { useEffect } from "react";
import { useState } from "react";
import { DeleteFilled } from "@ant-design/icons";
import { MailOutlined } from "@ant-design/icons";
import { PhoneOutlined } from "@ant-design/icons/lib/icons";
import { HeartOutlined } from "@ant-design/icons/lib/icons";
import { GlobalOutlined } from "@ant-design/icons/lib/icons";
import { HeartFilled } from "@ant-design/icons/lib/icons";


import "./Users.css"
import EditData from "./EditData";
let heartIndexes = [];

export const Users = () => {
    const [state, setState] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [heart, setHeart] = useState(false);
    const [currentIndex, setCurrentIndex] = useState();
   

    const getData = () => {

        fetch("https://aware-ray-cloak.cyclic.app/users", {

        }).then((res) => res.json()
        )

            .then((res) => {
                setState(res);
                setIsLoading(false);

                console.log(res)
            })
            .catch((err) => console.log(err))




    }

    console.log("Ss", state)
    const handleDelete = (noteId) => {
        fetch(`https://aware-ray-cloak.cyclic.app/users/delete/${noteId}`, {
            method: "DELETE",
            headers: {
                "Authorization": localStorage.getItem("token")

            }
        }).then((res) => {

            res.json();
            setIsLoading(true)
        })
            //.then(res=>console.log(res))
            .catch((err) => { console.log(err) })



    }

    const handleColor = (index) => {
        const indexValue = heartIndexes.indexOf(index);
        
        heartIndexes.includes(index) ?  heartIndexes.splice((indexValue), 1) : heartIndexes.push(index)  ;
        console.log(heartIndexes);
        if (heart == true) {
            setHeart(false)
        }
        else {
            setHeart(true)
        }
    }
    useEffect(() => {

        getData()
    }, [isLoading])
    console.log("state", state)
    return (<>
{isLoading==true ?<div class="spinner"></div> : 


<div className="container"  >{state.map((e, i) =>
            <div key={e.id} className="box" ><div>
                <div className="Image">
                    <img height={"200px"} width={"200px"} src={`https://avatars.dicebear.com/v2/avataaars/${e.name}.svg?options[mood][]=happy`} />
                </div>
            </div>
                <div className="details">
                    <h3>{e.name}</h3>
                    <div className="info" >
                        <div className="icon"><MailOutlined /></div>
                        <div className="text">{e.email}</div>

                    </div>
                    <div className="info">
                        <div><PhoneOutlined /></div>
                        <div className="text" >{e.phone}</div>
                    </div>
                    <div className="info">
                        <div><GlobalOutlined /></div>
                        <div className="text">{e.website}</div>
                    </div>
                    <div className="todo">
                        {
                            heartIndexes.includes(i) ?
                                <HeartFilled onClick={()=> handleColor(i, "fill")} style={{ fontSize: '16px', color: 'red' }} />
                                : <HeartOutlined onClick={()=>handleColor(i, "blank")} style={{ fontSize: '16px', color: 'red' }} />
                        }


                        <DeleteFilled onClick={() => handleDelete(e._id)} />
                        <EditData details={e} setIsLoading={setIsLoading} />
                    </div>
                </div>
            </div>
        )}</div>
}
        
        
        
    </>)
}

