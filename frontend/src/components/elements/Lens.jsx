import React, { useEffect, useState } from "react";
import Loader from "../layouts/Loader";
import Table from "../layouts/Table";
import columns from "../../helpers/colDef";
import api from "../../helpers/api";
import { useDispatch, useSelector } from "react-redux";
import { lensChanged } from "../../store/slices/productSlice";
import Modal from "../Modal/Modal";
import AddLens from "../layouts/AddLens";
import { notify } from "../notifier/Notifier";

const Lens = ({ searchValue }) => {
  const { lensColumns } = columns;
  const [lensData, setLensData] = useState([]);
  const dispatch = useDispatch();
  const { isLensChanged } = useSelector((state) => state.productChange);
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState(false);
  const [editableData, setEditableData] = useState({});

  useEffect(() => {
    getLensDetails();
  }, []);

  useEffect(() => {
    if (isLensChanged) {
      getLensDetails();
      dispatch(lensChanged(false));
    }
  }, [isLensChanged, dispatch]);

  const getLensDetails = async () => {
    setLoading(true);
    const response = await api.getLensDetails();
    if (response.success) {
      setLensData(response.data);
      setLoading(false);
      return;
    }
    setLoading(false);
  };

  const onClickRow = (type, data) => {
    if (type === "edit") {
      setEditableData(data);
      setModal(true);
    }
    if (type === "delete") {
      deleteFrame(data.l_code);
    }
  };

  const deleteFrame = async (id) => {
    setLoading(true);
    const response = await api.deleteLens(id);
    if (response.success) {
      dispatch(lensChanged(true));
      setLoading(false);
      notify.success(response.message);
      return;
    }
    setLoading(false);
    notify.error(response.message);
    return;
  };

  return (
    <div>
      {loading && <Loader />}
      <Table
        header={"Lens List"}
        columns={lensColumns}
        data={lensData}
        isEdit={true}
        isDelete={true}
        onClickRow={onClickRow}
        fileName={"lens_data"}
        searchValue={searchValue}
        isInternalSearch={false}
      />
      {modal && (
        <Modal header={`Update Lens`} onCloseModal={() => setModal(false)}>
          <div>
            <AddLens data={editableData} onCloseModal={() => setModal(false)} />
          </div>
        </Modal>
      )}
    </div>
  );
};

export default Lens;
