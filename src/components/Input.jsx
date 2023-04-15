import React, { useState } from "react";
import Logo from "../assets/logo.png";
import Search from "../assets/search.png";
import Wave from "../components/wave";
import Download from "../assets/dwn.png";
import Play from "../assets/play.png";
import axios from "axios";

const Input = () => {
  const [tittle, SetTitle] = useState("");
  const [link, SetLink] = useState("");
  const [query, SetQuery] = useState(false);
  const [loading, setLoading] = useState(false);
  const [playing, SetPlaying] = useState(false);
  const [error, setError] = useState(true)
  const getDatafromApi = async (a) => {
    setLoading(true);
      const options = {
        method: 'GET',
        url: 'https://youtube-mp3-download1.p.rapidapi.com/dl',
        params: {id:a},
        headers: {
          'X-RapidAPI-Key': '607e26d4edmshb08ff0a4ce9c6d9p16368ajsnb4fbb80b1f9c',
          'X-RapidAPI-Host': 'youtube-mp3-download1.p.rapidapi.com'
        }
      };
      
       await axios.request(options).then(function (response) {

          if(response.data.status==='ok')
          {
            SetTitle(response.data.title), SetLink(response.data.link),setError(false);
          }
        
      })

      setLoading(false);


  };






  const handelSubmit = (e) => {
    e.preventDefault();
    if(link.length>35)
    getDatafromApi(link.slice(32));
   else
    getDatafromApi(link.slice(17));
    e.target.input.value = "";
    SetQuery(true);
  };

  function startplaying() {
    SetPlaying(true);
    var audio = new Audio(link)
    audio.play();
  }



  return (
    <>
      <div className="main_body_bg">
        <img src={Logo} alt="" className="logo" />
        <div className=" flex justify-center mt-10">
          <form onSubmit={handelSubmit}>
            <input
              type="text"
              name="input"
              onChange={(e) => SetLink(e.target.value)}
              className="rounded-xl h-[25px] w-[250px] "
              placeholder="Enter Youtube  URL"
            />
            <button type="submit ">
              <img
                className=" h-[35px] ml-[3px] mt-2 search"
                src={Search}
                alt=""
              />
            </button>
          </form>
        </div> 
        <div className="display_box  flex-col justify-center items-center">
          {query? (<>
              
            {!error? (
           <>
             {loading ? (
               <>
                 <div className=" mt-10 flex justify-center">
                   <div
                     className="  inline-block h-10 w-10 animate-spin rounded-full border-4 border-solid border-current border-r-transparent align-[-0.125em]  text-white motion-reduce:animate-[spin_1.5s_linear_infinite]"
                     role="status"
                   ></div>
                 </div>
               </>
             ) : (
               <>
                 <div className=" ml-auto mr-auto mt-10 h-[90px] w-[350px]  bg-blue-300  opacity-70 rounded-xl text-center">
                   {tittle.slice(0, 30)}...
                   <div className=" flex justify-center items-center mt-[-8px] space-x-[50px] ">
                     <button onClick={startplaying}>
                       <img src={Play} alt="" />{" "}
                     </button>
                     <a href={link}>
                       {" "}
                       <img src={Download} alt="" />{" "}
                     </a>
                   </div>
                 </div>
                 {playing ? <Wave /> : <></>}
               </>
             )}
           </>
         ) : (
           <> <p className=" text-center text-[15px]  text-red-50">Invalid request</p></>
         )}
          
          </>):(<>
          </>) }
      
       </div>

      </div>
    </>
  );
};

export default Input;
