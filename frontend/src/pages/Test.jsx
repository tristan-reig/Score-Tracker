import axios from "axios";
import { useEffect, useState } from "react";

const Test = () => {
  const [data, setData] = useState(null);
  const homeNum = [3, 2, 1, 5, 4, 7, 8, 6, 10, 9, 14, 13, 12, 11, 15];
  const awayNum = [1, 2, 3, 6, 4, 8, 5, 7, 0, 11, 9, 12, 10, 13, 15, 14, 0];

  useEffect(() => {
    const fetchData = async () => {
      const response = await axios.get('http://localhost:3001/football/premier-league/teams');
      setData(response.data);
    }
    fetchData();
  }, []);
  
  if (!data) {
    return (
      <div>Attente</div>
    )
  }

  console.log(data)

  return (
    <div className="bg-green-700 border m-5 mx-36">
      <div className="flex w-full h-[400px]">
        <div className="w-[10%] flex">
          <span className="flex my-auto ml-auto -rotate-90 text-5xl text-white">H</span>
        </div>
        <div className="field flex w-full">
          <div className="flex border border-y-0 w-full">
            <div className="flex w-full">
              <div className="flex w-full">
                {[1,4,2].map((value, indexO) => (
                  <div key={indexO} className="grid grid-cols-1 w-full">
                    {Array.from({length: value}).map((_, indexI) => (
                      <span key={indexI} className="m-auto text-center">
                        <img className="w-14" src="https://cdn.lnr.fr/club/perpignan/photo/home_jersey.2f7ff57d5c23be64c52e7635df1d270b3ef10216" alt="" />
                        {indexO === 0 ? awayNum[14] : awayNum[8 + 2 * indexI + indexO]}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
              <div className="flex border border-y-0 w-full">
                <div className="flex border border-y-0 w-[60%] relative border-dashed border-2 border-l-0">
                  <div className="w-full flex">
                    {[3,2].map((value, indexO) => (
                      <div key={indexO} className="grid grid-cols-1 w-full">
                        {Array.from({length: value}).map((_, indexI) => (
                          <span key={indexI} className="m-auto text-center">
                            <img className="w-14" src="https://cdn.lnr.fr/club/perpignan/photo/home_jersey.2f7ff57d5c23be64c52e7635df1d270b3ef10216" alt="" />
                            {awayNum[3 + indexO + indexI * 2]}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex w-[40%]">
                  <div className="grid grid-cols-1 w-full mx-auto">
                    {Array.from({length: 3}).map((_, index) => (
                      <span key={index} className="m-auto text-center">
                        <img className="w-14" src="https://cdn.lnr.fr/club/perpignan/photo/home_jersey.2f7ff57d5c23be64c52e7635df1d270b3ef10216" alt="" />
                        {awayNum[index]}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
            <div className="flex w-full">
              <div className="flex w-full">
                <div className="flex w-[40%]">
                  <div className="grid grid-cols-1 w-full mx-auto">
                    {Array.from({length: 3}).map((_, index) => (
                      <span key={index} className="m-auto text-center">
                        <img className="w-14" src="https://cdn.lnr.fr/club/beziers/photo/home_jersey.2f7ff57d5c23be64c52e7635df1d270b3ef10216" alt="" />
                        {homeNum[index]}
                      </span>
                    ))}
                  </div>
                </div>
                <div className="flex border border-y-0 w-[60%] border-dashed border-2 border-r-0">
                  <div className="flex w-full">
                    {[2,3].map((value, indexO) => (
                      <div key={indexO} className="grid grid-cols-1 w-full">
                        {Array.from({length: value}).map((_, indexI) => (
                          <span key={indexI} className="m-auto text-center">
                            <img className="w-14" src="https://cdn.lnr.fr/club/beziers/photo/home_jersey.2f7ff57d5c23be64c52e7635df1d270b3ef10216" alt="" />
                            {homeNum[3 + 2 * indexO + indexI]}
                          </span>
                        ))}
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div className="flex w-full border border-y-0 border-r-0">
                {[2,4,1].map((value, indexO) => (
                  <div key={indexO} className="grid grid-cols-1 w-full">
                    {Array.from({length: value}).map((_, indexI) => (
                      <span key={indexI} className="m-auto text-center">
                        <img className="w-14" src="https://cdn.lnr.fr/club/beziers/photo/home_jersey.2f7ff57d5c23be64c52e7635df1d270b3ef10216" alt="" />
                        {indexO === 2 ? homeNum[14] : homeNum[8 + 2 * indexO + indexI]}
                      </span>
                    ))}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <div className="w-[10%] flex">
          <span className="flex my-auto mr-auto -rotate-90 text-5xl text-white">H</span>
        </div>
      </div>
    </div>
  );
};

export default Test