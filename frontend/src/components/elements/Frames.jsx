import React, { useEffect, useState } from "react";
import Table from "../layouts/Table";
import columns from "../../helpers/colDef";
import api from "../../helpers/api";
import Loader from "../layouts/Loader";

const Frames = ({ searchValue }) => {
  const { framesColumns } = columns;
  const [frameData, setFrameData] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchFrameProducts = async () => {
      setLoading(true);
      const response = await api.fetchFrameProducts();
      if (response.success) {
        setFrameData(response.data);
        setLoading(false);
        return;
      }
      setFrameData([]);
      setLoading(false);
      return;
    };
    fetchFrameProducts();
  }, []);

  const editFrame = (id) => {
    console.log(id);
  };

  const deleteFrame = (id) => {
    console.log(id);
  };

  return (
    <div>
      {loading && <Loader />}
      <Table
        header={"Frames List"}
        columns={framesColumns}
        data={frameData}
        isEdit={true}
        isDelete={true}
        onClickEdit={editFrame}
        onClickDelete={deleteFrame}
        fileName={"frames_data"}
        searchValue={searchValue}
        isInternalSearch={false}
      />
    </div>
  );
};

export default Frames;
