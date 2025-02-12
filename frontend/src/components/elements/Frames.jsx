import React, { useEffect, useState } from "react";
import Table from "../layouts/Table";
import columns from "../../helpers/colDef";
import api from "../../helpers/api";
import Loader from "../layouts/Loader";
import AddFrames from "../layouts/AddFrames";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { framesChanged } from "../../store/slices/productSlice";

const Frames = ({ searchValue }) => {
  const { framesColumns } = columns;
  const [frameData, setFrameData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [editableData, setEditableData] = useState({});
  const dispatch = useDispatch();
  const { isFramesChanged } = useSelector((state) => state.productChange);

  useEffect(() => {
    fetchFrameProducts();
  }, []);

  useEffect(() => {
    if (isFramesChanged) {
      fetchFrameProducts();
      dispatch(framesChanged(false));
    }
  }, [isFramesChanged]);

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

  const onClickRow = (type, data) => {
    if (type === "edit") {
      setEditableData(data);
      setModal(true);
    }
    if (type === "delete") {
    }
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
        onClickRow={onClickRow}
        fileName={"frames_data"}
        searchValue={searchValue}
        isInternalSearch={false}
      />
      {modal && (
        <Modal header={`Update Frame`} onCloseModal={() => setModal(false)}>
          <div>
            <AddFrames
              data={editableData}
              onCloseModal={() => setModal(false)}
            />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Frames;
