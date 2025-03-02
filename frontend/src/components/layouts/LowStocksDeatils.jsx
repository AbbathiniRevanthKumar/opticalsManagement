import React from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "../../helpers/routes";
import icons from "../../utils/icons";

const LowStocksDeatils = (props) => {
  const { data, header = "", type } = props;
  const navigate = useNavigate();

  const handleMoreClick = () => {
    navigate(routes.protectedRoutes.stocks, {
      state: { productType: type },
    });
  };
  return (
    <>
      {data && data.length > 0 && (
        <div className="h-full w-full bg-secondary shadow-md rounded-lg">
          <div className="flex flex-col gap-2 p-2">
            <div className="bg-danger p-2 rounded-lg text-center font-semibold text-secondary shadow-sm flex justify-center items-center gap-2 w-full  text-nowrap">
              {header}
              {<icons.Alert />}
            </div>
            <div className="p-2 flex flex-col gap-2 ">
              {data.map((item, index) => {
                if (index > 4) return;
                return (
                  <div
                    key={index}
                    className="flex justify-between gap-4 border-b-2 border-background items-end"
                  >
                    <div className="basis-5/6 md:text-nowrap">{item.name}</div>
                    <div className="basis-1/6 text-primary flex justify-end  font-semibold">
                      {item.qty}
                    </div>
                  </div>
                );
              })}
            </div>
            {data.length > 5 && (
              <div className="flex justify-end items-center">
                <button
                  className="btn w-fit py-1 px-4 text-danger bg-secondary hover:bg-danger hover:text-secondary"
                  onClick={handleMoreClick}
                >
                  More {data.length - 5}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};

export default LowStocksDeatils;
